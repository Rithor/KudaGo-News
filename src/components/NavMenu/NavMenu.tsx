import React, { FC } from 'react';
import { categoryNames } from '../../utils';
import './NavMenu.css';
import logo from '../../imgs/logo.svg';

type Props = {
  category: string;
  onNavClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const NavMenu: FC<Props> = ({ category, onNavClick }) => {
  return (
    <>
      <a
        onClick={onNavClick}
        href="#"
        data-cat="index"
        className="navigation__logo"
      >
        <img className="navigation__image" src={logo} alt="Логотип" />
      </a>
      <ul className="navigation__list">
        {['index', 'fashion', 'technologies', 'other', 'politics'].map(
          (cat) => {
            return (
              <li className="navigation__item" key={cat}>
                <a
                  onClick={onNavClick}
                  data-cat={cat}
                  href="#"
                  className={`navigation__link ${
                    category === cat ? 'navigation__link--active' : ''
                  }`}
                >
                  {categoryNames[cat]}
                </a>
              </li>
            );
          }
        )}
      </ul>
    </>
  );
};
