export const categoryNames: { [index: string]: string } = {
  'concert,theater,festival,exhibition': 'Главная',
  concert: 'Концерты',
  theater: 'Постановки',
  festival: 'Фестивали',
  exhibition: 'Выставки',
};

export function localizeString(str: string): string {
  return new Date(str).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
}
