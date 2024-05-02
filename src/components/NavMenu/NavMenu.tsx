import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavMenu.css';
import { categoryNames } from '../../utils';
import logo from '../../imgs/logo.svg';

export const NavMenu = () => {
  const categories = ['main', 'concert', 'theater', 'festival', 'exhibition'];
  const location = useLocation();
  return (
    <>
      <NavLink to="main" className="navigation__logo">
        <img className="navigation__image" src={logo} alt="Логотип" />
      </NavLink>
      <ul className="navigation__list">
        {categories.map((cat) => {
          return (
            <li className="navigation__item" key={cat}>
              <NavLink
                to={cat}
                className={({ isActive }) => {
                  let finalClass = isActive
                    ? 'navigation__link navigation__link--active'
                    : 'navigation__link';
                  if (location.pathname === '/' && cat === 'main') {
                    finalClass = 'navigation__link navigation__link--active';
                  }
                  return finalClass;
                }}
              >
                {categoryNames[cat]}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};
