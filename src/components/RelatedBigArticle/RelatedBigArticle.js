import React from "react";
import "./RelatedBigArticle.css";
import defaultImg from "../../imgs/no_icon.png";

export const RelatedBigArticle = ({
  img,
  category,
  title,
  description,
  source,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <article className="relatedBigArticle">
      <div
        className="relatedBigArticle__img"
        style={{ display: loaded ? "block" : "none" }}
      >
        <img src="https://picsum.photos/500/700" onLoad={handleLoad}></img>
      </div>
      <div className="relatedBigArticle__body">
        <div className="relatedBigArticle__category">МОДА</div>
        <div className="relatedBigArticle__title">
          Это слова-филлеры для этой новости можно одну строку, а тут даже две
          или тр…
        </div>
        <div className="relatedBigArticle__description">
          А вот текст этой новости, в котором что-то интересное поясняется и
          есть хитрая фраза, заставляющая открыть
        </div>
        <div className="relatedBigArticle__source">ИСТОЧНИК</div>
      </div>
    </article>
  );
};
