import React, { useState, useEffect } from 'react';
import './App.css';
import { NavMenu } from '../NavMenu/NavMenu';
import { Articles } from '../Articles/Articles';
import { FullArticle } from '../FullArticle/FullArticle';
import { ArticlesAPI, Article } from '../../types';
import { getActualDate } from '../../utils';

const URL_GET_EVENTS =
  'https://thingproxy.freeboard.io/fetch/https://kudago.com/public-api/v1.4/events/';
const FIELDS =
  'fields=id,publication_date,title,short_title,description,categories,images,tags,location,place,dates';
const OPTIONS = `page_size=12&text_format=text&expand=place&order_by=-publication_date&location=msk&actual_since=${getActualDate()}`;

export const App = () => {
  const [category, setCategory] = useState(
    'concert,theater,festival,exhibition'
  );
  const [articles, setArticles] = useState<Article[]>([]);
  const [fullArticleID, setFullArticleID] = useState<number | null>(null);

  const onNavClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFullArticleID(null);
    const category = e.currentTarget.dataset.cat;
    if (category) {
      setCategory(category);
    }
  };

  const onArticleClick = (id: number) => {
    // ДОБАВИТЬ СКРОЛЛ СТРАНИЦЫ ВВЕРХ ПРИ НАЖАТИИ НА ПРЕДЛОЖЕННЫЕ НОВОСТИ
    setFullArticleID(id);
  };

  useEffect(() => {
    fetch(`${URL_GET_EVENTS}?${FIELDS}&${OPTIONS}&categories=${category}`)
      .then((response) => response.json())
      .then((data: ArticlesAPI) => setArticles(data.results))
      .catch((e) => console.error(new Error(e)));
  }, [category, URL_GET_EVENTS, FIELDS, OPTIONS]);

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
        {fullArticleID ? (
          <FullArticle id={fullArticleID} onArticleClick={onArticleClick} />
        ) : (
          <Articles articles={articles} onArticleClick={onArticleClick} />
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <nav className="navigation grid footer__navigation">
            <NavMenu onNavClick={onNavClick} category={category} />
          </nav>
          <div className="footer__column">
            <p className="footer__text">
              Сделано на Frontend курсе в{' '}
              <a
                href="https://karpov.courses/frontend"
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                Karpov.Courses
              </a>
            </p>
            <p className="footer__copyright">© 2024</p>
          </div>
        </div>
      </footer>
    </>
  );
};
