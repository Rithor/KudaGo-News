import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';
import classNames from 'classnames';
import { categoryNames, formatDate, ucFirst } from '@app/utils';
import { IDates } from '@app/types';
import { Image } from '@components/Image/Image';

interface Props {
  id: number;
  title: string;
  shortTitle: string;
  image?: string;
  category?: string;
  description?: string;
  place?: string;
  dates?: IDates[];
  className?: string;
}

export const ArticleCard: FC<Props> = ({
  id,
  title,
  shortTitle,
  image = '',
  category,
  description = '',
  place = '',
  dates = [],
  className,
}) => {
  const hasDescription = description.length > 0;
  const hasImage = image.length > 0;

  return (
    <Link
      to={`/article/${id}`}
      className={classNames(
        'article-card',
        {
          'article-card--has-description': hasDescription,
        },
        className
      )}
    >
      <article className="article-card__in">
        {hasImage && (
          <Image
            className="article-card__image"
            src={image}
            alt={shortTitle}
          />
        )}
        <div className="article-card__content">
          <h3 className="article-card__title">{ucFirst(title)}</h3>
          {hasDescription && (
            <span className="article-card__description">
              {description}
            </span>
          )}
          <div className="article-card__info">
            <div className="article-card__info-left">
              {category && category.length > 0 && (
                <span className="article-card__category">
                  {categoryNames[category]}
                </span>
              )}
              {dates.length > 0 && (
                <span className="article-card__date">
                  {formatDate(dates)}
                </span>
              )}
            </div>
            <div className="article-card__info-rigth">
              {place.length > 0 && (
                <span className="article-card__place">{place}</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
