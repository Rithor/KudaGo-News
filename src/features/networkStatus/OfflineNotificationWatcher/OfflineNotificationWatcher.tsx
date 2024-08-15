import React, { FC } from 'react';
import './OfflineNotificationWatcher.css';
import { CSSTransition } from 'react-transition-group';
import { useNetworkStatusContext } from '@features/networkStatus/NetworkStatusContextProvider';
import { OfflineNotification } from '@components/OfflineNotification/OfflineNotification';

export const OfflineNotificationWatcher: FC = () => {
  const { online } = useNetworkStatusContext();
  return (
    <CSSTransition
      in={!online}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={300}
      classNames="offline-notification-animation"
    >
      <OfflineNotification />
    </CSSTransition>
  );
};
