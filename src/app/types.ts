export interface IArticlesAPI {
  count: number;
  next: string;
  previous: null | string;
  results: IArticle[];
}

export interface IDates {
  start: number;
  end: number;
}

export interface IArticle {
  id: number;
  publication_date: number;
  dates: IDates[];
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

export interface IPartnersArticle {
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
