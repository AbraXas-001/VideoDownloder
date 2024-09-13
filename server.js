const path = require("path"); const dotenv = require("dotenv"); // Initialize express and environment variables dotenv.config(); 
const app = express(); 
// Serve static files from the "public" directory 
app.use(express.static(path.join(__dirname, "public"))); 
// Routes for video downloaders 
const youtubeDownloader = require("./src/youtubeDownloader"); 
const tiktokDownloader = require("./src/tiktokDownloader"); 
const instagramDownloader = require("./src/instagramDownloader"); 
app.use("/download/youtube", youtubeDownloader); app.use("/download/tiktok", tiktokDownloader); app.use("/download/instagram", instagramDownloader); 
// Start the server const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`);});