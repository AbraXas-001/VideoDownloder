const express = require("express");
const ytdl = require("ytdl-core");

const router = express.Router();

router.get("/", async (req, res) => {
  const { url, quality } = req.query;

  if (!ytdl.validateURL(url)) {
    return res.status(400).send("Invalid YouTube URL.");
  }

  const options = {
    quality: quality || 'highest',
    filter: quality === 'audio' ? 'audioonly' : 'video',
  };

  res.header("Content-Disposition", 'attachment; filename="video.mp4"');

  ytdl(url, options).pipe(res);
});

module.exports = router;