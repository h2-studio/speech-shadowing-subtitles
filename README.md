# Resources for RE:PEAT App

Resources such as shared subtitles of audios and videos for practice speech shadowing technique on https://team-h2.github.io/repeat-app/

## How to Contribute

The RE:PEAT App reads this repository on categories.json and each resources.json under the category folders. We can update these json files to add, update or delete the categories and resources.

### The format of the category

```json
[
  {
    "title": "string", // required
    "path": "string" // required, the relative path to the category folder.
  }
]
```
You also need to a create folder for the category and resources.json under the new folder. We use dasherize("lowercase-lowercase-lowercase") format for the folder name.

### The format of the resources
```json
[
  {
    "type": "video", // optional, string, the value is either "audio" or "video", the default value is audio
    "title": "string", // required
    "duration": "00:00:00,000", // optional, the format is 00:00:00,000
    "releasedDate": "", // optional, the format is yyyy-MM-dd
    "from": "the public url of the page of the audio or video", // optional
    "sourceUrl": "the public url of .mp3 or .mp4", // required
    "subtitleUrl": "the public url of .srt", // optional if subtitlePath is provided
    "subtitlePath": "the relative path of the subtitle file in this repo" // optional if subtitleUrl is provided
  }
]
```

The best practice is creating subtitles (.srt) of audios(.mp3) or videos(.mp4) by any tools such as [SubtitleEdit](https://github.com/SubtitleEdit/subtitleedit) and upload the subtitles to this repo and update the resources.json and use "sourceUrl" to link to the audio or video.

## Copyright

If you find any resources that infringe upon your copyright, please contact me at weironghuang31@outlook.com, and we will remove those resources.
