const express = require("express"); 
const instagramGetUrl = require("instagram-downloader").default; 
const router = express.Router(); 
router.get("/", async (req, res) => { const { url } = req.query; 
    try { const result = await instagramGetUrl(url); res.redirect(result.url_list[0]); } 
    catch (error) { res.status(500).send("Error downloading Instagram video."); } }); 
    module.exports = router;
