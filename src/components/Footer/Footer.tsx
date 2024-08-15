import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { Logo } from '@components/Logo/Logo';
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
          <div>
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
          <Link to={'/admin'}>Админка</Link>
        </div>
      </div>
    </footer>
  );
};
