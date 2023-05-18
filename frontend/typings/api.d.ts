export type TopicProps = {
  categories: Array<string>;
};
export type ReviewTopicsProps = {
  topics: Array<TopicProps>;
};
export type BusinessPredictionProps = {
  successful: boolean;
  positive_reviews: number;
  negative_reviews: number;
  predictions: Array<boolean>;
  status: number;
};
type ReviewProps = {
  id: string;
  url: string;
  text: string;
  rating: number;
  time_created: string;
  user: {
    id: string;
    profile_url: string;
    image_url: string;
    name: string;
  };
};
interface AdvanceReviewProps extends ReviewProps {
  categories: Array<string>;
}
export type CustomerReviewProps = {
  total: number;
  reviews: [ReviewProps];
  possible_languages: Array<string>;
};
export interface UserReviewProps {
  reviews: Array<AdvanceReviewProps>;
}

export type PopularProps = {
  business_id: string;
  business_name: string;
  business_rating: number;
  address: string;
  city: string;
  total_reviews: number;
  category: string;
  url: string;
  img_url: string;
};
export type PopularBusinessProps = {
  businesses: PopularProps[];
};

export type BusinessCategoriesProps = {
  categories: Array<string>;
};
