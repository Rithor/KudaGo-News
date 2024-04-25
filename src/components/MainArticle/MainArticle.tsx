import React, { FC } from 'react';
import './MainArticle.css';
import defaultImg from '../../imgs/no_icon.png';
import { ucFirst } from '../../utils';

type Props = {
  image: string;
  category: string;
  date: string;
  title: string;
  description: string;
  place: string;
  onClick: () => void;
};

export const MainArticle: FC<Props> = ({
  image,
  category,
  date,
  title,
  description,
  place,
  onClick,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <article className="main-article" onClick={onClick}>
      <div
        className="main-article__image-container"
        style={{ display: loaded ? 'block' : 'none' }}
      >
        <img
          className="main-article__image"
          src={image || defaultImg}
          onLoad={handleLoad}
          alt="Фото новости"
        />
      </div>
      <div className="main-article__content">
        <div className="main-article__head">
          <span className="article-category main-article__category">
            {date}
          </span>
          <span className="article-category main-article__category">
            {category}
          </span>
        </div>

        <h2 className="main-article__title">{ucFirst(title)}</h2>
        <p className="main-article__text">{description}</p>
        <span className="article-source main-article__source">{place}</span>
      </div>
    </article>
  );
};
