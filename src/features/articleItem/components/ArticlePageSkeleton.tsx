import React, { FC } from 'react';
import './ArticlePage.css';
import classNames from 'classnames';
import { repeat } from '@app/utils';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';
import { Title } from '@components/Title/Title';
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton';

interface ArticlePageSkeletonProps {
  isDesktop: boolean;
}

export const ArticlePageSkeleton: FC<ArticlePageSkeletonProps> = ({
  isDesktop,
}: ArticlePageSkeletonProps) => {
  return (
    <section className="articlePage-wr" aria-label="Загрузка">
      <div aria-hidden>
        <HeroSkeleton hasImage />
        <div className="container hero__info">
          <SkeletonText />
        </div>
        <section className="articlePage grid container">
          <div className={classNames('articlePage__body')}>
            <div className="articlePage__description">
              <SkeletonText rowsCount={3} />
            </div>
            <div className="articlePage__text">
              <SkeletonText rowsCount={18} />
            </div>
            <div className="articlePage__tags-wr">
              <SkeletonText rowsCount={1} />
            </div>
          </div>
          {isDesktop && (
            <aside className="relatedSidebarArticles">
              {repeat((i) => {
                return (
                  <SidebarArticleCardSkeleton
                    key={i}
                    className="articlePage__sidebar-item sidebar-article-card--skeleton"
                  />
                );
              }, 6)}
            </aside>
          )}
        </section>
        <div className="relatedArticles container">
          <Title Component={'h2'} className="relatedArticles__header">
            смотрите также:
          </Title>
          <div className="grid">
            {repeat((i) => {
              return (
                <ArticleCardSkeleton
                  key={i}
                  hasImage={false}
                  className="articlePage__related-articles-item"
                />
              );
            }, 3)}
          </div>
        </div>
      </div>
    </section>
  );
};
