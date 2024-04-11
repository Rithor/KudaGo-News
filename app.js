'use strict'

const categoryIds = {
  index: 0,
  politics: 4,
  technologies: 1,
  other: 5,
  fashion: 3,
}

const categoryNames = {
  index: 'Главная',
  fashion: 'Мода',
  technologies: 'Технологии',
  politics: 'Политика',
  other: 'Разное',
}

const URL1 = 'https://frontend.karpovcourses.net/api/v2/ru/news';

const MainArticle = ({ image, category, title, description, source }) => {
  return (
    <article className="main-article">
      <div className="main-article__image-container">
        <img className="main-article__image"
          src={image || "./imgs/no_icon.png"} alt="Фото новости" />
      </div>
      <div className="main-article__content">
        <span className="article-category main-article__category">{category}</span>
        <h2 className="main-article__title">{title}</h2>
        <p className="main-article__text">{description}</p>
        <span className="article-source main-article__source">{source}</span>
      </div>
    </article>
  )
}

const SmallArticle = ({ title, source, date }) => {
  return (
    <article className="small-article">
      <h2 className="small-article__title">{title}</h2>
      <span className="article-date">
        {source}
      </span>
      <span className="article-source">
        {new Date(date).toLocaleDateString('ru-RU', {
          month: 'long',
          day: 'numeric'
        })}
      </span>
    </article>
  )
}

const NavMenu = ({ onNavClick, category }) => {
  return (
    <><a href="#" data-cat='index' className="navigation__logo">
      <img className="navigation__image" src="./imgs/logo.svg" alt="Логотип" />
    </a>
      <ul className="navigation__list">
        {['index', 'fashion', 'technologies', 'other', 'politics'].map((cat) => {
          return (<li className="navigation__item" key={cat}>
            <a
              onClick={onNavClick}
              data-cat={cat}
              href="#"
              className={`navigation__link ${category === cat ? "navigation__link--active" : ""}`}
            >{categoryNames[cat]}</a>
          </li>)
        })}
      </ul></>
  )
}

const App = () => {
  const [category, setCategory] = React.useState('index');
  const [articles, setArticles] = React.useState({ items: [], categories: [], sources: [] });

  const onNavClick = (e) => {
    e.preventDefault();
    setCategory(e.currentTarget.dataset.cat);
  }

  React.useEffect(() => {
    fetch(`${URL1}/${categoryIds[category]}`)
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error(new Error(error)));
  }, [category]);

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="navigation grid header__navigation">
            <NavMenu onNavClick={onNavClick} category={category} />
          </nav>
        </div>
      </header>

      <main className="main">
        <section className="articles">
          <div className="container grid">
            <section className="articles__big-column">

              {articles.items.slice(0, 3).map(news => {
                return (
                  <MainArticle
                    key={news.id}
                    image={news.image}
                    category={articles.categories.find(cat => cat.id === news.category_id).name}
                    title={news.title}
                    description={news.description}
                    source={articles.sources.find(source => source.id === news.source_id).name}
                  />
                )
              })}

            </section>

            <section className="articles__small-column">

              {articles.items.slice(3, 12).map(news => {
                return (
                  <SmallArticle
                    key={news.id}
                    title={news.title}
                    source={articles.sources.find(({ id }) => news.source_id === id).name}
                    date={news.date}
                  />
                )
              })}

            </section>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <nav className="navigation grid footer__navigation">
            <NavMenu onNavClick={onNavClick} category={category} />
          </nav>
          <div className="footer__column">
            <p className="footer__text">Сделано на Frontend курсе в <a href="https://karpov.courses/frontend" target="_blank"
              className="footer__link">Karpov.Courses</a></p>
            <p className="footer__copyright">© 2021</p>
          </div>
        </div>
      </footer>
    </>
  )
};

// ReactDOM.render(<App />, document.getElementById('root'));

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);