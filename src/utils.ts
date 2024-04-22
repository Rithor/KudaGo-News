export const categoryIds: { [index: string]: number } = {
  index: 0,
  politics: 4,
  technologies: 1,
  other: 5,
  fashion: 3,
};

export const categoryNames: { [index: string]: string } = {
  index: 'Главная',
  fashion: 'Мода',
  technologies: 'Технологии',
  politics: 'Политика',
  other: 'Разное',
};

export function localizeString(str: string): string {
  return new Date(str).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
}
