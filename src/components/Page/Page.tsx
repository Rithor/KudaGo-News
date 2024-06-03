import React, { useState } from 'react';
import './Page.css';
import { NavMenu } from '../NavMenu/NavMenu';
import { Logo } from '../Logo/Logo';
import { ColorSchemeSwitcher } from '../ColorSchemeSwitcher/ColorSchemeSwitcher';
import { EmailModal } from '../EmailModal/EmailModal';

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown';

type AppProps = {
  children: React.ReactNode;
};

export const Page: React.FC<AppProps> = ({ children }: AppProps) => {
  const [emailModalShown, setEmailModalShown] = useState(
    !!localStorage.getItem(LS_EMAIL_SHOWN_KEY)
  );
  return (
    <div className="wrapper">
      {!emailModalShown && (
        <EmailModal
          onClose={() => {
            localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true');
            setEmailModalShown(true);
          }}
        />
      )}
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
