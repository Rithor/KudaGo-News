import React, { FC } from 'react';
import './Articles.css';
import { MainArticle } from '../MainArticle/MainArticle';
import { SmallArticle } from '../SmallArticle/SmallArticle';
import { Activity } from '../../types';

type Props = {
  activities: Activity[];
  onArticleClick: (id: number) => void;
};

export const Activities: FC<Props> = ({ activities, onArticleClick }) => {
  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {activities.slice(0, 3).map((activity) => {
            const source = 'SOURCE';
            const category = 'CATEGORY';
            return (
              <MainArticle
                key={activity.id}
                image={activity.images[0].image}
                category={category}
                title={activity.title}
                description={activity.description}
                source={source}
                onClick={() => onArticleClick(activity.id)}
              />
            );
          })}
        </section>

        <section className="articles__small-column">
          {activities.slice(3, 12).map((activity) => {
            const source = 'SOURCE';
            return (
              <SmallArticle
                key={activity.id}
                title={activity.title}
                source={source}
                date={String(activity.publication_date * 1000)}
                onClick={() => onArticleClick(activity.id)}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};
