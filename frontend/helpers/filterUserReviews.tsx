import { UserReviewProps } from '../typings/api.d';
import {
  FilterOptions,
  RatingOptionsEnum,
  SentimentOptionsEnum,
  TopicOptionsEnum,
} from '../enums/types';

type FilterType = FilterOptions.RATING | FilterOptions.TOPICS | 'ALL';
type HelperProps = {
  reviews: UserReviewProps['reviews'];
  filterOptions: { [key: string]: number | string };
};

const getFilterReviewsHelper = ({ reviews, filterOptions }: HelperProps) => {
  const allFilterReviews: UserReviewProps['reviews'] = [];
  const userIds = new Set<string>();

  Object.keys(filterOptions).forEach((key: string) => {
    const value = filterOptions[key];
    const filterType = key as FilterType;

    if (filterType in RatingOptionsEnum) {
      reviews.forEach((review) => {
        const { id } = review.user;
        if (!userIds.has(id)) {
          const rating = value as number;
          const equalRating = Math.round(rating) === Math.round(review.rating);
          if (equalRating) {
            userIds.add(id);
            allFilterReviews.push(review);
          }
        }
      });
    }
    if (filterType in TopicOptionsEnum || filterType in SentimentOptionsEnum) {
      reviews.forEach((review) => {
        const { id } = review.user;
        if (!userIds.has(id)) {
          const selectedTopic = value as String;
          let hasTopic = false;
          const { categories } = review;
          categories.forEach((category) => {
            const topicLowerCase = selectedTopic.toLocaleLowerCase();
            const isEqual = topicLowerCase === category.toLocaleLowerCase();
            hasTopic = isEqual || hasTopic;
          });
          if (hasTopic) {
            userIds.add(id);
          }
        }
      });
    }
  });

  return [...allFilterReviews];
};
type Props = {
  filterOptions: { [key: string]: string | number };
  reviews: UserReviewProps['reviews'];
};

export const filterUserReviews = ({
  filterOptions,
  reviews,
}: Props): UserReviewProps['reviews'] => {
  const allFilters: { [key: string]: number | string } = {};
  let allFiltersSize = 0;
  Object.keys(filterOptions).forEach((key) => {
    const value = filterOptions[key];
    allFilters[key] = value;
    allFiltersSize += 1;
  });

  if (allFiltersSize === 0) {
    return reviews;
  }

  return getFilterReviewsHelper({ reviews, filterOptions: allFilters });
};

export default filterUserReviews;
