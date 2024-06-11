import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { IArticle, IPartnersArticle } from '@app/types';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getActualDate } from './utils';
import axios, { AxiosError } from 'axios';
import { IArticlesAPI } from './types';
import { GetThunkAPI } from '@reduxjs/toolkit';

const URL_GET_EVENTS =
  'https://corsproxy.2923733-lt72291.twc1.net/kudago.com/public-api/v1.4/events';
const DEFAULT_FIELDS =
  'id,publication_date,title,short_title,description,categories,images,tags,location,place,dates';

const partnersArticlesPath = 'partners-articles';

// Initialize Firebase
export const initializeFirebase = (): FirebaseApp => {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyCs7KB08qoEuGhyURmMDrxwwnZL3r7U-eA',
    authDomain: 'kudagonews.firebaseapp.com',
    projectId: 'kudagonews',
    storageBucket: 'kudagonews.appspot.com',
    messagingSenderId: '899680552536',
    appId: '1:899680552536:web:7cbac9399509a43f6cac2d',
    measurementId: 'G-XD4336CN5D',
  });
  getAuth(firebaseApp);
  getFirestore(firebaseApp);
  getStorage(firebaseApp);
  return firebaseApp;
};

export const getPartnersArticles = async (): Promise<
  IPartnersArticle[]
> => {
  const db = getFirestore();
  const articles: IPartnersArticle[] = [];
  try {
    const querySnapshot = await getDocs(
      collection(db, partnersArticlesPath)
    );
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnersArticle, 'id'>;
      articles.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }
  return articles;
};

export const getPartnerArticle = async (
  id: string
): Promise<IPartnersArticle> => {
  const db = getFirestore();
  const docRef = doc(db, partnersArticlesPath, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<IPartnersArticle, 'id'>;
      return {
        id: docSnap.id,
        ...data,
      };
    } else {
      throw Error('Такой статьи нет');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addPartnerArticle = async (
  article: Omit<IPartnersArticle, 'id' | 'created'>
) => {
  const db = getFirestore();
  try {
    await addDoc(collection(db, partnersArticlesPath), article);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePartnerArticle = async (
  id: string,
  data: Omit<IPartnersArticle, 'id' | 'created'>
): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, partnersArticlesPath, id);
  try {
    await updateDoc(ref, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePartnerArticle = async (
  id: string
): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, partnersArticlesPath, id);
  try {
    await deleteDoc(ref);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, `${file.name}-${Date.now()}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getLastPartnerArticle =
  async (): Promise<IPartnersArticle | null> => {
    const db = getFirestore();
    let article = null;

    try {
      const q = query(
        collection(db, partnersArticlesPath),
        orderBy('created', 'desc'),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<IPartnersArticle, 'id'>;

        article = {
          id: doc.id,
          ...data,
        };
      });
    } catch (error) {
      return Promise.reject(error);
    }

    return article;
  };

export const fetchCategoryIArticlesAPI = async (
  category: string,
  thunkAPI: GetThunkAPI<any>
) => {
  try {
    const response = await axios.get<IArticlesAPI>(
      `${URL_GET_EVENTS}/?&categories=${category}`,
      {
        params: {
          fields: DEFAULT_FIELDS,
          page_size: 12,
          text_format: 'text',
          expand: 'place',
          order_by: '-publication_date',
          location: 'msk',
          actual_since: `${getActualDate()}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const fetchArticleItemAPI = async (
  id: string,
  thunkAPI: GetThunkAPI<any>
) => {
  try {
    const response = await axios.get<IArticle>(
      `${URL_GET_EVENTS}/${id}/`,
      {
        params: {
          expand: 'place',
        },
      }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const fetchSamePlaceArticlesAPI = async (
  placeID: string,
  thunkAPI: GetThunkAPI<any>
) => {
  try {
    const response = await axios.get<IArticlesAPI>(
      `${URL_GET_EVENTS}/?&place_id
=${placeID}`,
      {
        params: {
          fields: DEFAULT_FIELDS,
          page_size: 9,
          text_format: 'text',
          expand: 'place',
          order_by: '-publication_date',
          location: 'msk',
          actual_since: `${getActualDate()}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const fetchArticlesAPI = async (
  thunkAPI: GetThunkAPI<any>
) => {
  try {
    const response = await axios.get<IArticlesAPI>(
      `${URL_GET_EVENTS}/`,
      {
        params: {
          fields: DEFAULT_FIELDS,
          page_size: 12,
          text_format: 'text',
          expand: 'place',
          order_by: '-publication_date',
          location: 'msk',
          actual_since: `${getActualDate()}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const fetchTrendArticlesAPI = async (
  thunkAPI: GetThunkAPI<any>
) => {
  try {
    const response = await axios.get<IArticlesAPI>(
      `${URL_GET_EVENTS}/`,
      {
        params: {
          fields: 'id,title,description,categories,dates',
          page_size: 6,
          text_format: 'text',
          expand: 'place',
          order_by: '-favorites_count',
          location: 'msk',
          actual_since: `${getActualDate()}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const fetchFreeEventsAPI = async (
  thunkAPI: GetThunkAPI<any>
) => {
  try {
    const response = await axios.get<IArticlesAPI>(
      `${URL_GET_EVENTS}/`,
      {
        params: {
          fields: DEFAULT_FIELDS,
          page_size: 6,
          text_format: 'text',
          expand: 'place',
          order_by: '-publication_date',
          location: 'msk',
          actual_since: `${getActualDate()}`,
          is_free: 1,
        },
      }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return thunkAPI.rejectWithValue(error.message);
  }
};
