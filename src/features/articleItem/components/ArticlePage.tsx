import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ArticlePage.css';
import { categoryNames, formatDate } from '@app/utils';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import classNames from 'classnames';
import { Hero } from '@components/Hero/Hero';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Title } from '@components/Title/Title';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchArticleItem } from '../actions';
import { fetchSamePlaceArticles } from '@features/samePlaceArticles/actions';

export const ArticlePage = () => {
  const { id } = useParams();
  if (id == undefined) return null;

  const dispatch = useAppDispatch();
  const { articleItem, isLoading, error } = useAppSelector(
    (state) => state.articleItem
  );
  // todo: использовать эти значения при загрузке скелетона   samePlaceArticlesIsLoading, samePlaceArticlesError,
  const { samePlaceArticles } = useAppSelector(
    (state) => state.samePlaceArticles
  );

  useEffect(() => {
    dispatch(fetchArticleItem(id));
  }, [id]);
  useEffect(() => {
    if (articleItem.place?.id) {
      dispatch(
        fetchSamePlaceArticles(articleItem.place.id.toString())
      );
    }
  }, [articleItem]);

  // todo: показать скелетон
  if (isLoading) {
    return <div>Loading</div>;
  }

  // todo: сделать отдельную страницу c ошибкой
  if (error) {
    return <div>{error}</div>;
  }

  if (articleItem.id == 0) return null;

  const relatedArticles = samePlaceArticles?.slice(0, 3);
  const relatedSidebarArticles = samePlaceArticles?.slice(3, 9);

  return (
    <article className="articlePage-wr">
      <Hero
        title={articleItem.title}
        image={articleItem.images[0].image}
      />
      <div className="container hero__info">
        <div className="hero__category">
          {categoryNames[articleItem.categories[0]]}
        </div>
        <div className="hero__date">
          {formatDate(articleItem.dates)}
        </div>
        <div className="hero__place">{articleItem.place?.title}</div>
      </div>
      <section className="articlePage grid container">
        <div
          className={classNames('articlePage__body', {
            'articlePage__body--whSidebarCards':
              !relatedSidebarArticles?.length,
          })}
        >
          <div
            className="articlePage__description"
            dangerouslySetInnerHTML={{
              __html: articleItem.description,
            }}
          ></div>
          <div
            className="articlePage__text"
            dangerouslySetInnerHTML={{
              __html: articleItem.body_text,
            }}
          ></div>
          <div className="articlePage__tags-wr">
            {articleItem.tags.map((tag) => (
              <div key={tag} className="articlePage__tags">
                {tag}
              </div>
            ))}
          </div>
        </div>
        {relatedSidebarArticles?.at(0) && (
          <div className="relatedSidebarArticles">
            {relatedSidebarArticles.map((article) => {
              return (
                <SidebarArticleCard
                  className="articlePage__sidebar-item"
                  key={article.id}
                  article={article}
                />
              );
            })}
          </div>
        )}
      </section>
      {relatedArticles?.at(0) && (
        <div className="relatedArticles container">
          <Title Component={'h2'} className="relatedArticles__header">
            смотрите также:
          </Title>
          <div className="grid">
            {relatedArticles.map((article) => {
              return (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  shortTitle={article.short_title}
                  category={article.categories[0]}
                  description={article.description}
                  dates={article.dates}
                  className="articlePage__related-articles-item"
                />
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
};
