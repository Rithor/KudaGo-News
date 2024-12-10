import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { repeat, setMeta } from '@app/utils';
import { fetchTrendArticles } from '@features/trendArticles/actions';
import { fetchFreeEvents } from '@features/freeEvents/actions';
import { fetchArticles } from '@features/articles/actions';
import { useNetworkStatusContext } from '@features/networkStatus/NetworkStatusContextProvider';
import { PartnerArticle } from '@components/PartnerArticle/PartnerArticle';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { Title } from '@components/Title/Title';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { online } = useNetworkStatusContext();
  // todo: articlesError,
  const { articles, articlesIsLoading } = useAppSelector(
    (state) => state.articles
  );
  // todo: trendArticlesError,
  const { trendArticles, trendArticlesIsLoading } = useAppSelector(
    (state) => state.trendArticles
  );
  // todo: freeEventsError
  const { freeEvents, freeEventsIsLoading } = useAppSelector(
    (state) => state.freeEvents
  );

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchTrendArticles());
    dispatch(fetchFreeEvents());
  }, [online]); // todo: спорный момент, если оставить online в зависимостях, то будет дергаться обновление при каждом появлении сети. Если убрать, то при появлении сети будет висеть вечная загрузка, пока пользователь вручную не обновит страницу

  useEffect(() => {
    setMeta({
      'og:type': 'article',
      'og:title': 'KudaGo News',
      'og:description':
        'Мы публикуем концерты, спектакли, выставки, мастер-классы и курсы, события для детей и масштабные городские фестивали',
      'og:url': window.location.href,
      'og:image': `${window.location.origin}/img/desktop1.png`,
    });
  }, []);

  // if (!online && (!articles || !trendArticles || !freeEvents)) {
  //   return (
  //     <section className="home-page">
  //       <section className="home-page">
  //         <HeroSkeleton
  //           className="home-page__hero"
  //           hasImage
  //           hasText
  //         />
  //       </section>

  //       <section className="container home-page__section">
  //         <Title Component="h2" className="home-page__title">
  //           В тренде
  //         </Title>
  //         <div className="grid">
  //           {repeat((i) => {
  //             return (
  //               <ArticleCardSkeleton
  //                 className="home-page__trends-item"
  //                 key={i}
  //                 hasImage={false}
  //                 titleRowsCount={3}
  //               />
  //             );
  //           }, 6)}
  //         </div>
  //       </section>

  //       <section className="container home-page__section">
  //         <Title Component="h2" className="home-page__title">
  //           Бесплатно
  //         </Title>
  //         <div className="grid">
  //           <section className="home-page__content">
  //             {repeat((i) => {
  //               return (
  //                 <ArticleCardSkeleton
  //                   className="home-page__article-card"
  //                   key={i}
  //                 />
  //               );
  //             }, 4)}
  //           </section>
  //           <section className="home-page__sidebar">
  //             {repeat((i) => {
  //               return (
  //                 <SidebarArticleCardSkeleton
  //                   className="home-page__sidebar-item"
  //                   key={i}
  //                 />
  //               );
  //             }, 2)}
  //           </section>
  //         </div>
  //       </section>

  //       <PartnerArticle />

  //       <div className="container grid">
  //         <section className="home-page__content">
  //           {repeat((i) => {
  //             return (
  //               <ArticleCardSkeleton
  //                 className="home-page__article-card"
  //                 key={i}
  //                 hasImage={i < 3 ? true : false}
  //               />
  //             );
  //           }, 8)}
  //         </section>
  //         <section className="home-page__sidebar">
  //           {repeat((i) => {
  //             return (
  //               <SidebarArticleCardSkeleton
  //                 className="home-page__sidebar-item"
  //                 key={i}
  //               />
  //             );
  //           }, 3)}
  //         </section>
  //       </div>
  //     </section>
  //   );
  // }

  const firstArticle = articles?.at(0);

  return (
    <div className="home-page">
      {/* show Skeleton */}
      {(articlesIsLoading || !firstArticle) && (
        <section className="home-page">
          <HeroSkeleton
            className="home-page__hero"
            hasImage
            hasText
          />
        </section>
      )}

      {/* show uploaded data */}
      {!articlesIsLoading && firstArticle && (
        <Link
          className="home-page__hero-link"
          to={`/article/${firstArticle.id}`}
        >
          <Hero
            className="home-page__hero"
            image={firstArticle?.images?.at(0)?.image}
            title={firstArticle?.title}
            text={firstArticle?.description}
          />
        </Link>
      )}

      <section className="container home-page__section">
        <Title Component="h2" className="home-page__title">
          В тренде
        </Title>
        <div className="grid">
          {/* show Skeleton */}
          {(trendArticlesIsLoading || !trendArticles.length) &&
            repeat((i) => {
              return (
                <ArticleCardSkeleton
                  className="home-page__trends-item"
                  key={i}
                  hasImage={false}
                  titleRowsCount={3}
                />
              );
            }, 6)}

          {/* show uploaded data */}
          {trendArticles?.map((article) => {
            return (
              <ArticleCard
                key={article.id}
                className="home-page__trends-item"
                id={article.id}
                title={article.title}
                shortTitle={article.short_title}
                category={article.categories?.at(0)}
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
            {/* show Skeleton */}
            {(freeEventsIsLoading || !freeEvents.length) &&
              repeat((i) => {
                return (
                  <ArticleCardSkeleton
                    className="home-page__article-card"
                    key={i}
                  />
                );
              }, 4)}

            {/* show uploaded data */}
            {freeEvents?.slice(2, 6).map((article) => {
              return (
                <ArticleCard
                  className="home-page__article-card"
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  shortTitle={article.short_title}
                  category={article.categories?.at(0)}
                  description={article.description}
                  dates={article.dates}
                  image={article?.images?.at(0)?.image}
                />
              );
            })}
          </section>
          <aside className="home-page__sidebar">
            {/* show Skeleton */}
            {(freeEventsIsLoading || !freeEvents.length) &&
              repeat((i) => {
                return (
                  <SidebarArticleCardSkeleton
                    className="home-page__sidebar-item"
                    key={i}
                  />
                );
              }, 2)}

            {/* show uploaded data */}
            {freeEvents?.slice(0, 2).map((article) => {
              return (
                <SidebarArticleCard
                  className="home-page__sidebar-item"
                  key={article.id}
                  article={article}
                />
              );
            })}
          </aside>
        </div>
      </section>

      <PartnerArticle />

      <div className="container grid">
        <section className="home-page__content">
          {/* show Skeleton */}
          {(articlesIsLoading || !articles.length) &&
            repeat((i) => {
              return (
                <ArticleCardSkeleton
                  className="home-page__article-card"
                  key={i}
                  hasImage={i < 3 ? true : false}
                />
              );
            }, 8)}

          {/* show uploaded data */}
          {articles?.slice(4).map((article, i) => {
            return (
              <ArticleCard
                key={article.id}
                className="home-page__article-card"
                id={article.id}
                title={article.title}
                shortTitle={article.short_title}
                image={
                  i < 3 ? article?.images?.at(0)?.image : undefined
                }
                category={article.categories?.at(0)}
                description={article.description}
                place={article.place?.title}
                dates={article.dates}
              />
            );
          })}
        </section>
        <aside className="home-page__sidebar">
          {/* show Skeleton */}
          {(articlesIsLoading || !articles.length) &&
            repeat((i) => {
              return (
                <SidebarArticleCardSkeleton
                  className="home-page__sidebar-item"
                  key={i}
                />
              );
            }, 3)}

          {/* show uploaded data */}
          {articles?.slice(1, 4).map((article) => {
            return (
              <SidebarArticleCard
                article={article}
                key={article.id}
                className="home-page__sidebar-item"
              />
            );
          })}
        </aside>
      </div>
    </div>
  );
};
