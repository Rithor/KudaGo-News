import React, { useState } from 'react';
import './Page.css';
import { NavMenu } from '../NavMenu/NavMenu';
import { Logo } from '../Logo/Logo';
import { EmailModal } from '../EmailModal/EmailModal';
import { Header } from '@components/Header/Header';

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown';

type AppProps = {
  children: React.ReactNode;
};

export const Page: React.FC<AppProps> = ({ children }: AppProps) => {
  const [isEmailModalShow, setIsEmailModalShow] = useState(
    !localStorage.getItem(LS_EMAIL_SHOWN_KEY)
  );
  return (
    <div className="wrapper">
      <EmailModal
        shown={isEmailModalShow}
        onClose={() => {
          localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true');
          setIsEmailModalShow(false);
        }}
      />

      <Header />

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
