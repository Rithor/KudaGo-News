import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Articles.css';
import { MainArticle } from '../MainArticle/MainArticle';
import { SmallArticle } from '../SmallArticle/SmallArticle';
import { Article, ArticlesAPI } from '../../types';
import { formatDate, getActualDate } from '../../utils';

const URL_GET_EVENTS =
  'https://corsproxy.2923733-lt72291.twc1.net/kudago.com/public-api/v1.4/events/';
const FIELDS =
  'fields=id,publication_date,title,short_title,description,categories,images,tags,location,place,dates';
const OPTIONS = `page_size=12&text_format=text&expand=place&order_by=-publication_date&location=msk&actual_since=${getActualDate()}`;

export const Articles = () => {
  let { category } = useParams();

  // console.log(`render Articles || category = ${category}`);

  if (category === 'main' || !category) {
    category = 'concert,theater,festival,exhibition';
  }
  const [articles, setArticles] = useState<Article[]>([]);

  // ДОБАВИТЬ СКРОЛЛ СТРАНИЦЫ ВВЕРХ ПРИ НАЖАТИИ НА ПРЕДЛОЖЕННЫЕ НОВОСТИ
  // показывать загрузку при переходах

  useEffect(() => {
    fetch(`${URL_GET_EVENTS}?${FIELDS}&${OPTIONS}&categories=${category}`)
      .then((response) => response.json())
      .then((data: ArticlesAPI) => setArticles(data.results))
      .catch((e) => console.error(new Error(e)));
  }, [category, URL_GET_EVENTS, FIELDS, OPTIONS]);

  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {articles.slice(0, 3).map((article) => {
            return (
              <MainArticle
                key={article.id}
                id={article.id}
                image={article.images[0].image}
                category={article.categories[0]}
                date={formatDate(article)}
                title={article.title}
                description={article.description}
                place={article.place?.title}
              />
            );
          })}
        </section>

        <section className="articles__small-column">
          {articles.slice(3, 12).map((article) => {
            return (
              <SmallArticle
                key={article.id}
                id={article.id}
                title={article.title}
                category={article.categories[0]}
                date={article.publication_date}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};
