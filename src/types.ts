export interface FullArticleAPI {
  id: number;
  publication_date: number;
  dates: [
    {
      start: number;
      end: number;
    },
  ];
  title: string;
  slug: string;
  place: {
    id: number;
  };
  description: string;
  body_text: string;
  location: {
    slug: string;
  };
  categories: string[];
  tagline: string;
  age_restriction: number;
  price: string;
  is_free: false;
  images: [
    {
      image: string;
      source: {
        name: string;
        link: string;
      };
    },
  ];
  favorites_count: number;
  comments_count: number;
  site_url: string;
  short_title: string;
  tags: string[];
  disable_comments: false;
  participants: string[];
}

export interface ArticlesAPI {
  count: number;
  next: string;
  previous: null | string;
  results: Article[];
}

export interface Article {
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
  place: {
    title: string;
  };
  dates: [
    {
      start: number;
      end: number;
    },
  ];
}
