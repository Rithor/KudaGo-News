import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './RelatedSmallArticle.css';
import defaultImg from '../../imgs/no_icon.png';

type Props = {
  id: number;
  img: string;
  category: string;
  title: string;
  place: string;
};

export const RelatedSmallArticle: FC<Props> = ({
  id,
  img,
  category,
  title,
  place,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <Link to={`/fullarticle/${id}`} className="relatedSmallArticle-grid">
      <article className="relatedSmallArticle-grid__wr">
        <div
          className="relatedSmallArticle__img"
          style={{ display: loaded ? 'block' : 'none' }}
        >
          <img src={img || defaultImg} onLoad={handleLoad}></img>
        </div>
        <div className="relatedSmallArticle__body">
          <div className="relatedSmallArticle__category">{category}</div>
          <div className="relatedSmallArticle__title">{title}</div>
          <div className="relatedSmallArticle__source">{place}</div>
        </div>
      </article>
    </Link>
  );
};
