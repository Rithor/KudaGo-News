import React, { FC } from 'react';
import { Logo } from '@components/Logo/Logo';
import './Footer.css';
import { NavMenu } from '@components/NavMenu/NavMenu';

export const Footer: FC = () => {
  return (
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
  );
};
