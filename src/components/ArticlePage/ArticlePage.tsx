import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ArticlePage.css';
import { Article, ArticlesAPI } from '../../types';
import { categoryNames, formatDate, getActualDate } from '../../utils';
import { SidebarArticleCard } from '../SidebarArticleCard/SidebarArticleCard';
import { Hero } from '../Hero/Hero';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { Title } from '../Title/Title';
import classNames from 'classnames';

const URL_GET_FULL_ARTICLE =
  'https://corsproxy.2923733-lt72291.twc1.net/kudago.com/public-api/v1.4/events';
const URL_GET_RELATED_ARTICLES =
  'https://corsproxy.2923733-lt72291.twc1.net/kudago.com/public-api/v1.4/events/';
const FIELDS =
  'fields=id,publication_date,title,short_title,description,categories,images,tags,location,place,dates';
const OPTIONS = `page_size=12&text_format=text&expand=place&order_by=-publication_date&location=msk&actual_since=${getActualDate()}`;

export const ArticlePage = () => {
  const { id } = useParams();
  if (id == undefined) return null;

  const [article, setArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    fetch(`${URL_GET_FULL_ARTICLE}/${id}/?expand=place`)
      .then((response) => response.json())
      .then((data: Article) => setArticle(data))
      .catch((error) => console.error(new Error(error)));
  }, [id]);

  useEffect(() => {
    if (article) {
      fetch(
        `${URL_GET_RELATED_ARTICLES}?${FIELDS}&${OPTIONS}&place_id=${article?.place?.id}`
      )
        .then((response) => response.json())
        .then((data: ArticlesAPI) =>
          setArticles(
            data.results?.filter((relArticle) => relArticle?.id !== article?.id)
          )
        )
        .catch((error) => console.error(new Error(error)));
    }
  }, [article]);

  if (!article) {
    return null;
  }

  const relatedArticles = articles?.slice(0, 3);
  const relatedSidebarArticles = articles?.slice(3, 9);

  return (
    <article className="articlePage-wr">
      <Hero title={article.title} image={article.images[0].image} />
      <div className="container hero__info">
        <div className="hero__category">
          {categoryNames[article.categories[0]]}
        </div>
        <div className="hero__date">{formatDate(article.dates)}</div>
        <div className="hero__place">{article.place?.title}</div>
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
            dangerouslySetInnerHTML={{ __html: article.description }}
          ></div>
          <div
            className="articlePage__text"
            dangerouslySetInnerHTML={{ __html: article.body_text }}
          ></div>
          <div className="articlePage__tags-wr">
            {article.tags.map((tag) => (
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
