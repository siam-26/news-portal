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
        .then(data => main_news(data.data))
        .catch(error => console.log(error));
}

const main_news = (data) => {
    const main_news_div = document.getElementById('main-news-div');
    main_news_div.innerHTML = '';
    data.forEach((value) => {
        const create_div = document.createElement('div');
        create_div.classList.add('container-div');
        create_div.classList.add('d-flex');
        create_div.innerHTML = `
       
        <div class="thumbnail">
            <img class="mt-5 mb-5 ps-5" src="${value.thumbnail_url ? value.thumbnail_url : 'no data found'}">
        </div>
        <div class="mt-2">
        <div class="mt-5 pt-4 ms-5 w-75">
            <h5 class="fw-bold">${value.title ? value.title : 'no data found'}</h5>
            <p class="text-muted ellipsis-content mt-2">${value.details ? value.details : 'no data found'}</p>
        </div>

        <div class="authorName-view ms-5 mt-5">
            
        <img class="author-img" src="${value.author.img ? value.author.img : 'no data found'}">
            
            <span class="text-secondary ms-1">${value.author.name ? value.author.name : 'no data found'}</span>
            
            <span class="ms-5 ps-5"> <i class="fa-regular fa-eye"></i> ${value.total_view ? value.total_view : 'no data found'}</span>
            
            <i onclick="news_details('${value._id}')" class="fa-solid fa-arrow-right-long ms-5 ps-5 details-icon-button"
            data-bs-toggle="modal" data-bs-target="#newsDetailsModal"></i>

        </div>
        </div>
        
        `
        main_news_div.appendChild(create_div);
    })
}

const news_details = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => details_on_modal(data.data[0]))
        .catch(error => console.log(error));
}
const details_on_modal = (data) => {
    const modal_container_div = document.getElementById('modal-container-div');

    const title = document.getElementById('title');
    title.innerText = `${data.title ? data.title : 'no data found'}`;

    const details_news_text = document.getElementById('details-news-text');
    details_news_text.innerText = `${data.details ? data.details : 'no data found'}`;

}
navbar_news_links_function('Breaking News');