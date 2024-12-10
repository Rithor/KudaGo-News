import { IDates } from './types';

export const categoryNames: { [index: string]: string } = {
  'business-events': 'События для бизнеса',
  cinema: 'Кинопоказы',
  concert: 'Концерты',
  education: 'Обучение',
  entertainment: 'Развлечения',
  exhibition: 'Выставки',
  fashion: 'Мода и стиль',
  festival: 'Фестивали',
  holiday: 'Праздники',
  kids: 'Детям',
  other: 'Разное',
  party: 'Вечеринки',
  photo: 'Фотография',
  quest: 'Квесты',
  recreation: 'Активный отдых',
  shopping: 'Шопинг (Магазины)',
  'social-activity': 'Благотворительность',
  stock: 'Акции и скидки',
  theater: 'Спектакли',
  tour: 'Экскурсии',
  'yarmarki-razvlecheniya-yarmarki': 'Ярмарки (Развлечения, Ярмарки)',
};

export function localizeString(date: number): string {
  return new Date(date * 1000).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
}

export function ucFirst(str: string): string {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

export function getActualDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  function padToTwoDigits(num: number): string {
    return num.toString().padStart(2, '0');
  }
  const formattedDate = `${year}-${padToTwoDigits(month)}-${padToTwoDigits(day)}`;
  return formattedDate;
}

export function formatDate(dates: IDates[]): string {
  if (!dates) return '';
  const lastEl = dates.length - 1;
  const startDateObj = new Date(dates[lastEl].start * 1000);
  const endDateObj = new Date(dates[lastEl].end * 1000);
  const startDate = localizeString(dates[lastEl].start);
  const endDate = localizeString(dates[lastEl].end);

  const sameDay = startDate === endDate;
  const sameMonth = startDateObj.getMonth() === endDateObj.getMonth();

  let date = '';
  if (sameDay) {
    date = startDate;
  } else if (sameMonth) {
    date = `${startDateObj.getDate()} - ${endDate}`;
  } else {
    date = `${startDate} - ${endDate}`;
  }

  return date;
}

export function repeat<T>(cb: (i: number) => T, times = 1): T[] {
  const res = [];

  for (let i = 0; i < times; i++) {
    res.push(cb(i));
  }

  return res;
}

export function modifyUrl(
  originalUrl: string,
  modifier = 'xxl'
): string {
  if (originalUrl.length === 0) {
    return originalUrl;
  }
  const parts = originalUrl.split('/');
  parts.splice(3, 0, `thumbs/${modifier}`);
  const modifiedUrl = parts.join('/');
  return modifiedUrl;
}

export const setMeta = (meta: Record<string, string>): void => {
  Object.entries(meta).forEach(([property, content]) => {
    const metaTag = document.head.querySelector(
      `meta[property="${property}"]`
    );
    if (metaTag) {
      metaTag.setAttribute('content', content);
    } else {
      const tag = document.createElement('meta');
      tag.setAttribute('property', property);
      tag.setAttribute('content', content);

      document.head.appendChild(tag);
    }
  });
};
