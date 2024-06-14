import React from 'react';
import './Hero.css';
import classNames from 'classnames';
import { Title } from '@components/Title/Title';
import { Image } from '@components/Image/Image';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';

interface HeroSkeletonProps {
  hasImage?: boolean;
  title?: string;
  hasText?: boolean;
  className?: string;
}

export const HeroSkeleton: React.FC<HeroSkeletonProps> = ({
  hasImage = true,
  title,
  hasText = false,
  className,
}: HeroSkeletonProps) => {
  return (
    <section
      className={classNames(
        'hero',
        {
          'hero--no-image': !hasImage,
        },
        className
      )}
    >
      <div className="hero__in">
        {hasImage && <Image className="hero__image" skeleton />}
        <div className="hero__container container">
          <div
            className="hero__content"
            style={{ width: title ? undefined : '100%' }}
          >
            <Title className="hero__title">
              {title || <SkeletonText rowsCount={2} dark />}
            </Title>
            {hasText && (
              <div className="hero__text">
                <SkeletonText rowsCount={3} dark />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
