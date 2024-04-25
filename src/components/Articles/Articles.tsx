import React, { FC } from 'react';
import './Articles.css';
import { MainArticle } from '../MainArticle/MainArticle';
import { SmallArticle } from '../SmallArticle/SmallArticle';
import { Article } from '../../types';
import { formatDate } from '../../utils';

type Props = {
  articles: Article[];
  onArticleClick: (id: number) => void;
};

export const Articles: FC<Props> = ({ articles, onArticleClick }) => {
  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {articles.slice(0, 3).map((article) => {
            return (
              <MainArticle
                key={article.id}
                image={article.images[0].image}
                category={article.categories[0]}
                date={formatDate(article)}
                title={article.title}
                description={article.description}
                place={article.place.title}
                onClick={() => onArticleClick(article.id)}
              />
            );
          })}
        </section>

        <section className="articles__small-column">
          {articles.slice(3, 12).map((article) => {
            return (
              <SmallArticle
                key={article.id}
                title={article.title}
                category={article.categories[0]}
                date={article.publication_date}
                onClick={() => onArticleClick(article.id)}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};
