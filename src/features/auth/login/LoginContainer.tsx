import {
  LoginForm,
  TLoginField,
} from '../../../components/LoginForm/LoginForm';
import React, { FC, Reducer, useReducer, useState } from 'react';
import { Typography } from '@mui/material';

import './LoginContainer.css';
import { validateEmail } from './utils';
import { useAuthContext } from '../AuthContextProvider';
import { useNavigate, useLocation } from 'react-router-dom';

type TLoginFormFieldState = Omit<TLoginField, 'onChange'>;

type Action = { type: 'change' | 'error'; value: string };

function reducer(
  state: TLoginFormFieldState,
  action: Action
): TLoginFormFieldState {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        error: false,
        helper: '',
        value: action.value,
      };
    case 'error':
      return {
        ...state,
        error: true,
        helper: action.value,
      };
    default:
      throw new Error();
  }
}

export const LoginContainer: FC = () => {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const { loginWithEmailAndPassword } = useAuthContext();
  const [authError, setAuthError] = useState('');
  const [emailState, dispatchEmail] = useReducer<
    Reducer<TLoginFormFieldState, Action>
  >(reducer, {
    name: 'email',
    value: '',
  });

  const [passwordState, dispatchPassword] = useReducer<
    Reducer<TLoginFormFieldState, Action>
  >(reducer, {
    name: 'password',
    value: '',
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;
    if (!validateEmail(emailState.value)) {
      dispatchEmail({
        type: 'error',
        value: 'Введите корректный email',
      });
      valid = false;
    }

    if (passwordState.value.length < 6) {
      dispatchPassword({
        type: 'error',
        value: 'Длинна пароля меньше 6-ти символов',
      });
      valid = false;
    }

    if (valid) {
      loginWithEmailAndPassword(emailState.value, passwordState.value)
        .then(() => {
          navigate(locationState?.from || '/admin');
        })
        .catch((error) => {
          setAuthError(error?.message || 'error');
        });
    }
  };

  return (
    <div className="login-container">
      {authError && (
        <Typography variant="subtitle2" color="error" sx={{ m: 2 }}>
          {authError}
        </Typography>
      )}
      <LoginForm
        email={{
          ...emailState,
          onChange: (e) =>
            dispatchEmail({ type: 'change', value: e.target.value }),
        }}
        password={{
          ...passwordState,
          onChange: (e) =>
            dispatchPassword({ type: 'change', value: e.target.value }),
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};
