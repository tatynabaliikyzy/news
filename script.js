const apiKey = "pub_836359928a70904a4455e852d938c5d7be812";

const blogContainer = document.getElementById
("bolg-container");


async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsdata.io/api/1/sources?country=kg&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);
        return data.articles;

    } catch(error){
        console.error("Error fetching random news", error);
        return [];

    }
}


function displayBlogs(articles){

    blogContainer.innerHTML = "";
    articles.forEach((article) =>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.utlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        title.textContent = article.title;
        const description = document.createElement("p");
        description.textContent = article.description;


        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });
}


(async ()=>{
    try{
       const articles = await fetchRandomNews();
    //    console.log(articles);
    displayBlogs(articles);
    } catch(error){
        console.error("Error fetching random news", error);

    }

}) ();