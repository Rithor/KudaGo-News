import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchCategoryArticles } from '../actions';
import { categoryNames } from '../../../app/utils';
import { Hero } from '@components/Hero/Hero';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';

export const CategoryPage = () => {
  const { category } = useParams();
  if (!category) return null;

  const dispatch = useAppDispatch();
  const { categoryArticles, isLoading, error } = useAppSelector(
    (state) => state.categoryArticles
  );

  useEffect(() => {
    dispatch(fetchCategoryArticles(category));
  }, [category]);

  // todo: показать скелетон
  if (isLoading) {
    return <div>Loading</div>;
  }

  // todo: сделать отдельную страницу c ошибкой
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="categoryPage">
      <Hero
        className="categoryPage__hero"
        title={categoryNames[category!]}
        image={categoryArticles[0]?.images[0].image}
      />
      <div className="container grid">
        <section className="categoryPage__content">
          {categoryArticles.slice(3, 9).map((article) => {
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
      </div>
    </section>
  );
};
