import React, { FC } from 'react';
import './RelatedSmallArticle.css';
import defaultImg from '../../imgs/no_icon.png';

type Props = {
  img: string;
  category: string;
  title: string;
  place: string;
  onClick: () => void;
};

export const RelatedSmallArticle: FC<Props> = ({
  img,
  category,
  title,
  place,
  onClick,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <div className="relatedSmallArticle-grid" onClick={onClick}>
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
    </div>
  );
};
