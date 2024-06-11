import React, { FC, useEffect } from 'react';
import './HomePage.css';
import { PartnerArticle } from '@components/PartnerArticle/PartnerArticle';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { Link } from 'react-router-dom';
import { Title } from '@components/Title/Title';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchTrendArticles } from '@features/trendArticles/actions';
import { fetchFreeEvents } from '@features/freeEvents/actions';
import { fetchArticles } from '@features/articles/actions';

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  // todo: articlesIsLoading, articlesError
  const { articles } = useAppSelector((state) => state.articles);
  // todo: trendArticlesIsLoading, trendArticlesError,
  const { trendArticles } = useAppSelector(
    (state) => state.trendArticles
  );
  // todo:  freeEventsIsLoading, freeEventsError
  const { freeEvents } = useAppSelector((state) => state.freeEvents);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchTrendArticles());
    dispatch(fetchFreeEvents());
  }, []);

  // isLoading можно прокидывать пропсом в компонент, внутри которого
  // будет логика отображения скелетона

  const firstArticle = articles[0];

  return (
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
          {articles?.slice(4).map((article, i) => {
            return (
              <ArticleCard
                key={article.id}
                className="home-page__article-card"
                id={article.id}
                title={article.title}
                shortTitle={article.short_title}
                image={i < 3 ? article.images[0].image : undefined}
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
  );
};
