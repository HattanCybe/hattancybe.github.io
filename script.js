
window.addEventListener('DOMContentLoaded', () => {
  fetchCyberNews();
});

function fetchCyberNews() {
  
  const apiUrl = `https://gnews.io/api/v4/top-headlines?q=cybersecurity&lang=en&max=5&token=eab91fabaea237cf2c9229d7e483147b`;
  
  const container = document.getElementById('news-container');

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

      container.innerHTML = '';

      if (!data.articles || data.articles.length === 0) {
        container.innerHTML = '<p>Could not load news feed.</p>';
        console.warn('GNews error:', data);
        return;
      }


      data.articles.forEach(item => {

        const newsHtml = `<div class="news-item">
            <h4 class="news-title">
              <a href="${item.url}" target="_blank">${item.title}</a>
            </h4>
            <p class="news-source">Source: ${item.source.name}</p>
          </div>`;
        container.innerHTML += newsHtml;
      });
    })
    .catch(error => {
      console.error('Error fetching cyber news:', error);
      container.innerHTML = '<p>Could not load news feed.</p>';
    });
}