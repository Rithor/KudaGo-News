import React from 'react';
import './Page.css';
import { NavMenu } from '../NavMenu/NavMenu';

type AppProps = {
  children: React.ReactNode;
};

export const Page: React.FC<AppProps> = ({ children }: AppProps) => {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="container">
          <nav className="navigation grid header__navigation">
            <NavMenu />
          </nav>
        </div>
      </header>

      <main className="main">{children}</main>

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
    </div>
  );
};
