const API_KEY = "6c6081f82a55475aadc486d307c050e9"; // Replace with your actual API Key
const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

async function fetchNews() {
    try {
        let response = await fetch(NEWS_URL);
        let data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Clear previous news

    articles.forEach(article => {
        let newsItem = document.createElement("div");
        newsItem.classList.add("news-item");

        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="News Image">
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;

        newsContainer.appendChild(newsItem);
    });
}

fetchNews();
