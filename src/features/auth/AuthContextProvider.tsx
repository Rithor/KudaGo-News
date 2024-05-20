import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  ProviderId,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { TAuthContext } from './types';
import { FirebaseApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

type TProps = {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
};

export const authContext = createContext<TAuthContext>({
  isAuthenticated: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
  loginWithOauthPopup: () => Promise.reject({}),
  logOut: () => undefined,
});

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

const isUserAdmin = async (firabaseApp: FirebaseApp) => {
  const db = getFirestore(firabaseApp);
  return await getDoc(doc(db, '/internal/auth'));
};

export const AuthContextProvider: FC<TProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] =
    useState<TAuthContext['isAuthenticated']>(null);
  const [user, setUser] = useState<any>(null);
  const [auth] = useState(getAuth(props.firebaseApp));

  useEffect(() => {
    if (!auth) {
      return;
    }
    setPersistence(auth, browserLocalPersistence);
    auth.languageCode = 'ru';

    auth.onAuthStateChanged((user) => {
      if (user) {
        isUserAdmin(props.firebaseApp)
          .then(() => {
            setUser(user);
            setIsAuthenticated(true);
          })
          .catch(() => {
            logOut();
            setUser(null);
            setIsAuthenticated(false);
          });
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  const processSignIn = (promise: Promise<UserCredential>) => {
    setUser(null);
    setIsAuthenticated(null);
    return promise
      .then((result) => {
        // log success auth
        return result;
      })
      .catch((error) => {
        // log auth errors
        throw error;
      });
  };

  const loginWithEmailAndPassword = (email: string, password: string) => {
    return processSignIn(signInWithEmailAndPassword(auth, email, password));
  };
  const loginWithOauthPopup = (provider: string) => {
    return processSignIn(
      signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[provider])
    );
  };
  const logOut = () => signOut(auth);

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        loginWithEmailAndPassword,
        loginWithOauthPopup,
        logOut,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
