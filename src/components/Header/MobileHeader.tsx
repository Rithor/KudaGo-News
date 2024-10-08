import React, { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { createFocusTrap } from 'focus-trap';
import classNames from 'classnames';
import { ColorSchemeSwitcherMobile } from '@features/colorScheme/components/ColorSchemeSwitcherMobile/ColorSchemeSwitcherMobile';
import { Logo } from '@components/Logo/Logo';
import { Burger } from '@components/Icons/Burger';
import { Cross } from '@components/Icons/Cross';
import { NavMenu } from '@components/NavMenu/NavMenu';

export const MobileHeader: FC = () => {
  const ref = useRef<HTMLElement | null>(null);

  const [isOpenMenu, toggleMenu] = useState(false);
  const [isOpenSubMenu, toggleSubMenu] = useState(false);
  const documentKeydownListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      toggleMenu(false);
    }
  };

  useEffect(() => {
    const trap = createFocusTrap(ref.current as HTMLElement);

    if (isOpenMenu) {
      trap.activate();
      document.documentElement.classList.add('--prevent-scroll');
    }

    return () => {
      trap.deactivate();
      document.documentElement.classList.remove('--prevent-scroll');
    };
  }, [isOpenMenu]);

  // todo: закрытие меню при нажатии на фон

  useEffect(() => {
    if (isOpenMenu) {
      document.addEventListener('keydown', documentKeydownListener);
    } else {
      document.removeEventListener(
        'keydown',
        documentKeydownListener
      );
    }

    return () => {
      document.removeEventListener(
        'keydown',
        documentKeydownListener
      );
    };
  }, [isOpenMenu]);

  const handleNavMenuClick = () => {
    toggleMenu(!isOpenMenu);
  };
  const closeSubMenu = () => {
    toggleSubMenu(false);
  };

  return (
    <header className="header" ref={ref}>
      <div className="container header__mobile-container">
        <Logo />
        <button
          aria-label={isOpenMenu ? 'Скрыть меню' : 'Открыть меню'}
          className="header__mobile-button"
          onClick={() => {
            toggleMenu(!isOpenMenu);
            setTimeout(closeSubMenu, 300);
          }}
        >
          {isOpenMenu ? <Cross /> : <Burger />}
        </button>
      </div>
      <CSSTransition
        in={isOpenMenu}
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="header-mobile-menu-animation"
      >
        <div className="header__mobile-overlay">
          <div className="header__mobile-backdrop" />
          <div className="header__mobile-menu">
            {isOpenSubMenu ? (
              <button
                className="header__mobile-back-button"
                onClick={closeSubMenu}
              >
                К меню
              </button>
            ) : (
              <NavMenu
                className="header__mobile-navigation"
                onClick={handleNavMenuClick}
              />
            )}

            <div
              className={classNames('header__mobile-controls', {
                'header__mobile-controls--hasMenu': isOpenSubMenu,
              })}
            >
              <ColorSchemeSwitcherMobile
                isMenuActive={isOpenSubMenu}
                onClickSchemeButton={() => toggleSubMenu(true)}
              />
            </div>
          </div>
        </div>
      </CSSTransition>
    </header>
  );
};
