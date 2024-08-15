import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Error.css';
import { Button } from '@components/Button/Button';

export const Error: FC = () => {
  const nav = useNavigate();
  const handleClick = () => {
    nav('/');
  };
  return (
    <div role="status" className="Error">
      <h1 className="Error__title">Oops! Что-то пошло не так</h1>
      <p className="Error__text">
        Не волнуйтесь. Мы уже в курсе и чиним проблему.
      </p>
      <Button className="Error__btn" onClick={handleClick}>
        На Главную{' '}
      </Button>
    </div>
  );
};
