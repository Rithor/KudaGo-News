import React, { FC } from "react";
import "./MainArticle.css";
import defaultImg from "../../imgs/no_icon.png";

type Props = {
  image: string;
  category: string;
  title: string;
  description: string;
  source: string;
  onClick: () => void;
};

export const MainArticle: FC<Props> = ({
  image,
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
    <article className="main-article" onClick={onClick}>
      <div
        className="main-article__image-container"
        style={{ display: loaded ? "block" : "none" }}
      >
        <img
          className="main-article__image"
          src={image || defaultImg}
          onLoad={handleLoad}
          alt="Фото новости"
        />
      </div>
      <div className="main-article__content">
        <span className="article-category main-article__category">
          {category}
        </span>
        <h2 className="main-article__title">{title}</h2>
        <p className="main-article__text">{description}</p>
        <span className="article-source main-article__source">{source}</span>
      </div>
    </article>
  );
};
