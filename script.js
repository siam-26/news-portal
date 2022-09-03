//Navbar news links

const navbar_news_links_function = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => setting_navbar_news_links(data.data.news_category))
        .catch(error => console.log(error))

}

const setting_navbar_news_links = (data) => {
    const navbar_news_links_div = document.getElementById('navbar-news-links-div');
    data.forEach((value) => {
        const create_div = document.createElement('div');
        create_div.innerHTML = `
        <button onclick="categories('${value.category_id}')" type="button" class="btn text-muted ms-4 me-2">${value.category_name}</button>
        `
        navbar_news_links_div.appendChild(create_div);
    })
}

//Categories

const categories = (category_id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data => console.log(data.data))
        .catch(error => console.log(error));
}

navbar_news_links_function();