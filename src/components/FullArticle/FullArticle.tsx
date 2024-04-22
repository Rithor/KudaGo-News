import React, { FC, useState, useEffect } from "react";
import "./FullArticle.css";
import { RelatedSmallArticle } from "../RelatedSmallArticle/RelatedSmallArticle";
import { RelatedBigArticle } from "../RelatedBigArticle/RelatedBigArticle";
import {
  Article,
  Category,
  FullArticleAPI,
  RelatedArticlesAPI,
  Source,
} from "../../types";
import { localizeString } from "../../utils";

type Props = {
  sources: Source[];
  categories: Category[];
  id: number;
  onArticleClick: (id: number) => void;
};

const URL_FULL_ARTICLES = "https://frontend.karpovcourses.net/api/v2/news/full";
const URL_RELATED_ARTICLES =
  "https://frontend.karpovcourses.net/api/v2/news/related";
const RELATED_ARTICLES_COUNT = 9;

export const FullArticle: FC<Props> = ({
  id,
  categories,
  sources,
  onArticleClick,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };

  const [fullArcticle, setFullArticle] = useState<FullArticleAPI | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[] | null>(
    null
  );

  useEffect(() => {
    fetch(`${URL_FULL_ARTICLES}/${id}`)
      .then((response) => response.json())
      .then((data: FullArticleAPI) => setFullArticle(data))
      .catch((error) => console.error(new Error(error)));

    fetch(`${URL_RELATED_ARTICLES}/${id}?count=${RELATED_ARTICLES_COUNT}`)
      .then((response) => response.json())
      .then((data: RelatedArticlesAPI) => setRelatedArticles(data.items))
      .catch((error) => console.error(new Error(error)));
  }, [id, URL_FULL_ARTICLES, URL_RELATED_ARTICLES, RELATED_ARTICLES_COUNT]);

  if (!fullArcticle) {
    return null;
  }

  console.log(relatedArticles);

  return (
    <article className="fullArticle-wr">
      {fullArcticle.image ? (
        <section className="hero-wImg">
          <div className="hero-wr">
            <div
              className="hero-wImg__background"
              style={{ display: loaded ? "block" : "none" }}
            >
              <img src={fullArcticle.image} onLoad={handleLoad}></img>
            </div>
            <div className="container">
              <h2 className="hero-wImg__title">{fullArcticle.title}</h2>
            </div>
          </div>

          <div className="grid container">
            <div className="hero__category">{fullArcticle.category.name}</div>
            <div className="hero__date">
              {localizeString(fullArcticle.date)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="fullArticle grid container">
        <div className="fullArticle__body">
          {fullArcticle.image ? null : (
            <div className="whImage grid" id="whImage">
              <h2 className="title-whImg">{fullArcticle.title}</h2>
              <div className="hero__category">{fullArcticle.category.name}</div>
              <div className="hero__date hero__date_whImg">
                {localizeString(fullArcticle.date)}
              </div>
            </div>
          )}
          <div className="fullArticle__text">{fullArcticle.text}</div>
        </div>
        {relatedArticles ? (
          <div className="relatedSmallArticle">
            {relatedArticles?.slice(0, 6).map((news) => {
              const source =
                sources.find((source) => source.id === news.source_id)?.name ??
                "";
              const category =
                categories.find((cat) => cat.id === news.category_id)?.name ??
                "";
              return (
                <RelatedSmallArticle
                  key={news.id}
                  img={news.image}
                  category={category}
                  title={news.title}
                  source={source}
                  onClick={() => onArticleClick(news.id)}
                />
              );
            })}
          </div>
        ) : null}
      </section>
      {relatedArticles ? (
        <div className="relatedBigArticles container">
          <h2 className="relatedBigArticles__header">читайте также:</h2>
          <div className="grid">
            {relatedArticles?.slice(6, 9).map((news) => {
              const source =
                sources.find((source) => source.id === news.source_id)?.name ??
                "";
              const category =
                categories.find((cat) => cat.id === news.category_id)?.name ??
                "";
              return (
                <RelatedBigArticle
                  key={news.id}
                  img={news.image}
                  category={category}
                  title={news.title}
                  description={news.description}
                  source={source}
                  onClick={() => onArticleClick(news.id)}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </article>
  );
};
