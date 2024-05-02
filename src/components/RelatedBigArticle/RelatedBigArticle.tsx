import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './RelatedBigArticle.css';
import defaultImg from '../../imgs/no_icon.png';

type Props = {
  id: number;
  img: string;
  category: string;
  title: string;
  description: string;
  place: string;
};

export const RelatedBigArticle: FC<Props> = ({
  id,
  img,
  category,
  title,
  description,
  place,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <Link to={`/fullarticle/${id}`} className="relatedBigArticle">
      <article className="relatedBigArticle__wr">
        <div
          className="relatedBigArticle__img"
          style={{ display: loaded ? 'block' : 'none' }}
        >
          <img src={img || defaultImg} onLoad={handleLoad}></img>
        </div>
        <div className="relatedBigArticle__body">
          <div className="relatedBigArticle__category">{category}</div>
          <div className="relatedBigArticle__title">{title}</div>
          <div className="relatedBigArticle__description">{description}</div>
          <div className="relatedBigArticle__source">{place}</div>
        </div>
      </article>
    </Link>
  );
};
