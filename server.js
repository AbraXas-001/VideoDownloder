const express = require('express');
const ytdl = require('ytdl-core');
const InstagramDownloader = require('instagram-downloader');
const TikTokScraper = require('tiktok-scraper');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static('public'));

// YouTube download route
app.get('/download-youtube', async (req, res) => {
    const videoURL = req.query.url;
    const type = req.query.type; // 'video' or 'audio'
    const quality = req.query.quality;

    if (!ytdl.validateURL(videoURL)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        const info = await ytdl.getInfo(videoURL);
        let format;

        if (type === 'audio') {
            format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        } else {
            format = ytdl.chooseFormat(info.formats, { quality: quality || 'highest' });
        }

        res.header('Content-Disposition', `attachment; filename="video.${format.container}"`);
        ytdl(videoURL, { format }).pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to download video' });
    }
});

// TikTok download route
app.get('/download-tiktok', async (req, res) => {
    const videoURL = req.query.url;
    
    try {
        const videoMeta = await TikTokScraper.getVideoMeta(videoURL);
        const videoPath = path.resolve(__dirname, 'downloads', `${Date.now()}.mp4`);

        const file = fs.createWriteStream(videoPath);
        const videoStream = await TikTokScraper.downloadVideo(videoMeta);
        
        videoStream.pipe(file).on('close', () => {
            res.download(videoPath, (err) => {
                fs.unlinkSync(videoPath); // Delete the file after sending it
            });
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to download TikTok video' });
    }
});

// Instagram download route
app.get('/download-instagram', async (req, res) => {
    const videoURL = req.query.url;
    
    try {
        const video = await InstagramDownloader.download(videoURL);
        res.redirect(video.url);
    } catch (error) {
        res.status(400).json({ error: 'Failed to download Instagram video' });
    }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
              
