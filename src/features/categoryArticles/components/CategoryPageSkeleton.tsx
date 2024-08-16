import React, { FC } from 'react';
import './CategoryPage.css';
import { categoryNames, repeat } from '@app/utils';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton';

interface CategoryPageSkeletonProps {
  isDesktop: boolean;
  category: string;
}

export const CategoryPageSkeleton: FC<CategoryPageSkeletonProps> = ({
  isDesktop,
  category,
}: CategoryPageSkeletonProps) => {
  return (
    <section className="categoryPage" aria-label="Загрузка статей">
      <div aria-hidden>
        <HeroSkeleton
          className="categoryPage__hero"
          hasImage
          title={categoryNames[category]}
        />
        <div className="container grid">
          <section className="categoryPage__content">
            {repeat((i) => {
              return (
                <ArticleCardSkeleton
                  key={i}
                  className="categoryPage__articleCards"
                  hasImage
                  titleRowsCount={3}
                />
              );
            }, 6)}
          </section>

          {isDesktop && (
            <aside className="categoryPage__sidebar">
              {repeat((i) => {
                return (
                  <SidebarArticleCardSkeleton
                    key={i}
                    className="categoryPage__sidebar-item"
                  />
                );
              }, 3)}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
};
