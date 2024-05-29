import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';
import classNames from 'classnames';
import { categoryNames, formatDate, ucFirst } from '../../utils';
import { Dates } from '../../types';

interface Props {
  id: number;
  title: string;
  shortTitle: string;
  image?: string;
  category?: string;
  description?: string;
  place?: string;
  dates?: Dates[];
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

  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };

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
      {hasImage && (
        <img
          className="article-card__image"
          style={{ display: loaded ? 'block' : 'none' }}
          src={image}
          alt={`Изображение к событию ${shortTitle}`}
          onLoad={handleLoad}
        />
      )}
      <div className="article-card__content">
        <h2 className="article-card__title">{ucFirst(title)}</h2>
        {hasDescription && (
          <span className="article-card__description">{description}</span>
        )}
        <div className="article-card__info">
          <div className="article-card__info-left">
            {category && category.length > 0 && (
              <span className="article-card__category">
                {categoryNames[category]}
              </span>
            )}
            {dates.length > 0 && (
              <span className="article-card__date">{formatDate(dates)}</span>
            )}
          </div>
          <div className="article-card__info-rigth">
            {place.length > 0 && (
              <span className="article-card__place">{place}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
