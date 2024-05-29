import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './SidebarArticleCard.css';
import { formatDate } from '../../utils';
import { Article } from '../../types';
import classNames from 'classnames';

interface Props {
  article: Article;
  className?: string;
}

export const SidebarArticleCard: FC<Props> = ({ article, className }) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <Link
      to={`/article/${article.id}`}
      className={classNames('sidebar-article-card', className)}
    >
      <div
        className="sidebar-article-card__media"
        style={{ display: loaded ? 'block' : 'none' }}
      >
        <img
          className="sidebar-article-card__image"
          src={article.images[0].image}
          onLoad={handleLoad}
          alt={`Изображение к событию ${article.short_title}`}
        />
        <div className="sidebar-article-card__date">
          {formatDate(article.dates)}
        </div>
      </div>
      <h3 className="sidebar-article-card__title">{article.title}</h3>
      <div className="sidebar-article-card__source">{article.place?.title}</div>
    </Link>
  );
};
