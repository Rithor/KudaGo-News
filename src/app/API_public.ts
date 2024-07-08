import { GetThunkAPI } from '@reduxjs/toolkit';
import {
  DEFAULT_FIELDS,
  URL_GET_EVENTS,
  PARTNERS_ARTICLES_PATH,
} from './apiConstants';
import {
  IArticle,
  IArticlesAPI,
  IPartnersArticleREST,
  IPartnersArticleRESTResp,
} from './types';
import { getActualDate } from './utils';
import axios, { AxiosError } from 'axios';

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
  placeID: number,
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

export const fetchLastPartnerArticle =
  async (): Promise<IPartnersArticleREST | null> => {
    try {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/kudagonews/databases/(default)/documents/${PARTNERS_ARTICLES_PATH}/`
      );
      const { documents }: { documents: IPartnersArticleRESTResp } =
        await response.json();

      if (!documents.length) {
        return null;
      }

      documents.sort((a, b) => {
        return (
          new Date(b.createTime).getTime() -
          new Date(a.createTime).getTime()
        );
      });
      return documents[0].fields;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
