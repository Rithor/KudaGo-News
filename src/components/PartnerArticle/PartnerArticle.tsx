import React, { useEffect, useState, FC } from 'react';
import './PartnerArticle.css';
import { fetchLastPartnerArticle } from '@app/API_public';
import { IPartnersArticleREST } from '@app/types';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';
import { Image } from '@components/Image/Image';

export const PartnerArticle: FC = () => {
  const [article, setArticle] = useState<IPartnersArticleREST | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    fetchLastPartnerArticle().then((data) => {
      setArticle(data);
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return (
      <article className="partner-article">
        <div className="container grid">
          <div
            className="partner-article__image-container"
            style={{ display: 'block' }}
          >
            <Image className="partner-article__image" skeleton />
          </div>
          <div className="partner-article__content">
            <span className="partner-article__caption">
              <SkeletonText rowsCount={1} />
            </span>
            <h2 className="partner-article__title">
              <SkeletonText rowsCount={1} />
            </h2>
            <div className="partner-article__text">
              <SkeletonText rowsCount={2} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <article className="partner-article">
      <div className="container grid">
        <div
          className="partner-article__image-container"
          style={{ display: loaded ? 'block' : 'none' }}
        >
          <img
            className="partner-article__image"
            src={article.image.stringValue}
            alt={article.title.stringValue}
            onLoad={handleLoad}
          />
        </div>
        <div className="partner-article__content">
          <span className="partner-article__caption">
            Партнерский материал от{' '}
            {article['company-name'].stringValue}
          </span>
          <h2 className="partner-article__title">
            {article.title.stringValue}
          </h2>
          <p className="partner-article__text">
            {article.description.stringValue}
          </p>
        </div>
      </div>
    </article>
  );
};
