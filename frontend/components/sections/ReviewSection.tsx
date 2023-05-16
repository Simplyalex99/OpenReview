import React, { useState } from 'react';
import { ProgressReviewBars } from '../others/ProgressBar';
import { Pagination } from '../utils/PaginationComponent';
import { useAppSelector, usePaginationHelper } from '../../hooks';
import { DropDown } from '../others/DropDown';
import { Modal } from '../others/Modal';
import { Button } from '../common/Button';
import { UserReviewProps } from '../../typings/api.d';
import reviewStyles from '../../styles/sections/Review.module.scss';
import { objectKeyToArray } from '../../utils';
import { ReviewCard } from '../shared/ReviewCard';

import {
  FilterOptions,
  RatingOptionsEnum,
  TopicOptionsEnum,
  SentimentOptionsEnum,
} from '../../enums/types';
import { filterUserReviews, buildFilterOptions } from '../../helpers';

type ReviewSectionProps = {
  customerReviews: UserReviewProps;
};

export const ReviewSection: React.FC<ReviewSectionProps> = (props) => {
  const { customerReviews } = props;
  const { reviews } = customerReviews;
  const allRatings = objectKeyToArray(reviews, 'rating');

  const [isOpen, setIsOpen] = useState(false);
  const modalClickHandler = () => {
    setIsOpen(!isOpen);
  };
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  const progressBarStyles = {
    fillColor: darkMode ? '#6c63ff' : '#602bf8',
    backgroundColor: darkMode ? '#2f343c' : '#e0e0de',
  };
  const reviewsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const pageHandler = (page: number) => {
    setCurrentPage(page);
  };
  const checkedRatingLength = Object.keys(RatingOptionsEnum).length;
  const checkedSentimentLength = Object.keys(SentimentOptionsEnum).length;
  const checkedTopicLength = Object.keys(TopicOptionsEnum).length;
  const [checkedRatings, setCheckedRatings] = useState(
    new Array(checkedRatingLength).fill(false)
  );
  const [checkedSentiments, setCheckedSentiments] = useState(
    new Array(checkedSentimentLength).fill(false)
  );
  const [checkedTopics, setCheckedTopics] = useState(
    new Array(checkedTopicLength).fill(false)
  );

  const [filterReviews, setFilterReviews] = useState(reviews);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    checkedState: Array<boolean>,
    setHandler: (checked: Array<boolean>) => void,
    index: number
  ) => {
    const updatedCheckedState = checkedState.map((isChecked, position) =>
      index === position ? !isChecked : isChecked
    );
    setHandler(updatedCheckedState);
    const checkedType = e.target.name;
    let filterOptions: { [key: string]: string | number } = {};
    const options1 = buildFilterOptions(TopicOptionsEnum, checkedTopics);
    const options2 = buildFilterOptions(
      SentimentOptionsEnum,
      checkedSentiments
    );
    const options3 = buildFilterOptions(RatingOptionsEnum, checkedRatings);
    if (checkedType === FilterOptions.RATING) {
      const ratingOptionsUpdated = buildFilterOptions(
        RatingOptionsEnum,
        updatedCheckedState
      );
      filterOptions = { ...options1, ...options2, ...ratingOptionsUpdated };
    } else if (checkedType === FilterOptions.TOPICS) {
      const topicOptionsUpdated = buildFilterOptions(
        TopicOptionsEnum,
        updatedCheckedState
      );
      filterOptions = { ...topicOptionsUpdated, ...options3, ...options3 };
    } else {
      const sentimentOptionsUpdated = buildFilterOptions(
        SentimentOptionsEnum,
        updatedCheckedState
      );
      filterOptions = { ...options1, ...sentimentOptionsUpdated, ...options3 };
    }

    const updatedReviews = filterUserReviews({ filterOptions, reviews });
    setFilterReviews(updatedReviews);
  };
  const onChangeRatings = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    onChangeHandler(e, checkedRatings, setCheckedRatings, index);
  };

  const onChangeTopics = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    onChangeHandler(e, checkedTopics, setCheckedTopics, index);
  };

  const onChangeSentiments = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    onChangeHandler(e, checkedSentiments, setCheckedSentiments, index);
  };

  const paginationData = usePaginationHelper(
    reviewsPerPage,
    currentPage,
    filterReviews
  );
  const reviewsToShow = paginationData.filterData as UserReviewProps['reviews'];

  const maxPages = paginationData.maxPages;
  return (
    <section className={`text-center ${darkMode ? 'white' : 'black'}`}>
      <h2> Customer Reviews </h2>
      <div className={reviewStyles['progress-container']}>
        <ProgressReviewBars
          fillColor={progressBarStyles.fillColor}
          ratings={allRatings}
          backgroundColor={progressBarStyles.backgroundColor}
          fontSize="0.9rem"
        />
      </div>
      <Modal
        secondClassName={`${
          darkMode
            ? reviewStyles['close-icon-dark']
            : reviewStyles['close-icon-light']
        }`}
        open={isOpen}
        closeHandler={modalClickHandler}
      >
        <DropDown
          headingClassName={
            darkMode
              ? `${reviewStyles['heading-dark']}`
              : `${reviewStyles['heading-light']}`
          }
          wrapperClassName={`${darkMode ? 'white' : 'black'} ${
            darkMode
              ? reviewStyles['dividor-dark']
              : reviewStyles['dividor-light']
          }`}
          title="Ratings"
        >
          <div className={`${reviewStyles['flex-container']}`}>
            {Object.keys(RatingOptionsEnum).map((key: string, index) => {
              return (
                <label htmlFor={key} className={reviewStyles.label}>
                  {key}
                  <input
                    id={key}
                    type="checkbox"
                    value={
                      RatingOptionsEnum[key as keyof typeof RatingOptionsEnum]
                    }
                    name="rating"
                    onChange={(e) => onChangeRatings(e, index)}
                    checked={checkedRatings[index]}
                    className={reviewStyles['input-check']}
                  />
                </label>
              );
            })}
          </div>
        </DropDown>
        <DropDown
          wrapperClassName={`${darkMode ? 'white' : 'black'} ${
            darkMode
              ? reviewStyles['dividor-dark']
              : reviewStyles['dividor-light']
          }`}
          headingClassName={
            darkMode
              ? `${reviewStyles['heading-dark']}`
              : `${reviewStyles['heading-light']}`
          }
          title="Topics"
        >
          <div className={`${reviewStyles['flex-container']}`}>
            {Object.keys(TopicOptionsEnum).map((key: string, index) => {
              return (
                <label htmlFor={key} className={reviewStyles.label}>
                  {key}
                  <input
                    id={key}
                    type="checkbox"
                    value={
                      TopicOptionsEnum[key as keyof typeof TopicOptionsEnum]
                    }
                    name="topics"
                    onChange={(e) => onChangeTopics(e, index)}
                    checked={checkedTopics[index]}
                    className={reviewStyles['input-check']}
                  />
                </label>
              );
            })}
          </div>
        </DropDown>
        <DropDown
          wrapperClassName={`${darkMode ? 'white' : 'black'} ${
            darkMode
              ? reviewStyles['dividor-dark']
              : reviewStyles['dividor-light']
          }`}
          headingClassName={
            darkMode
              ? `${reviewStyles['heading-dark']}`
              : `${reviewStyles['heading-light']}`
          }
          title="Sentiment"
        >
          <div className={`${reviewStyles['flex-container']}`}>
            {Object.keys(SentimentOptionsEnum).map((key: string, index) => {
              return (
                <label htmlFor={key} className={reviewStyles.label}>
                  {key}
                  <input
                    id={key}
                    type="checkbox"
                    value={
                      SentimentOptionsEnum[
                        key as keyof typeof SentimentOptionsEnum
                      ]
                    }
                    name="sentiment"
                    onChange={(e) => onChangeSentiments(e, index)}
                    checked={checkedSentiments[index]}
                    className={reviewStyles['input-check']}
                  />
                </label>
              );
            })}
          </div>
        </DropDown>
      </Modal>

      <Button
        type="button"
        onClick={modalClickHandler}
        className={`${reviewStyles['filter-search']} white ${
          darkMode ? `${reviewStyles['filter-search-dark-mode']}` : 'purple-bg'
        }`}
      >
        Select Filter
      </Button>
      {reviewsToShow.map((review) => {
        return (
          <ReviewCard
            rating={review.rating}
            text={review.text}
            user={review.user}
            time_created={review.time_created}
            darkMode={darkMode}
            categories={review.categories}
          />
        );
      })}
      <Pagination
        onChange={pageHandler}
        currentPage={currentPage}
        totalPages={maxPages}
      />
    </section>
  );
};
export default ReviewSection;
