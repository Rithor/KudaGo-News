import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './MainArticle.css';
import defaultImg from '../../imgs/no_icon.png';
import { ucFirst } from '../../utils';

type Props = {
  id: number;
  image: string;
  category: string;
  date: string;
  title: string;
  description: string;
  place: string;
};

export const MainArticle: FC<Props> = ({
  id,
  image,
  category,
  date,
  title,
  description,
  place,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <Link to={`/fullarticle/${id}`} className="main-article">
      <article className="main-article__wr">
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
    </Link>
  );
};
