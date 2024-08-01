import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';
import { categoryNames } from '../../app/utils';
import classNames from 'classnames';
import { useAdaptive } from '@app/hooks';

interface Props {
  className?: string;
  onClick?: VoidFunction;
}

interface MyNavLinkProps {
  title?: string;
  path?: string;
  onClick?: VoidFunction;
}

const MyNavLink: FC<MyNavLinkProps> = ({
  title = '',
  path = '',
  onClick,
}) => {
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
      onClick={onClick}
    >
      {title}
    </NavLink>
  );
};

export const NavMenu: FC<Props> = ({ className = '', onClick }) => {
  const categories = ['concert', 'theater', 'festival', 'exhibition'];
  return (
    <nav>
      <ul className={classNames(className, 'navigation__list')}>
        <li className="navigation__item">
          <MyNavLink title="Новости" onClick={onClick} />
        </li>

        {categories.map((cat) => {
          return (
            <li className="navigation__item" key={cat}>
              <MyNavLink
                path={cat}
                title={categoryNames[cat]}
                onClick={onClick}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
