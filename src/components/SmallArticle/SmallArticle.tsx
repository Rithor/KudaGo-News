import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './SmallArticle.css';
import { localizeString } from '../../utils';

type Props = {
  id: number;
  title: string;
  category: string;
  date: number;
};

export const SmallArticle: FC<Props> = ({ id, title, category, date }) => {
  return (
    <Link to={`/fullarticle/${id}`} className="small-article">
      <article className="small-article__wr">
        <h2 className="small-article__title">{title}</h2>
        <span className="article-date">{category}</span>
        <span className="article-source">{localizeString(date)}</span>
      </article>
    </Link>
  );
};
