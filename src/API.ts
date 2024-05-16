import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { PartnersArticle } from './types';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const partnersArticlesPath = 'partners-articles';
// Initialize Firebase
export const initializeFirebase = () => {
  initializeApp({
    apiKey: 'AIzaSyCs7KB08qoEuGhyURmMDrxwwnZL3r7U-eA',
    authDomain: 'kudagonews.firebaseapp.com',
    projectId: 'kudagonews',
    storageBucket: 'kudagonews.appspot.com',
    messagingSenderId: '899680552536',
    appId: '1:899680552536:web:7cbac9399509a43f6cac2d',
    measurementId: 'G-XD4336CN5D',
  });
};

export const getPartnersArticles = async (): Promise<PartnersArticle[]> => {
  const db = getFirestore();
  const articles: PartnersArticle[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, partnersArticlesPath));
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<PartnersArticle, 'id'>;
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
): Promise<PartnersArticle> => {
  const db = getFirestore();
  const docRef = doc(db, partnersArticlesPath, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<PartnersArticle, 'id'>;
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

export const addPartnersArticle = async (
  article: Omit<PartnersArticle, 'id'>
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
  data: Omit<PartnersArticle, 'id' | 'created'>
): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, partnersArticlesPath, id);
  try {
    await updateDoc(ref, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePartnerArticle = async (id: string): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, partnersArticlesPath, id);
  try {
    await deleteDoc(ref);
  } catch (error) {
    return Promise.reject(error);
  }
};
