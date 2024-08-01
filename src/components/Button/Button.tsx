import React, { ButtonHTMLAttributes, FC } from 'react';
import './Button.css';
import classNames from 'classnames';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  loading = false,
  onClick,
  className,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      {...restProps}
      className={classNames(className, 'button')}
      onClick={loading ? undefined : onClick}
    >
      {children}
      {loading && (
        <span className="button__loading">
          <img
            className="button__spinner"
            src={require('@images/spinner.svg')}
            alt="Спиннер"
          />
        </span>
      )}
    </button>
  );
};
