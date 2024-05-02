import { Article, FullArticleAPI } from './types';

export const categoryNames: { [index: string]: string } = {
  main: 'Главная',
  concert: 'Концерты',
  theater: 'Постановки',
  festival: 'Фестивали',
  exhibition: 'Выставки',
};

export function localizeString(date: number): string {
  return new Date(date * 1000).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
}

export function ucFirst(str: string): string {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

export function getActualDate(): string {
  const today = new Date();
  // Получаем год, месяц и день
  const year = today.getFullYear(); // Возвращает год
  const month = today.getMonth() + 1; // Возвращает месяц (январь = 0, поэтому прибавляем 1)
  const day = today.getDate(); // Возвращает день
  // Функция для добавления ведущего нуля
  function padToTwoDigits(num: number): string {
    return num.toString().padStart(2, '0');
  }
  // Форматируем дату в формате YYYY-MM-DD
  const formattedDate = `${year}-${padToTwoDigits(month)}-${padToTwoDigits(day)}`;
  return formattedDate;
}

export function formatDate(article: Article | FullArticleAPI): string {
  const lastEl = article.dates.length - 1;
  const startDate = localizeString(article.dates[lastEl].start);
  const endDate = localizeString(article.dates[lastEl].end);
  const oneDayArticle = startDate === endDate;
  const date = oneDayArticle ? startDate : `${startDate} - ${endDate}`;
  return date;
}
