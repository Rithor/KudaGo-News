import React, { ElementType, FC } from 'react';
import './Title.css';
import classNames from 'classnames';

interface TitleProps {
  Component?: ElementType;
  children: React.ReactElement | string;
  className?: string;
}

export const Title: FC<TitleProps> = ({
  Component = 'h1',
  children,
  className,
}) => {
  return (
    <Component className={classNames('Title', className)}>
      {children}
    </Component>
  );
};
