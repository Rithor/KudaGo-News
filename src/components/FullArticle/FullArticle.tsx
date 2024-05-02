import React, { useState, useEffect } from 'react';
import { ScrollRestoration, useLocation, useParams } from 'react-router-dom';
import './FullArticle.css';
import { RelatedSmallArticle } from '../RelatedSmallArticle/RelatedSmallArticle';
import { RelatedBigArticle } from '../RelatedBigArticle/RelatedBigArticle';
import { Article, FullArticleAPI, ArticlesAPI } from '../../types';
import { formatDate, getActualDate } from '../../utils';

const URL_GET_FULL_ARTICLE =
  'https://thingproxy.freeboard.io/fetch/https://kudago.com/public-api/v1.4/events';
const URL_GET_RELATED_ARTICLES =
  'https://thingproxy.freeboard.io/fetch/https://kudago.com/public-api/v1.4/events/';
const FIELDS =
  'fields=id,publication_date,title,short_title,description,categories,images,tags,location,place,dates';
const OPTIONS = `page_size=12&text_format=text&expand=place&order_by=-publication_date&location=msk&actual_since=${getActualDate()}`;

export const FullArticle = () => {
  const { id } = useParams();

  if (id == undefined) return null;

  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };

  const [fullArcticle, setFullArticle] = useState<FullArticleAPI | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[] | null>(
    null
  );

  useEffect(() => {
    fetch(`${URL_GET_FULL_ARTICLE}/${id}`)
      .then((response) => response.json())
      .then((data: FullArticleAPI) => setFullArticle(data))
      .catch((error) => console.error(new Error(error)));
  }, [id, URL_GET_FULL_ARTICLE, URL_GET_RELATED_ARTICLES]);

  useEffect(() => {
    fetch(
      `${URL_GET_RELATED_ARTICLES}?${FIELDS}&${OPTIONS}&place_id=${fullArcticle?.place?.id}`
    )
      .then((response) => response.json())
      .then((data: ArticlesAPI) => setRelatedArticles(data.results))
      .catch((error) => console.error(new Error(error)));
  }, [fullArcticle, URL_GET_RELATED_ARTICLES, FIELDS, OPTIONS]);

  if (!fullArcticle) {
    return null;
  }

  const relatedBigArticles = relatedArticles
    ?.filter((item) => item.id !== Number(id))
    .slice(0, 3);
  const relatedSmallArticles = relatedArticles
    ?.filter((item) => item.id !== Number(id))
    .slice(3, 9);

  console.log(`export const FullArticle`);

  return (
    <article className="fullArticle-wr">
      {fullArcticle.images[0].image ? (
        <section className="hero-wImg">
          <div className="hero-wr">
            <div
              className="hero-wImg__background"
              style={{ display: loaded ? 'block' : 'none' }}
            >
              <img src={fullArcticle.images[0].image} onLoad={handleLoad}></img>
            </div>
            <div className="container">
              <h2 className="hero-wImg__title">{fullArcticle.title}</h2>
            </div>
          </div>

          <div className="grid container">
            <div className="hero__category">{fullArcticle.categories[0]}</div>
            <div className="hero__date">{formatDate(fullArcticle)}</div>
          </div>
        </section>
      ) : null}

      <section className="fullArticle grid container">
        <div className="fullArticle__body">
          {fullArcticle.images[0].image ? null : (
            <div className="whImage grid" id="whImage">
              <h2 className="title-whImg">{fullArcticle.title}</h2>
              <div className="hero__category">{fullArcticle.categories[0]}</div>
              <div className="hero__date hero__date_whImg">
                {formatDate(fullArcticle)}
              </div>
            </div>
          )}
          <div className="fullArticle__text">{fullArcticle.body_text}</div>
        </div>
        {relatedSmallArticles?.at(0) && (
          <div className="relatedSmallArticle">
            {relatedSmallArticles.map((news) => {
              return (
                <RelatedSmallArticle
                  key={news.id}
                  id={news.id}
                  img={news.images[0].image}
                  category={news.categories[0]}
                  title={news.title}
                  place={news.place.title}
                />
              );
            })}
          </div>
        )}
      </section>
      {relatedBigArticles?.at(0) && (
        <div className="relatedBigArticles container">
          <h2 className="relatedBigArticles__header">смотрите также:</h2>
          <div className="grid">
            {relatedBigArticles.map((news) => {
              return (
                <RelatedBigArticle
                  key={news.id}
                  id={news.id}
                  img={news.images[0].image}
                  category={news.categories[0]}
                  title={news.title}
                  description={news.description}
                  place={news.place.title}
                />
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
};
