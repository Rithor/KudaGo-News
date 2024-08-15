import React, { FC, Reducer, useReducer, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './LoginContainer.css';
import { UserCredential } from 'firebase/auth';
import { validateEmail } from './utils';
import { useAuthContext } from '../AuthContextProvider';
import { Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  LoginForm,
  TLoginField,
} from '@components/LoginForm/LoginForm';

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
  const { loginWithEmailAndPassword, loginWithOauthPopup } =
    useAuthContext();
  const { state: locationState } = useLocation();
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

  const processLogin = (promise: Promise<UserCredential>) => {
    promise
      .then(() => {
        navigate(locationState?.from || '/admin');
      })
      .catch((error) => {
        setAuthError(error?.message || 'error');
      });
  };

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
      processLogin(
        loginWithEmailAndPassword(
          emailState.value,
          passwordState.value
        )
      );
    }
  };

  const onOAuthClick = (provider: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (provider) {
      processLogin(loginWithOauthPopup(provider));
    }
  };

  return (
    <div className="loginContainer">
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
            dispatchPassword({
              type: 'change',
              value: e.target.value,
            }),
        }}
        onSubmit={onSubmit}
      />
      <div className="oauthLoginContainer">
        <Link
          to={'#'}
          className="oauthLoginContainer__item"
          onClick={(e) => onOAuthClick('google.com', e)}
        >
          <GoogleIcon sx={{ color: 'primary.dark' }} />
        </Link>
        <Link
          to={'#'}
          className="oauthLoginContainer__item"
          onClick={(e) => onOAuthClick('github.com', e)}
        >
          <GitHubIcon sx={{ color: 'common.black' }} />
        </Link>
      </div>
    </div>
  );
};
