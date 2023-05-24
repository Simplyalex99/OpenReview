const API_HOST = process.env.API_HOST;
export const BASE_URL = process.env.API_HOST
  ? `https://${API_HOST}.onrender.com/flask`
  : process.env.NEXT_PUBLIC_API_URL;

const UrlApiTypesEnum = Object.freeze({
  AUTOCOMPLETE_URL: `${BASE_URL}/autocomplete`,
  SEARCH_BUSINESSES_URL: `${BASE_URL}/search`,
  POPULAR_RECOMMENDATION_URL: `${BASE_URL}/recommendations/popular`,
  CATEGORIES_RECOMMENDATION_URL: `${BASE_URL}/recommendations/categories`,
  BUSINESS_SUCCESS_URL: `${BASE_URL}/predictions/business-success`,
  REVIEW_TOPICS_URL: `${BASE_URL}/predictions/topics`,
});
export enum UrlPages {
  DASHBOARD_SEARCH_PATH = '/dashboard/search',
  HOME_PATH = '/',
}

export const enum FilterOptions {
  TOPICS = 'topics',
  RATING = 'rating',
  SENTIMENT = 'sentiment',
}
export const SentimentOptionsEnum = Object.freeze({
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
});
export const TopicOptionsEnum = Object.freeze({
  FOOD: 'food',
  EXPERIENCE: 'experience',
  OTHERS: 'others',
  SERVICES: 'services',
});
export const RatingOptionsEnum = Object.freeze({
  EXCELLENT: 5,
  GOOD: 4,
  AVERAGE: 3,
  POOR: 2,
  TERRIBLE: 1,
});

export default UrlApiTypesEnum;
