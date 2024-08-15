import React, { FC } from 'react';
import classNames from 'classnames';
import './ArticleCard.css';
import { Image } from '@components/Image/Image';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';

interface ArticleCardSkeletonProps {
  hasImage?: boolean;
  hasDescription?: boolean;
  titleRowsCount?: number;
  className?: string;
}

export const ArticleCardSkeleton: FC<ArticleCardSkeletonProps> = ({
  hasImage = true,
  hasDescription = true,
  titleRowsCount = 2,
  className,
}: ArticleCardSkeletonProps) => {
  return (
    <div
      className={classNames(
        'article-card',
        'article-card--skeleton',
        {
          'article-card--has-description': hasDescription,
        },
        className
      )}
      aria-label="Загрузка статьи"
    >
      <article
        className="article-card__in article-card__in--skeleton"
        aria-hidden
      >
        {hasImage && (
          <Image className="article-card__image" skeleton />
        )}
        <div className="article-card__content">
          <h2 className="article-card__title">
            <SkeletonText rowsCount={titleRowsCount} />
          </h2>
          {hasDescription && (
            <span className="article-card__description">
              <SkeletonText rowsCount={2} />
            </span>
          )}
          <div className="article-card__info">
            <SkeletonText />
          </div>
        </div>
      </article>
    </div>
  );
};
