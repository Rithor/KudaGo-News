import React, { FC } from 'react';
import './ColorSchemeSwitcherMenu.css';
import classNames from 'classnames';
import { ColorSchemeSwitcherValues } from '@features/colorScheme/types';
import { Auto } from '@components/Icons/Auto';
import { Moon } from '@components/Icons/Moon';
import { Sun } from '@components/Icons/Sun';
import check from '@images/check.svg';

interface Props {
  selectedScheme: ColorSchemeSwitcherValues;
  onChangeScheme: (value: ColorSchemeSwitcherValues) => any;
  className?: string;
}

export const ColorSchemeSwitcherMenu: FC<Props> = ({
  selectedScheme,
  onChangeScheme,
  className,
}) => {
  return (
    <div
      className={classNames('color-scheme-switcher-menu', className)}
      role="listbox"
    >
      <button
        className="color-scheme-switcher-menu__option"
        onClick={() => onChangeScheme('auto')}
        aria-selected={selectedScheme === 'auto'}
        role="option"
      >
        <Auto />
        <span className="color-scheme-switcher-menu__text">Авто</span>
        {selectedScheme === 'auto' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={check}
            alt="Выбранная тема"
            aria-hidden
          />
        )}
      </button>
      <button
        className="color-scheme-switcher-menu__option"
        onClick={() => onChangeScheme('light')}
        aria-selected={selectedScheme === 'light'}
        role="option"
      >
        <Sun />
        <span className="color-scheme-switcher-menu__text">
          Светлая
        </span>
        {selectedScheme === 'light' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={check}
            alt="Выбранная тема"
            aria-hidden
          />
        )}
      </button>
      <button
        className="color-scheme-switcher-menu__option"
        onClick={() => onChangeScheme('dark')}
        aria-selected={selectedScheme === 'dark'}
        role="option"
      >
        <Moon />
        <span className="color-scheme-switcher-menu__text">
          Темная
        </span>
        {selectedScheme === 'dark' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={check}
            alt="Выбранная тема"
            aria-hidden
          />
        )}
      </button>
    </div>
  );
};
