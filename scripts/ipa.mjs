/**
 * Read a json of a subtitle file and adding IPA Pronunciation of text to html ruby format
 * The json file must be as the below format and the encoding must be utf8 without bom
 * ``` json
 * [
 *  {
 *     start:0,
 *     end: 0,
 *     text: ""
 *  }
 * ]
 * ```
 *
 * This script use paid API of https://rapidapi.com/dpventures/api/wordsapi/,
 * you have to put the API KEY in .key file
 */

import * as fs from "fs";
import * as path from "path";

const LOCAL_CACHE_FOLDER = "./.cache/";
const API_URL = "https://wordsapiv1.p.rapidapi.com/words/%WORD%";
const API_KEY_PATH = ".key";
const WORD_REG = /[A-Za-z]+/g;

let WORDSAPI_KEY = null;

export async function addIPAs(filename, outputFilename) {
  // check .key file
  if (fs.existsSync(API_KEY_PATH)) {
    WORDSAPI_KEY = fs.readFileSync(API_KEY_PATH).toString();
  } else {
    console.error("please put API key into .key file");
    return;
  }

  // check ./local folder
  if (!fs.existsSync(LOCAL_CACHE_FOLDER)) {
    fs.mkdirSync(LOCAL_CACHE_FOLDER);
  }

  let lines = JSON.parse(fs.readFileSync(filename));

  for (let line of lines) {
    let text = line.text;
    let match;
    line.phonetics = [];
    while ((match = WORD_REG.exec(text)) !== null) {
      let word = match[0];
      if (word.length > 2) {
        // skip work is too short
        let ipa = await lookupIPA(word);
        if (ipa) {
          line.phonetics.push([match.index, word.length, ipa]);
        }
      }
    }
  }

  fs.writeFileSync(outputFilename || filename, JSON.stringify(lines));
}

async function lookupIPA(word) {
  try {
    word = word.toLowerCase();

    let cachePath = path.join(LOCAL_CACHE_FOLDER, word);
    let definition = null;

    if (fs.existsSync(cachePath)) {
      let text = fs.readFileSync(cachePath);
      if (text.byteLength > 0) {
        definition = JSON.parse(text);
      }
    } else {
      // fetch
      let res = await fetch(API_URL.replace("%WORD%", word), {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": WORDSAPI_KEY,
          "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
      });

      let text = await res.text();
      let json = JSON.parse(text);

      if (res.status == 200) {
        definition = json;

        fs.writeFileSync(cachePath, text);
      } else {
        // create an empty file

        fs.closeSync(fs.openSync(cachePath, "w"));
        throw json.message;
      }
    }

    let ipa = definition?.pronunciation;

    if (typeof ipa == "string") {
      return ipa;
    } else {
      return definition?.pronunciation?.all;
    }
  } catch (ex) {
    console.error(`Cannot get word "${word}"`, ex);
  }
}

if (import.meta.filename.endsWith(process.argv[1])) {
  if (process.argv.length < 3) {
    console.error("please input the subtitle json");
  } else {
    addIPAs(process.argv[2], process.argv[3]);
  }
}
