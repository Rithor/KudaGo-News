import React, { FC } from "react";
import "./RelatedBigArticle.css";
import defaultImg from "../../imgs/no_icon.png";

type Props = {
  img: string;
  category: string;
  title: string;
  description: string;
  source: string;
  onClick: () => void;
};

export const RelatedBigArticle: FC<Props> = ({
  img,
  category,
  title,
  description,
  source,
  onClick,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <article className="relatedBigArticle" onClick={onClick}>
      <div
        className="relatedBigArticle__img"
        style={{ display: loaded ? "block" : "none" }}
      >
        <img src={img || defaultImg} onLoad={handleLoad}></img>
      </div>
      <div className="relatedBigArticle__body">
        <div className="relatedBigArticle__category">{category}</div>
        <div className="relatedBigArticle__title">{title}</div>
        <div className="relatedBigArticle__description">{description}</div>
        <div className="relatedBigArticle__source">{source}</div>
      </div>
    </article>
  );
};
