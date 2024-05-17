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
import { PartnersArticle } from './types';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
  article: Omit<PartnersArticle, 'id' | 'created'>
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
  async (): Promise<PartnersArticle | null> => {
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
        const data = doc.data() as Omit<PartnersArticle, 'id'>;

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
