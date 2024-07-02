import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import {
  useAdaptive,
  useAppDispatch,
  useAppSelector,
} from '@app/hooks';
import { fetchCategoryArticles } from '../actions';
import { categoryNames, repeat } from '../../../app/utils';
import { Hero } from '@components/Hero/Hero';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';
import { useNetworkStatusContext } from '@features/networkStatus/NetworkStatusContextProvider';

export const CategoryPage = () => {
  const { category } = useParams();
  if (!category) return null;

  const { online } = useNetworkStatusContext();

  const dispatch = useAppDispatch();
  const { categoryArticles, isLoading, error } = useAppSelector(
    (state) => state.categoryArticles
  );
  useEffect(() => {
    dispatch(fetchCategoryArticles(category));
  }, [category, online]);

  const { isDesktop, isMobile } = useAdaptive();

  /* show Skeleton */
  if (isLoading || !categoryArticles || (error && !online)) {
    return (
      <section className="categoryPage">
        <HeroSkeleton
          className="categoryPage__hero"
          hasImage
          title={categoryNames[category]}
        />
        <div className="container grid">
          <section className="categoryPage__content">
            {repeat((i) => {
              return (
                <ArticleCardSkeleton
                  key={i}
                  className="categoryPage__articleCards"
                  hasImage
                  titleRowsCount={3}
                />
              );
            }, 6)}
          </section>

          {isDesktop && (
            <section className="categoryPage__sidebar">
              {repeat((i) => {
                return (
                  <SidebarArticleCardSkeleton
                    key={i}
                    className="categoryPage__sidebar-item"
                  />
                );
              }, 3)}
            </section>
          )}
        </div>
      </section>
    );
  }

  // todo: сделать отдельную страницу c ошибкой на каждой странице!
  if (error) {
    return <div>{error}</div>;
  }

  const mainArticles = isMobile
    ? categoryArticles
    : categoryArticles.slice(3);

  return (
    <section className="categoryPage">
      <Hero
        className="categoryPage__hero"
        title={categoryNames[category!]}
        image={categoryArticles[0]?.images[0].image}
      />

      <div className="container grid">
        <section className="categoryPage__content">
          {mainArticles.map((article) => {
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

        {isDesktop && (
          <section className="categoryPage__sidebar">
            {categoryArticles.slice(0, 3).map((article) => {
              return (
                <SidebarArticleCard
                  article={article}
                  key={article.id}
                  className="categoryPage__sidebar-item"
                />
              );
            })}
          </section>
        )}
      </div>
    </section>
  );
};
