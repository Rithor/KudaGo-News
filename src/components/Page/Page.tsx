import React, { useEffect, useState } from 'react';
import './Page.css';
import { EmailModal } from '../EmailModal/EmailModal';
import { OfflineNotificationWatcher } from '@features/networkStatus/OfflineNotificationWatcher/OfflineNotificationWatcher';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';

const LS_EMAIL_SHOWN_KEY = 'kudago:email_modal_shown';

type AppProps = {
  children: React.ReactNode;
};

export const Page: React.FC<AppProps> = ({ children }: AppProps) => {
  const [isEmailModalShow, setIsEmailModalShow] = useState(
    !localStorage.getItem(LS_EMAIL_SHOWN_KEY)
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 60000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="wrapper">
      {isVisible && (
        <EmailModal
          shown={isEmailModalShow}
          onClose={() => {
            localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true');
            setIsEmailModalShow(false);
          }}
        />
      )}

      <Header />

      <main className="main">{children}</main>

      <Footer />
      <OfflineNotificationWatcher />
    </div>
  );
};
