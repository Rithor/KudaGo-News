import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './ArticlePage.css';
import {
  categoryNames,
  formatDate,
  repeat,
  setMeta,
} from '@app/utils';
import classNames from 'classnames';
import {
  useAdaptive,
  useAppDispatch,
  useAppSelector,
} from '@app/hooks';
import { fetchArticleItem } from '../actions';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import { fetchSamePlaceArticles } from '@features/samePlaceArticles/actions';
import { useNetworkStatusContext } from '@features/networkStatus/NetworkStatusContextProvider';
import { IArticle } from '@app/types';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { Hero } from '@components/Hero/Hero';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Title } from '@components/Title/Title';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';
import { Error } from '@components/Error/Error';
import { ArticlePageSkeleton } from './ArticlePageSkeleton';

export const ArticlePage = () => {
  const { id } = useParams();
  const { isMobile, isDesktop } = useAdaptive();
  if (id === undefined) return null;

  const { online } = useNetworkStatusContext();

  const dispatch = useAppDispatch();
  const { articleItem, isLoading, error } = useAppSelector(
    (state) => state.articleItem
  );

  const {
    samePlaceArticles,
    samePlaceArticlesIsLoading,
    samePlaceArticlesID,
  } = useAppSelector((state) => state.samePlaceArticles);

  useEffect(() => {
    dispatch(fetchArticleItem(id));
  }, [id, online]);

  useEffect(() => {
    if (articleItem.place?.id) {
      const obj = {
        placeID: articleItem.place.id,
        isMobile: isMobile,
      };
      dispatch(fetchSamePlaceArticles(obj));
    }
  }, [articleItem, online]);

  useEffect(() => {
    if (!articleItem.id) {
      return;
    }
    setMeta({
      'og:type': 'article',
      'og:title': `${articleItem.short_title} — KudaGo News`,
      'og:description': articleItem.description,
      'og:url': window.location.href,
      'og:image':
        articleItem.images[0].image ??
        `${window.location.origin}/img/icon512.png`,
    });
  }, [articleItem]);

  useEffect(() => {
    document.title = `${articleItem.short_title} - KudaGo`;
  }, [articleItem]);

  useEffect(() => {
    if (!isLoading && articleItem) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const swiper = new Swiper('.contentSlider', {
        modules: [Navigation, Pagination],
        loop: true,
        speed: 500,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.contentSlider-pagination',
          clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 0,
      });
    }
  }, [articleItem, isLoading]);

  const [relatedArticles, relatedSidebarArticles] = useMemo(() => {
    let relatedArticles: IArticle[] = [];
    let relatedSidebarArticles: IArticle[] = [];
    if (samePlaceArticlesID === articleItem.place?.id) {
      const filteredSamePlaceArticles = samePlaceArticles?.filter(
        ({ id }) => id !== articleItem.id
      );
      relatedArticles = filteredSamePlaceArticles?.slice(0, 3);
      relatedSidebarArticles = filteredSamePlaceArticles?.slice(3, 9);
    }
    return [relatedArticles, relatedSidebarArticles];
  }, [samePlaceArticles]);

  if (error && !online) {
    return <ArticlePageSkeleton isDesktop={isDesktop} />;
  }

  if (error) {
    return <Error />;
  }

  if (articleItem.id == 0)
    return <ArticlePageSkeleton isDesktop={isDesktop} />;

  return (
    <article className="articlePage-wr">
      {isLoading || !articleItem ? (
        <HeroSkeleton hasImage />
      ) : (
        <Hero
          title={articleItem.title}
          image={articleItem.images[0].image}
        />
      )}

      <div className="container hero__info">
        {isLoading || !articleItem ? (
          <SkeletonText />
        ) : (
          <>
            <div className="hero__category">
              {categoryNames[articleItem.categories[0]]}
            </div>
            <div className="hero__date">
              {formatDate(articleItem.dates)}
            </div>
            <div className="hero__place">
              {articleItem.place?.title}
            </div>
          </>
        )}
      </div>

      <section
        className="articlePage grid container"
        aria-label="Статья"
      >
        <div
          className={classNames('articlePage__body', {
            'articlePage__body--whSidebarCards':
              !relatedSidebarArticles?.length &&
              !samePlaceArticlesIsLoading,
          })}
        >
          <div className="articlePage__description">
            {isLoading || !articleItem ? (
              <SkeletonText rowsCount={3} />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: articleItem.description,
                }}
              ></div>
            )}
          </div>

          <div className="articlePage__text">
            {isLoading || !articleItem ? (
              <SkeletonText rowsCount={18} />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: articleItem.body_text,
                }}
              ></div>
            )}
          </div>

          <div className="articlePage__tags-wr">
            {isLoading || !articleItem ? (
              <SkeletonText rowsCount={1} />
            ) : (
              articleItem.tags.map((tag) => (
                <div key={tag} className="articlePage__tags">
                  {tag}
                </div>
              ))
            )}
          </div>
        </div>

        {/* show Skeleton */}
        {isDesktop &&
          (samePlaceArticlesIsLoading || !samePlaceArticles) && (
            <aside className="relatedSidebarArticles">
              {repeat((i) => {
                return (
                  <SidebarArticleCardSkeleton
                    key={i}
                    className="articlePage__sidebar-item sidebar-article-card--skeleton"
                  />
                );
              }, 6)}
            </aside>
          )}

        {/* show uploaded data */}
        {isDesktop && relatedSidebarArticles?.at(0) && (
          <aside className="relatedSidebarArticles">
            {relatedSidebarArticles.map((article) => {
              return (
                <SidebarArticleCard
                  className="articlePage__sidebar-item"
                  key={article.id}
                  article={article}
                />
              );
            })}
          </aside>
        )}
      </section>

      {/* show Skeleton */}
      {(samePlaceArticlesIsLoading || !samePlaceArticles) && (
        <div className="relatedArticles container">
          <Title Component={'h2'} className="relatedArticles__header">
            смотрите также:
          </Title>
          <div className="grid">
            {repeat((i) => {
              return (
                <ArticleCardSkeleton
                  key={i}
                  hasImage={false}
                  className="articlePage__related-articles-item"
                />
              );
            }, 3)}
          </div>
        </div>
      )}

      {/* show uploaded data */}
      {relatedArticles?.at(0) && (
        <div className="relatedArticles container">
          <Title Component={'h2'} className="relatedArticles__header">
            смотрите также:
          </Title>
          <div className="grid">
            {relatedArticles.map((article) => {
              return (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  shortTitle={article.short_title}
                  category={article.categories[0]}
                  description={article.description}
                  dates={article.dates}
                  className="articlePage__related-articles-item"
                />
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
};
