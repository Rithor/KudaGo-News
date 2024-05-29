import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';
import { categoryNames } from '../../utils';
import classNames from 'classnames';

interface Props {
  className?: string;
}

interface MyNavLinkProps {
  title?: string;
  path?: string;
}

const MyNavLink: FC<MyNavLinkProps> = ({ title = '', path = '' }) => {
  return (
    <NavLink
      to={`/${path}`}
      className={({ isActive }) => {
        return isActive
          ? 'navigation__link navigation__link--active'
          : 'navigation__link';
      }}
    >
      {title}
    </NavLink>
  );
};

export const NavMenu: FC<Props> = ({ className = '' }) => {
  const categories = ['concert', 'theater', 'festival', 'exhibition'];
  return (
    <ul className={classNames(className, 'navigation__list')}>
      <li className="navigation__item">
        <MyNavLink title="Новости" />
      </li>

      {categories.map((cat) => {
        return (
          <li className="navigation__item" key={cat}>
            <MyNavLink path={cat} title={categoryNames[cat]} />
          </li>
        );
      })}
    </ul>
  );
};
