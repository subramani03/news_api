
let inputs = document.getElementById("input")
let btn = document.getElementById("search-btn")
let BolgContainer = document.getElementById("bolg-container")

btn.addEventListener('click', async () => {
    const query = inputs.value.trim();
    if (query !== " ") {
        try {
            let articles = await news(query);
            displayBlogs(articles);

        }
        catch (error) {
            console.error("error fetching  news by query", error);
            return [];

        }
    }

})



async function news(query) {
    try {
        // let urls = `https://newsdata.io/api/1/news?apikey=pub_45266c23ff58971e9617097cf3208edc78847&q=${query}&language=en`
        let apiurl=`https://newsapi.org/v2/everything?q=${query}&from=2024-04-30&sortBy=publishedAt&pageSize=10&apiKey=1667700b488342b18d38005480d291fb&language=en`
        const response = await fetch(apiurl);
        const data = await response.json();
        console.log( data.articles)
        return data.articles
         //return data.results;
        
    }
    catch (error) {
        console.error("error fetching random news", error);
        return [];
    }

}
function displayBlogs(articles) {
    BolgContainer.innerHTML = ""
    articles.forEach((article) => {
        const bolgCard = document.createElement("div");
        bolgCard.classList.add("blog-card");
        const imgs = document.createElement('img');
        // imgs.src = article.image_url ? article.image_url : 'placeholder.jpg'; // Fallback if no image
        imgs.src = article.urlToImage? article.urlToImage: 'placeholder.jpg';
        // console.log(article.image_url)
        imgs.alt = article.title;
        const title = document.createElement('h2');
        title.textContent = article.title;
        const truncatedTitle = title.textContent.length > 30 ? title.textContent.slice(0, 30) + "....." : title.textContent;
        title.textContent = truncatedTitle;
        const description = document.createElement('p');
        description.textContent = article.description;
        const truncatedescription = description.textContent.length > 120 ? description.textContent.slice(0, 120) + "....." : description.textContent;
        description.textContent = truncatedescription;


        bolgCard.appendChild(imgs);
        bolgCard.appendChild(title);
        bolgCard.appendChild(description);
        bolgCard.addEventListener('click',()=>
            {
                window.open(article.url,"_blank")
            });
        BolgContainer.appendChild(bolgCard);
    })
}

