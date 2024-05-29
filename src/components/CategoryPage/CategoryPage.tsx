import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import { Article, ArticlesAPI } from '../../types';
import { categoryNames, getActualDate } from '../../utils';
import { SidebarArticleCard } from '../SidebarArticleCard/SidebarArticleCard';
import { Hero } from '../Hero/Hero';
import { ArticleCard } from '../ArticleCard/ArticleCard';

const URL_GET_EVENTS =
  'https://corsproxy.2923733-lt72291.twc1.net/kudago.com/public-api/v1.4/events/';
const FIELDS =
  'fields=id,publication_date,title,short_title,description,categories,images,tags,location,place,dates';
const OPTIONS = `page_size=12&text_format=text&expand=place&order_by=-publication_date&location=msk&actual_since=${getActualDate()}`;

export const CategoryPage = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch(`${URL_GET_EVENTS}?${FIELDS}&${OPTIONS}&categories=${category}`)
      .then((response) => response.json())
      .then((data: ArticlesAPI) => setArticles(data.results))
      .catch((e) => console.error(new Error(e)));
  }, [category]);

  if (!articles?.length) {
    return null;
  }

  return (
    <section className="categoryPage">
      <Hero
        className="categoryPage__hero"
        title={categoryNames[category!]}
        image="test" // todo: картинка фон, своя на каждую категорию
      />
      <div className="container grid">
        <section className="categoryPage__content">
          {articles.slice(3, 9).map((article) => {
            return (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                shortTitle={article.short_title}
                image={article.images[0].image}
                category={article.categories[0]}
                description={article.description}
                place={article.place?.title}
                dates={article.dates}
                className="categoryPage__articleCards"
              />
            );
          })}
        </section>

        <section className="categoryPage__sidebar">
          {articles.slice(0, 3).map((article) => {
            return (
              <SidebarArticleCard
                article={article}
                key={article.id}
                className="categoryPage__sidebar-item"
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};
