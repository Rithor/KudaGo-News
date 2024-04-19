import React, { FC } from "react";
import "./SmallArticle.css";

type Props = {
  title: string;
  source: string;
  date: string;
  onClick: () => void;
};

export const SmallArticle: FC<Props> = ({ title, source, date, onClick }) => {
  return (
    <article className="small-article" onClick={onClick}>
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
