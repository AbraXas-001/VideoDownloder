const express = require("express");
const TikTokScraper = require("tiktok-scraper");

const router = express.Router();

router.get("/", async (req, res) => {
  const { url } = req.query;

  try {
    const videoMeta = await TikTokScraper.getVideoMeta(url);
    res.redirect(videoMeta.collector[0].videoUrl);
  } catch (error) {
    res.status(500).send("Error downloading TikTok video.");
  }
});

module.exports = router;