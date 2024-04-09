'use strict'

const URL1 = 'https://frontend.karpovcourses.net/api/v2/ru/news';
const category = {
  '/fashion.html': 3,
  '/tech.html': 1,
  '/other.html': 5,
  '/politics.html': 4,
};

async function getNewsData(category_id = '') {
  try {
    const response = await fetch(`${URL1}/${category_id}`).then(response => response.json());
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

function escapeString(string) {
  const symbols = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  }
  return string.replace(/[&<>]/g, (tag) => { symbols[tag] || tag; })
}

async function renderBigColumnNews() {
  const data = await getNewsData(category[location.pathname]);
  const container = document.querySelector('.articles__big-column');
  container.innerHTML = '';

  const bigColumnNews = data.items.slice(0, 3);
  bigColumnNews.forEach(news => {
    const articleCat = data.categories.find(cat => cat.id === news.category_id).name;
    const articleSource = data.sources.find(source => source.id === news.source_id).name;
    const image = news.image || "./imgs/no_icon.png";
    const mainArticle = document.createElement('article');
    mainArticle.classList.add('main-article');
    mainArticle.innerHTML = `
      <div class="main-article__image-container">
        <img class="main-article__image" src="${encodeURI(image)}" alt="Фото новости">
      </div>
      <div class="main-article__content">
        <span class="article-category main-article__category">${escapeString(articleCat)}</span>
        <h2 class="main-article__title">${escapeString(news.title)}</h2>
        <p class="main-article__text">${escapeString(news.description)}</p>
        <span class="article-source main-article__source">${escapeString(articleSource)}</span>
      </div>
    `;
    container.append(mainArticle);
  });
}

async function renderSmallColumnNews() {
  const data = await getNewsData(category[location.pathname]);
  const container = document.querySelector('.articles__small-column');
  container.innerHTML = '';

  const smallColumnNews = data.items.slice(3, 12);
  smallColumnNews.forEach(news => {
    const articleSource = data.sources.find(source => source.id === news.source_id).name;
    const date = new Date(news.date)
      .toLocaleString('ru-RU', { month: 'long', day: 'numeric' });
    const smallArticle = document.createElement('article');
    smallArticle.classList.add('small-article');
    smallArticle.innerHTML = `
      <h2 class="small-article__title">${escapeString(news.title)}</h2>
      <p class="small-article__caption">
        <span class="article-date small-article__date">${date}</span>
        <span class="article-source small-article__source">${escapeString(articleSource)}</span>
      </p>
    `;
    container.append(smallArticle);
  });
}

renderBigColumnNews();
renderSmallColumnNews();