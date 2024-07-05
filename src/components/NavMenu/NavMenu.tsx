import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';
import { categoryNames } from '../../app/utils';
import classNames from 'classnames';
import { useAdaptive } from '@app/hooks';

interface Props {
  className?: string;
}

interface MyNavLinkProps {
  title?: string;
  path?: string;
}

const MyNavLink: FC<MyNavLinkProps> = ({ title = '', path = '' }) => {
  const { isMobile } = useAdaptive();
  const navLinkClassName = isMobile
    ? 'navigation__link navigation__link--mobile'
    : 'navigation__link';
  return (
    <NavLink
      to={`/${path}`}
      className={({ isActive }) => {
        return isActive
          ? `${navLinkClassName} navigation__link--active`
          : `${navLinkClassName}`;
      }}
    >
      {title}
    </NavLink>
  );
};

export const NavMenu: FC<Props> = ({ className = '' }) => {
  const categories = ['concert', 'theater', 'festival', 'exhibition'];
  return (
    <nav>
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
    </nav>
  );
};
