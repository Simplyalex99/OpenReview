import React from 'react';
import { GetServerSideProps } from 'next';
import dashboardStyles from '../../styles/pages/Dashboard.module.scss';
import {
  NextPageWithLayout,
  NullComponent,
  withLayout,
  withSearch,
  HeadingSection,
  StatsSection,
  CompetitorsSection,
  RecommendationSection,
  ReviewSection,
} from '../../components';
import { useAppSelector } from '../../hooks';
import { fetcher, customFetcher } from '../../utils';
import UrlApiTypesEnum, { BASE_URL } from '../../enums/types';
import {
  ReviewTopicsProps,
  CustomerReviewProps,
  PopularBusinessProps,
  BusinessCategoriesProps,
  BusinessPredictionProps,
  UserReviewProps,
} from '../../typings/api.d';
import { APIError } from '../../lib/exceptions';

export type BusinessProps = {
  customerReviews?: UserReviewProps;
  popularBusinesses?: PopularBusinessProps;
  businessCategories?: BusinessCategoriesProps;
  businessPrediction?: BusinessPredictionProps;
  businessName?: string;
  businessAddress?: string;
};

const Dashboard: NextPageWithLayout = ({
  businessPrediction,
  businessName,
  businessAddress,
  customerReviews,
  popularBusinesses,
  businessCategories,
}: BusinessProps) => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  const HeadingComponent = businessName ? (
    <HeadingSection
      businessName={businessName}
      businessAddress={businessAddress}
    />
  ) : (
    <NullComponent />
  );
  const StatsComponent = businessPrediction ? (
    <StatsSection
      positiveReviews={businessPrediction.positive_reviews}
      negativeReviews={businessPrediction.negative_reviews}
      businessIsSuccessful={businessPrediction.successful}
      darkMode={darkMode}
    />
  ) : (
    <NullComponent />
  );

  const CompetitorsComponent = popularBusinesses ? (
    <CompetitorsSection businesses={popularBusinesses.businesses} />
  ) : (
    <NullComponent />
  );
  const RecommendationComponent = businessCategories ? (
    <RecommendationSection categories={businessCategories.categories} />
  ) : (
    <NullComponent />
  );

  let CustomerReviewsComponent = <NullComponent />;

  if (customerReviews) {
    CustomerReviewsComponent = (
      <ReviewSection customerReviews={customerReviews} />
    );
  }
  return (
    <div className={dashboardStyles.wrapper}>
      {HeadingComponent}

      {StatsComponent}

      {CompetitorsComponent}

      {RecommendationComponent}
      {CustomerReviewsComponent}
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const businessID = context.params?.id ?? '';
    const category = context.query?.category ?? '';
    const businessName = context.query?.name ?? '';
    const businessAddress = context.query?.address ?? '';
    const {
      REVIEW_TOPICS_URL,
      CATEGORIES_RECOMMENDATION_URL,
      POPULAR_RECOMMENDATION_URL,
      BUSINESS_SUCCESS_URL,
    } = UrlApiTypesEnum;

    const httpMethod = 'POST';
    const token = undefined;
    const endpoint1 = BASE_URL + `/${businessID}/reviews`;
    const customerReviewResponse = await fetcher(endpoint1);
    let customerReviewData = undefined;
    let customerReviewsJSON = {};
    if (customerReviewResponse) {
      customerReviewsJSON = customerReviewResponse;
      customerReviewData = customerReviewsJSON as CustomerReviewProps;
    }

    const reviewTopicResponse = await customFetcher(
      REVIEW_TOPICS_URL,
      token,
      httpMethod,
      customerReviewResponse
    );
    let reviewTopicData: any | undefined = undefined;
    if (reviewTopicResponse) {
      const reviewTopicJSON = reviewTopicResponse;
      reviewTopicData = reviewTopicJSON as ReviewTopicsProps;
    }

    const endpoint2 = `${POPULAR_RECOMMENDATION_URL}?category=${category}`;
    const popularBusinessesData = await fetcher(endpoint2);
    const endpoint3 = `${CATEGORIES_RECOMMENDATION_URL}?category=${category}`;
    const businessCategoriesData = await fetcher(endpoint3);
    const businessPredictionResponse = await customFetcher(
      BUSINESS_SUCCESS_URL,
      token,
      httpMethod,
      customerReviewResponse
    );

    const reviews = customerReviewData?.reviews;
    let mergedCustomerReviews = undefined;

    if (reviews) {
      const mergedCustomerData = reviews?.map((review, index) => {
        const { predictions } = businessPredictionResponse;

        const { topics } = reviewTopicData;

        const topicCategories = topics[index].categories;
        const isSuccesful = predictions[index];
        const sentiment = isSuccesful ? 'Positive' : 'Negative';
        const categories = [sentiment, ...topicCategories];

        return { ...review, categories };
      });
      mergedCustomerReviews = {
        ...customerReviewData,
        reviews: mergedCustomerData,
      };
    }

    return {
      props: {
        customerReviews: mergedCustomerReviews,
        popularBusinesses: popularBusinessesData,
        businessCategories: businessCategoriesData,
        businessPrediction: businessPredictionResponse,
        businessName,
        businessAddress,
      },
    };
  } catch (err: any) {
    console.log(`error: ${err}`);
    throw new APIError(err.message);
  }
};

export const DashboardPage = withSearch(Dashboard) as NextPageWithLayout;
export default DashboardPage;
DashboardPage.getLayout = withLayout();
