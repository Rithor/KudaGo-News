import { GetThunkAPI } from '@reduxjs/toolkit';
import {
  DEFAULT_FIELDS,
  URL_GET_EVENTS,
  PARTNERS_ARTICLES_PATH,
  URL_CORS_PROXY,
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
      `${URL_CORS_PROXY}${encodeURIComponent(
        `${URL_GET_EVENTS}?${new URLSearchParams({
          categories: category,
          fields: DEFAULT_FIELDS,
          page_size: '12',
          text_format: 'text',
          expand: 'place',
          order_by: '-publication_date',
          location: 'msk',
          actual_since: getActualDate(),
        }).toString()}`
      )}`
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
      `${URL_CORS_PROXY}${encodeURIComponent(
        `${URL_GET_EVENTS}/${id}?${new URLSearchParams({
          expand: 'place',
        }).toString()}`
      )}`
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const fetchSamePlaceArticlesAPI = async (
  placeID: number,
  isMobile: boolean,
  thunkAPI: GetThunkAPI<any>
) => {
  let page_size = 0;
  isMobile ? (page_size = 4) : (page_size = 9);
  try {
    const response = await axios.get<IArticlesAPI>(
      `${URL_CORS_PROXY}${encodeURIComponent(
        `${URL_GET_EVENTS}?${new URLSearchParams({
          place_id: placeID.toString(),
          fields: DEFAULT_FIELDS,
          page_size: page_size?.toString() || '12',
          text_format: 'text',
          expand: 'place',
          order_by: '-publication_date',
          location: 'msk',
          actual_since: getActualDate(),
        }).toString()}`
      )}`
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
      `${URL_CORS_PROXY}${encodeURIComponent(
        `${URL_GET_EVENTS}?${new URLSearchParams({
          fields: DEFAULT_FIELDS,
          page_size: '12',
          text_format: 'text',
          expand: 'place',
          order_by: '-publication_date',
          location: 'msk',
          actual_since: getActualDate(),
        }).toString()}`
      )}`
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
      `${URL_CORS_PROXY}${encodeURIComponent(
        `${URL_GET_EVENTS}?${new URLSearchParams({
          fields: 'id,title,description,categories,dates',
          page_size: '6',
          text_format: 'text',
          expand: 'place',
          order_by: '-favorites_count',
          location: 'msk',
          actual_since: getActualDate(),
        }).toString()}`
      )}`
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
      `${URL_CORS_PROXY}${encodeURIComponent(
        `${URL_GET_EVENTS}?${new URLSearchParams({
          fields: DEFAULT_FIELDS,
          page_size: '6',
          text_format: 'text',
          expand: 'place',
          order_by: '-publication_date',
          location: 'msk',
          actual_since: getActualDate(),
          is_free: '1',
        }).toString()}`
      )}`
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
