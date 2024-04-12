import React from "react";
import "./SmallArticle.css";

export const SmallArticle = ({ title, source, date }) => {
  return (
    <article className="small-article">
      <h2 className="small-article__title">{title}</h2>
      <span className="article-date">{source}</span>
      <span className="article-source">
        {new Date(date).toLocaleDateString("ru-RU", {
          month: "long",
          day: "numeric",
        })}
      </span>
    </article>
  );
};
