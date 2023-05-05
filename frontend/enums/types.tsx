export const BASE_URL = 'http://127.0.0.1:5000/businesses';

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

export default UrlApiTypesEnum;
