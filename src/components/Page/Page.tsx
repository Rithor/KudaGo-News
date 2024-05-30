import React from 'react';
import './Page.css';
import { NavMenu } from '../NavMenu/NavMenu';
import { Logo } from '../Logo/Logo';
import { ColorSchemeSwitcher } from '../ColorSchemeSwitcher/ColorSchemeSwitcher';

type AppProps = {
  children: React.ReactNode;
};

export const Page: React.FC<AppProps> = ({ children }: AppProps) => {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="container header__container">
          <Logo />
          <NavMenu className="header__navigation" />
          <ColorSchemeSwitcher />
        </div>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <div className="container footer__container">
          <div className="footer__top">
            <Logo />
            <NavMenu className="footer__navigation" />
          </div>
          <div className="footer__text">
            Сделано на{' '}
            <a
              href="https://docs.kudago.com/api/#"
              target="_blank"
              className="footer__link"
              rel="noreferrer"
            >
              API KudaGo
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
