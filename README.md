# Subtitles for Speech Shadowing App

Shared subtitles of audios and videos for practice speech shadowing technique on https://h2-studio.github.io/speech-shadowing-app/

## How to Contribute

The Speech Shadowing App reads resources from [resources.json](./resources.json). You can update the json to add or update resources. The format is

```json
{
  // put the entity in the array of a category
  "category": [ 
    {      
      "type": "video", // optional, string, the value is either "audio" or "video", the default value is audio
      "title": "any string", // required
      "duration": "00:00:00,000", // optional, the format is 00:00:00,000
      "releasedDate": "", // optional, the format is yyyy-MM-dd
      "from": "the public url of the page of the audio or video", // optional
      "sourceUrl": "the public url of .mp3 or .mp4", // required
      "subtitleUrl": "the public url of .srt", // optional if subtitlePath is provided
      "subtitlePath": "the relative path of the subtitle file in this repo" // optional if subtitleUrl is provided
    }
  ]
}
```

Also, you can create a subtitle (.srt) file of an audio(.mp3) or a audio(.mp4) by any tools such as [SubtitleEdit](https://github.com/SubtitleEdit/subtitleedit) and upload it to this git repo.
