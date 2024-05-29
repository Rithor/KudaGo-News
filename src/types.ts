export interface ArticlesAPI {
  count: number;
  next: string;
  previous: null | string;
  results: Article[];
}

export interface Dates {
  start: number;
  end: number;
}

export interface Article {
  id: number;
  publication_date: number;
  dates: Dates[];
  title: string;
  slug: string;
  place: {
    id: number;
    title: string;
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

export interface PartnersArticle {
  id: string;
  'company-name': string;
  title: string;
  description: string;
  text: string;
  image: string;
  created: {
    nanoseconds: number;
    seconds: number;
  };
}
