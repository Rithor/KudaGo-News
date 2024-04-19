import React, { FC } from "react";
import "./Articles.css";
import { MainArticle } from "../MainArticle/MainArticle";
import { SmallArticle } from "../SmallArticle/SmallArticle";
import { NewsAPI } from "../../types";

type Props = {
  articles: NewsAPI;
  onArticleClick: (id: number) => void;
};

export const Articles: FC<Props> = ({ articles, onArticleClick }) => {
  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {articles.items.slice(0, 3).map((news) => {
            return (
              <MainArticle
                key={news.id}
                image={news.image}
                category={
                  articles.categories.find((cat) => cat.id === news.category_id)
                    ?.name ?? ""
                }
                title={news.title}
                description={news.description}
                source={
                  articles.sources.find(
                    (source) => source.id === news.source_id
                  )?.name ?? ""
                }
                onClick={() => onArticleClick(news.id)}
              />
            );
          })}
        </section>

        <section className="articles__small-column">
          {articles.items.slice(3, 12).map((news) => {
            return (
              <SmallArticle
                key={news.id}
                title={news.title}
                source={
                  articles.sources.find(({ id }) => news.source_id === id)
                    ?.name ?? ""
                }
                date={news.date}
                onClick={() => onArticleClick(news.id)}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};
