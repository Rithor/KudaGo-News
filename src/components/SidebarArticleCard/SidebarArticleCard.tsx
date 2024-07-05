import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './SidebarArticleCard.css';
import { formatDate } from '../../app/utils';
import { IArticle } from '@app/types';
import classNames from 'classnames';
import { Image } from '@components/Image/Image';

interface Props {
  article: IArticle;
  className?: string;
}

export const SidebarArticleCard: FC<Props> = ({
  article,
  className,
}) => {
  return (
    <Link
      to={`/article/${article.id}`}
      className={classNames('sidebar-article-card', className)}
    >
      <article>
        <div className="sidebar-article-card__media">
          <Image
            className="sidebar-article-card__image"
            src={article.images[0].image}
            alt={article.short_title}
          />
          <div className="sidebar-article-card__date">
            {formatDate(article.dates)}
          </div>
        </div>
        <h3 className="sidebar-article-card__title">
          {article.title}
        </h3>
        <div className="sidebar-article-card__place">
          {article.place?.title}
        </div>
      </article>
    </Link>
  );
};
