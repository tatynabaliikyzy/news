const apiKey = "pub_836359928a70904a4455e852d938c5d7be812";
const blogContainer = document.getElementById("bolg-container");

async function fetchNews(query = "") {
    try {
        let apiUrl = "";

        if (query) {
            apiUrl = `https://newsdata.io/api/1/latest?country=kg&language=ru&q=${encodeURIComponent(query)}&apikey=${apiKey}`;
        } else {
            apiUrl = `https://newsdata.io/api/1/latest?country=kg&category=top&language=ru&apikey=${apiKey}`;
        }

        const response = await fetch(apiUrl);
        console.log("API Response Status:", response.status);
        const data = await response.json();
        console.log("Fetched Data:", data);

        return data.results;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image_url || "https://via.placeholder.com/150";
        img.alt = article.title || "No Title";

        const title = document.createElement("h2");
        const fullTitle = article.title || "No Title";
        title.textContent = fullTitle.length > 50 ? fullTitle.substring(0, 50) + ".." : fullTitle;

        const description = document.createElement("p");
        const fullDescription = article.description || "No Description Available.";
        description.textContent = fullDescription.length > 80 ? fullDescription.substring(0, 80) + "..." : fullDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener('click', () => {
            if (article.link) {
                window.open(article.link, "_blank");
            } else {
                console.error("No URL found for this article!");
            }
        });

        blogContainer.appendChild(blogCard);
    });

    const date = document.createElement("small");
date.textContent = new Date(article.pubDate).toLocaleDateString();
blogCard.appendChild(date);
}

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    const articles = await fetchNews(query);
    displayBlogs(articles);
});

(async () => {
    const articles = await fetchNews();
    displayBlogs(articles);
})();


const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

