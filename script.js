// const apiKey = "pub_836359928a70904a4455e852d938c5d7be812";

// const blogContainer = document.getElementById
// ("bolg-container");


// async function fetchRandomNews(){
//     try{
//         const apiUrl = `https://newsdata.io/api/1/sources?country=kg&pageSize=10&apiKey=${apiKey}`;
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         // console.log(data);
//         return data.articles;

//     } catch(error){
//         console.error("Error fetching random news", error);
//         return [];

//     }
// }


// function displayBlogs(articles){

//     blogContainer.innerHTML = "";
//     articles.forEach((article) =>{
//         const blogCard = document.createElement("div");
//         blogCard.classList.add("blog-card");
//         const img = document.createElement("img");
//         img.src = article.utlToImage;
//         img.alt = article.title;
//         const title = document.createElement("h2");
//         title.textContent = article.title;
//         const description = document.createElement("p");
//         description.textContent = article.description;


//         blogCard.appendChild(img);
//         blogCard.appendChild(title);
//         blogCard.appendChild(description);
//         blogContainer.appendChild(blogCard);
//     });
// }


// (async ()=>{
//     try{
//        const articles = await fetchRandomNews();
//     //    console.log(articles);
//     displayBlogs(articles);
//     } catch(error){
//         console.error("Error fetching random news", error);

//     }

// }) ();















// NEW VERSION



const apiKey = "pub_836359928a70904a4455e852d938c5d7be812";

const blogContainer = document.getElementById("bolg-container"); // fixed typo here

// async function fetchRandomNews() {
//     try {
//         const apiUrl = `https://newsdata.io/api/1/latest?country=kg&language=ru&apikey=${apiKey}`;
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         return data.articles; // should access 'results', not 'articles'
//     } catch (error) {
//         console.error("Error fetching random news", error);
//         return [];
//     }
// }


async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsdata.io/api/1/latest?country=kg&language=ru&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        console.log("API Response Status:", response.status); // 👈 log status
        const data = await response.json();
        console.log("Fetched Data:", data); // 👈 log data
        return data.results; 
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}






function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image_url || "https://via.placeholder.com/150"; // fallback if no image
        img.alt = article.title || "No Title";

        // const title = document.createElement("h2");
        // title.textContent = article.title || "No Title";

        const title = document.createElement("h2");
        const fullTitle = article.title || "No Title";
        title.textContent = fullTitle.length > 50
        ? fullTitle.substring(0, 50) + ".." 
        : fullTitle;


        // const description = document.createElement("p");
        // description.textContent = article.description || "No Description Available.";

        const description = document.createElement("p");
        const fullDescription = article.description || "No Description Available.";
        description.textContent = fullDescription.length > 80
        ? fullDescription.substring(0, 80) + "..." 
        : fullDescription;


        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying blogs", error);
    }
})();
