export const BASE_URL = 'http://localhost:5000/businesses';

const URLTypesEnum = Object.freeze({
  AUTOCOMPLETE_URL: `${BASE_URL}/autocomplete`,
  SEARCH_BUSINESSES_URL: `${BASE_URL}/search`,
  POPULAR_RECOMMENDATION_URL: `${BASE_URL}/recommendations/popular`,
  CATEGORIES_RECOMMENDATION_URL: `${BASE_URL}/recommendations/categories`,
  BUSINESS_SUCCESS_URL: `${BASE_URL}/predictions/business-success`,
  REVIEW_TOPICS_URL: `${BASE_URL}/predictions/topics`,
});

export default URLTypesEnum;
