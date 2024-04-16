import React from "react";
import "./RelatedSmallArticle.css";
import defaultImg from "../../imgs/no_icon.png";

export const RelatedSmallArticle = ({ img, category, title, source }) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <div className="relatedSmallArticle-grid">
      <div
        className="relatedSmallArticle__img"
        style={{ display: loaded ? "block" : "none" }}
      >
        <img src="https://picsum.photos/500/700" onLoad={handleLoad}></img>
      </div>
      <div className="relatedSmallArticle__body">
        <div className="relatedSmallArticle__category">МОДА</div>
        <div className="relatedSmallArticle__title">
          Это слова-филлеры для этой новости можно одну строку, а тут даже две
          или тр…
        </div>
        <div className="relatedSmallArticle__source">ИСТОЧНИК</div>
      </div>
    </div>
  );
};
