const categories = [{ id: 0, name: 'name' }];

console.log(categories.find((cat) => cat.id === 1)?.name ?? '+++');

function localizeString(str) {
  return new Date(str).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
console.log(localizeString(1713986410 * 1000));
