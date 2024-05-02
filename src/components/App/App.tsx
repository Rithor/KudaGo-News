import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { NavMenu } from '../NavMenu/NavMenu';
import { Articles } from '../Articles/Articles';
import { FullArticle } from '../FullArticle/FullArticle';

export const App = () => {
  console.log(`export const App`);

  const { pathname } = useLocation();
  React.useEffect(() => {
    console.log(`window.scrollTo(0, 0);`);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="navigation grid header__navigation">
            <NavMenu />
          </nav>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Articles />}></Route>
          <Route path="/:category" element={<Articles />}></Route>
          <Route path="/fullarticle/:id" element={<FullArticle />}></Route>
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <nav className="navigation grid footer__navigation">
            <NavMenu />
          </nav>
          <div className="footer__column">
            <p className="footer__text">
              Сделано на{' '}
              <a
                href="https://docs.kudago.com/api/#"
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                API KudaGo
              </a>
            </p>
            <p className="footer__copyright">© 2024</p>
          </div>
        </div>
      </footer>
    </>
  );
};
