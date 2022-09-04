//Second Navbar news links

const navbar_news_links_function = () => {

    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => setting_navbar_news_links(data.data.news_category))
        .catch(error => console.log(error))
    //loading_spinner(true);

}

const setting_navbar_news_links = (data) => {

    const navbar_news_links_div = document.getElementById('navbar-news-links-div');
    data.forEach((value) => {
        const create_div = document.createElement('div');
        create_div.classList.add('create-second-navbar-news-div')
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

//main news
const main_news = (data) => {
    const items_found_category = document.getElementById('items-found-category');
    items_found_category.innerText = `${data.length} items found`;


    const main_news_div = document.getElementById('main-news-div');
    main_news_div.innerHTML = '';

    if (data.length === 0) {
        return alert('No news available on this page.');
    }


    data.forEach((value) => {
        const create_div = document.createElement('div');
        create_div.classList.add('container-div');
        create_div.classList.add('d-flex');
        create_div.innerHTML = `
       
        <div class="thumbnail">
            <img class="mt-5 mb-5 ps-5 thumbnail-img-main-news" src="${value.thumbnail_url ? value.thumbnail_url : 'no data found'}">
        </div>
        <div class="mt-2 content-container-div-main-news">
        <div class="mt-5 pt-4 ms-5 w-75 content-div-main-news">
            <h5 class="fw-bold title-main-news">${value.title ? value.title : 'no data found'}</h5>
            <p class="text-muted mt-2 ellipsis-content">${value.details ? value.details : 'no data found'}</p>
        </div>

        <div class="authorName-view ms-5 mt-5">
            
        <img class="author-img" src="${value.author.img ? value.author.img : 'no data found'}">
            
            
            
            <span class="text-secondary ms-1">${value.author.name ? value.author.name : 'no data found'}</span>

            <span class="ms-5 ps-5 total-view-main-news"> <i class="fa-regular fa-eye"></i> ${value.total_view ? value.total_view : 'no data found'}</span>

                <i onclick="news_details('${value._id}')" type="button" class="fa-solid fa-arrow-right-long ms-5 ps-5 details-icon-button" data-bs-toggle="modal" data-bs-target="#newsDetailsModal"></i>
        </div>
        </div>
        
        `
        main_news_div.appendChild(create_div);
    })
}

//details news on Modal
const news_details = (newsId) => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(data => details_on_error(data.data[0]))
        .catch(error => console.log(error));
}
//adding on modal
const details_on_error = (datas) => {
    const title = document.getElementById('title');
    title.innerText = `${datas.title ? datas.title : 'no title available'}`;

    const thumbnail_img = document.getElementById('thumbnails-img');
    thumbnail_img.innerHTML = `
       <img class='rounded mx-auto d-block w-25' src='${datas.thumbnail_url ? datas.thumbnail_url : 'no images available'}'>`

    const details = document.getElementById('details');
    details.innerHTML =
        `<p class="details-text"><b>Details:</b> ${datas.details ? datas.details : 'no news available'}</p>

        <h6 class=" mt-2">Rating Number: ${datas.rating.number ? datas.rating.number : 'not available'} </h6>

        <h6 class="mt-2 pb-4">Rating Badge: ${datas.rating.badge ? datas.rating.badge : 'not available'} </h6>

        <img class="author-details-section-img " src='${datas.author.img ? datas.author.img : ' img not available'}' >

        <span class="fw-bold">Author: ${datas.author.name ? datas.author.name : 'not available'} </span>

       <h6 class="ms-5 ps-3 mt-2">Published Date: ${datas.author.published_date ? datas.author.published_date : 'not available'} </h6>
      <div class="ms-5 ps-3">
       <h6 class="">Total View: <i class="fa-regular fa-eye"></i> ${datas.total_view ? datas.total_view : 'no data found'}</h6>
       </div>
        `;
}

//loading spinner

const loading_spinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        return spinner.classList.remove('d-none');
    }
    else {
        return spinner.classList.add('d-none');
    }
}
categories('01');
navbar_news_links_function();