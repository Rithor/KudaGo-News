import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import {
  useAdaptive,
  useAppDispatch,
  useAppSelector,
} from '@app/hooks';
import { fetchCategoryArticles } from '../actions';
import { categoryNames, setMeta } from '@app/utils';
import { useNetworkStatusContext } from '@features/networkStatus/NetworkStatusContextProvider';
import { Hero } from '@components/Hero/Hero';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { Error } from '@components/Error/Error';
import { CategoryPageSkeleton } from './CategoryPageSkeleton';

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

  useEffect(() => {
    if (!categoryArticles.length) {
      return;
    }
    setMeta({
      'og:type': 'article',
      'og:title': `KudaGo News – ${categoryNames[category]}`,
      'og:description': 'Самые важные события города в одном месте',
      'og:url': window.location.href,
      'og:image':
        categoryArticles[0].images[0].image ??
        `${window.location.origin}/img/icon512.png`,
    });
  }, [category, categoryArticles]);

  useEffect(() => {
    document.title = `${categoryNames[category]} - KudaGo`;
  }, [category]);

  const { isDesktop, isMobile } = useAdaptive();

  /* show Skeleton */
  if (isLoading || !categoryArticles || (error && !online)) {
    return (
      <CategoryPageSkeleton
        isDesktop={isDesktop}
        category={category}
      />
    );
  }

  if (error) {
    return <Error />;
  }

  const mainArticles = isMobile
    ? categoryArticles
    : categoryArticles.slice(3);

  return (
    <section className="categoryPage">
      <Hero
        className="categoryPage__hero"
        title={categoryNames[category!]}
        image={
          categoryArticles[categoryArticles.length - 1]?.images[0]
            .image
        }
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
          <aside className="categoryPage__sidebar">
            {categoryArticles.slice(0, 3).map((article) => {
              return (
                <SidebarArticleCard
                  article={article}
                  key={article.id}
                  className="categoryPage__sidebar-item"
                />
              );
            })}
          </aside>
        )}
      </div>
    </section>
  );
};
