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
} from 'firebase/firestore';
import { IPartnersArticle } from '@app/types';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { PARTNERS_ARTICLES_PATH } from './apiConstants';

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
      collection(db, PARTNERS_ARTICLES_PATH)
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
  const docRef = doc(db, PARTNERS_ARTICLES_PATH, id);
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
    await addDoc(collection(db, PARTNERS_ARTICLES_PATH), article);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePartnerArticle = async (
  id: string,
  data: Omit<IPartnersArticle, 'id' | 'created'>
): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, PARTNERS_ARTICLES_PATH, id);
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
  const ref = doc(db, PARTNERS_ARTICLES_PATH, id);
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
