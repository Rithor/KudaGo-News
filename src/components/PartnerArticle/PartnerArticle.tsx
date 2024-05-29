import React, { useEffect, useState, FC } from 'react';
import './PartnerArticle.css';
import { PartnersArticle } from '../../types';
import { getLastPartnerArticle } from '../../API';

export const PartnerArticle: FC = () => {
  const [article, setArticle] = useState<PartnersArticle | null>(null);
  const [loaded, setLoaded] = useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    getLastPartnerArticle().then((data) => {
      setArticle(data);
    });
  }, []);

  if (!article) {
    return null;
  }

  return (
    <section className="partner-article">
      <div className="container grid">
        <div
          className="partner-article__image-container"
          style={{ display: loaded ? 'block' : 'none' }}
        >
          <img
            className="partner-article__image"
            src={article.image}
            alt={`Изображение к событию ${article.title}`}
            onLoad={handleLoad}
          />
        </div>
        <div className="partner-article__content">
          <span className="partner-article__caption">
            Партнерский материал от {article['company-name']}
          </span>
          <h2 className="partner-article__title">{article.title}</h2>
          <p className="partner-article__text">{article.description}</p>
        </div>
      </div>
    </section>
  );
};
