import React, { FC } from 'react';
import { Logo } from '@components/Logo/Logo';
import { ColorSchemeSwitcherDesktop } from '@features/colorScheme/components/ColorSchemeSwitcherDesktop/ColorSchemeSwitcherDesktop';
import { NavMenu } from '@components/NavMenu/NavMenu';

export const DesktopHeader: FC = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <Logo />
        <NavMenu className="header__navigation" />
        <div
          className="header__controls"
          style={{ transform: 'translateX(0)' }}
        >
          <ColorSchemeSwitcherDesktop />
        </div>
      </div>
    </header>
  );
};
