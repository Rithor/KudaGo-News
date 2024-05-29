import React, { FC, useEffect, useState } from 'react';
import './HomePage.css';
import { Article } from '../../types';
import { getActualDate } from '../../utils';
import { PartnerArticle } from '../PartnerArticle/PartnerArticle';
import { SidebarArticleCard } from '../SidebarArticleCard/SidebarArticleCard';
import { Hero } from '../Hero/Hero';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { Link } from 'react-router-dom';
import { Title } from '../Title/Title';

const URL_GET_EVENTS =
  'https://corsproxy.2923733-lt72291.twc1.net/kudago.com/public-api/v1.4/events/';
const ARTICLE_FIELDS =
  'fields=id,publication_date,title,short_title,description,categories,images,tags,location,place,dates';
const ARTICLE_OPTIONS = `page_size=12&text_format=text&expand=place&order_by=-publication_date&location=msk&actual_since=${getActualDate()}`;
const FREE_EVENTS_OPTIONS = `page_size=6&text_format=text&expand=place&order_by=-publication_date&location=msk&is_free=1&actual_since=${getActualDate()}`;
const TREND_ARTICLE_FIELDS = 'fields=id,title,description,categories,dates';
const TREND_ARTICLE_OPTIONS = `page_size=6&text_format=text&order_by=-favorites_count&location=msk&actual_since=${getActualDate()}`;

export const HomePage: FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [trendArticles, setTrendArticles] = useState<Article[]>([]);
  const [freeEvents, setFreeEvents] = useState<Article[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${URL_GET_EVENTS}?${ARTICLE_FIELDS}&${ARTICLE_OPTIONS}`).then(
        (resp) => resp.json()
      ),
      fetch(
        `${URL_GET_EVENTS}?${TREND_ARTICLE_FIELDS}&${TREND_ARTICLE_OPTIONS}`
      ).then((resp) => resp.json()),
      fetch(`${URL_GET_EVENTS}?${ARTICLE_FIELDS}&${FREE_EVENTS_OPTIONS}`).then(
        (resp) => resp.json()
      ),
    ])
      .then(([articles, trendArticles, freeEvents]) => {
        setArticles(articles.results);
        setTrendArticles(trendArticles.results);
        setFreeEvents(freeEvents.results);
      })
      .catch((e) => console.error(new Error(e)));
  }, []);

  const firstArticle = articles[0];

  return (
    <>
      <section className="home-page">
        {firstArticle && (
          <Link
            className="home-page__hero-link"
            to={`/article/${firstArticle.id}`}
          >
            <Hero
              className="home-page__hero"
              image={firstArticle.images[0].image}
              title={firstArticle.title}
              text={firstArticle.description}
            />
          </Link>
        )}
        <section className="container home-page__section">
          <Title Component="h2" className="home-page__title">
            В тренде
          </Title>
          <div className="grid">
            {trendArticles.map((article) => {
              return (
                <ArticleCard
                  key={article.id}
                  className="home-page__trends-item"
                  id={article.id}
                  title={article.title}
                  shortTitle={article.short_title}
                  category={article.categories[0]}
                  description={article.description}
                  dates={article.dates}
                />
              );
            })}
          </div>
        </section>
        <section className="container home-page__section">
          <Title Component="h2" className="home-page__title">
            Бесплатно
          </Title>
          <div className="grid">
            <section className="home-page__content">
              {freeEvents.slice(2, 6).map((article) => {
                return (
                  <ArticleCard
                    className="home-page__article-card"
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    shortTitle={article.short_title}
                    category={article.categories[0]}
                    description={article.description}
                    dates={article.dates}
                    image={article.images[0].image}
                  />
                );
              })}
            </section>
            <section className="home-page__sidebar">
              {freeEvents.slice(0, 2).map((article) => {
                return (
                  <SidebarArticleCard
                    className="home-page__sidebar-item"
                    key={article.id}
                    article={article}
                  />
                );
              })}
            </section>
          </div>
        </section>
        <PartnerArticle />
        <div className="container grid">
          <section className="home-page__content">
            {articles?.slice(4).map((article) => {
              return (
                <ArticleCard
                  key={article.id}
                  className="home-page__article-card"
                  id={article.id}
                  title={article.title}
                  shortTitle={article.short_title}
                  image={article.images[0].image}
                  category={article.categories[0]}
                  description={article.description}
                  place={article.place?.title}
                  dates={article.dates}
                />
              );
            })}
          </section>

          <section className="home-page__sidebar">
            {articles?.slice(1, 4).map((article) => {
              return (
                <SidebarArticleCard
                  article={article}
                  key={article.id}
                  className="home-page__sidebar-item"
                />
              );
            })}
          </section>
        </div>
      </section>
    </>
  );
};
