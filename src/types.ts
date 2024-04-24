export interface NewsAPI {
  sources: Source[];
  categories: Category[];
  items: Article[];
}

export interface FullArticleAPI {
  id: number;
  lang: string;
  date: string;
  title: string;
  description: string;
  image: string;
  link: string;
  author: string;
  text: string;
  category: Category;
  source: Source;
}

export interface RelatedArticlesAPI {
  items: Article[];
}

export interface Source {
  id: number;
  name: string;
  site?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  lang: string;
  date: string;
  title: string;
  description: string;
  image: string;
  source_id: number;
  category_id: number;
}

export interface ActivitiesAPI {
  count: number;
  next: string;
  previous: null | string;
  results: Activity[];
}

export interface Activity {
  id: number;
  publication_date: number;
  title: string;
  description: string;
  location: {
    slug: string;
  };
  categories: string[];
  images: [
    {
      image: string;
      source: {
        name: string;
        link: string;
      };
    },
  ];
  short_title: string;
  tags: string[];
}
