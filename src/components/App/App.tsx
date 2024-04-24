import React, { useState, useEffect } from 'react';
import './App.css';
import { NavMenu } from '../NavMenu/NavMenu';
import { Activities } from '../Articles/Articles';
// import { FullArticle } from '../FullArticle/FullArticle';
// import { categoryIds } from '../../utils';
import { Activity } from '../../types';

const URL_GET_EVENTS = 'https://kudago.com/public-api/v1.4/events/';
const FIELDS =
  'fields=id,publication_date,title,short_title,description,categories,images,tags,location';
const OPTIONS =
  'page_size=9&text_format=text&expand&order_by=-publication_date&location=msk';

export const App = () => {
  const [category, setCategory] = useState(
    'concert,theater,festival,exhibition'
  );
  const [activities, setActivities] = useState<Activity[] | null>(null);
  // const [fullArticleID, setFullArticleID] = useState<null | number>(null);

  const onNavClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // setFullArticleID(null);
    const category = e.currentTarget.dataset.cat;
    if (category) {
      setCategory(category);
    }
  };

  const onArticleClick = (id: number) => {
    // ДОБАВИТЬ СКРОЛЛ СТРАНИЦЫ ВВЕРХ ПРИ НАЖАТИИ НА ПРЕДЛОЖЕННЫЕ НОВОСТИ
    // setFullArticleID(id);
  };

  useEffect(() => {
    fetch(`${URL_GET_EVENTS}?${FIELDS}&${OPTIONS}&categories=${category}`)
      .then((response) => response.json())
      .then((data: Activity[]) => setActivities(data))
      .catch((error) => console.error(new Error(error)));
  }, [category, URL_GET_EVENTS, FIELDS, OPTIONS]);

  console.log(`category: ${category}`);
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
        {/* {fullArticleID ? (
          <FullArticle
            id={fullArticleID}
            categories={events.categories}
            sources={events.sources}
            onArticleClick={onArticleClick}
          />
        ) : (
          <Articles articles={events} onArticleClick={onArticleClick} />
        )} */}
        {activities && (
          <Activities activities={activities} onArticleClick={onArticleClick} />
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
