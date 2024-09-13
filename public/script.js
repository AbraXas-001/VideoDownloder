function startDownload() {
    const videoURL = document.getElementById('video-url').value;
    const platform = document.getElementById('platform').value;
    const downloadType = document.getElementById('download-type').value;
    const quality = document.getElementById('quality').value;

    let downloadURL = '';

    if (platform === 'youtube') {
        downloadURL = `/download-youtube?url=${videoURL}&type=${downloadType}&quality=${quality}`;
    } else if (platform === 'tiktok') {
        downloadURL = `/download-tiktok?url=${videoURL}`;
    } else if (platform === 'instagram') {
        downloadURL = `/download-instagram?url=${videoURL}`;
    }

    // Redirect to the backend download route
    window.location.href = downloadURL;
}
