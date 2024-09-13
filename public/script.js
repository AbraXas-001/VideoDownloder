document.getElementById('downloadForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const url = document.getElementById('url').value;
  const platform = document.getElementById('platform').value;
  const quality = document.getElementById('quality').value;
  const resultDiv = document.getElementById('result');

  try {
    resultDiv.innerHTML = "Downloading...";

    const response = await fetch(`/download/${platform}?url=${encodeURIComponent(url)}&quality=${quality}`);
    if (response.ok) {
      resultDiv.innerHTML = `<a href="${response.url}">Download Link</a>`;
    } else {
      resultDiv.innerHTML = "Failed to download. Please check the URL.";
    }
  } catch (error) {
    resultDiv.innerHTML = "Error occurred. Try again.";
  }
});