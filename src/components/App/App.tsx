import React, { useState, useEffect } from 'react';
import './App.css';
import { NavMenu } from '../NavMenu/NavMenu';
import { Articles } from '../Articles/Articles';
import { FullArticle } from '../FullArticle/FullArticle';
import { categoryIds } from '../../utils';
import { NewsAPI } from '../../types';

const URL2 = 'https://frontend.karpovcourses.net/api/v2/ru/news';

export const App = () => {
  const [category, setCategory] = useState('index');
  const [articles, setArticles] = useState<NewsAPI>({
    items: [],
    categories: [],
    sources: [],
  });
  const [fullArticleID, setFullArticleID] = useState<null | number>(null);

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
    fetch(`${URL2}/${categoryIds[category]}`)
      .then((response) => response.json())
      .then((data: NewsAPI) => setArticles(data))
      .catch((error) => console.error(new Error(error)));
  }, [category, URL2]);

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
          <FullArticle
            id={fullArticleID}
            categories={articles.categories}
            sources={articles.sources}
            onArticleClick={onArticleClick}
          />
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
