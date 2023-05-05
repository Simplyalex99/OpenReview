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
} from '../../components';
import { useAppSelector } from '../../hooks';
import { fetcher, customFetcher } from '../../helpers';
import UrlApiTypesEnum, { BASE_URL } from '../../enums/types';

interface CustomerReviewsProps {
  total: number;
  reviews: [
    {
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
    }
  ];
  possible_languages: Array<string>;
}
interface BusinessPredictionProps {
  successful: boolean;
  positive_reviews: number;
  negative_reviews: number;
  predictions: Array<boolean>;
  status: number;
}
interface PopularBusinessProps {
  businesses: [
    {
      business_id: string;
      business_name: string;
      business_rating: number;
    }
  ];
}

interface BusinessCategoriesProps {
  categories: Array<string>;
}
type BusinessProps = {
  customerReviews?: CustomerReviewsProps;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  customerReviews,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  popularBusinesses,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
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
  return (
    <div className={dashboardStyles.wrapper}>
      <section
        className={`${dashboardStyles.heading} ${darkMode ? 'white' : 'black'}`}
      >
        {HeadingComponent}
      </section>
      <section className={dashboardStyles['grid-container']}>
        {StatsComponent}
      </section>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
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
  const customerReviewsJSON = await fetcher(endpoint1);
  const reviewTopicsData = await customFetcher(
    REVIEW_TOPICS_URL,
    token,
    httpMethod,
    customerReviewsJSON
  );
  const endpoint2 = `${POPULAR_RECOMMENDATION_URL}?category=${category}`;
  const popularBusinessesData = await fetcher(endpoint2);
  const endpoint3 = `${CATEGORIES_RECOMMENDATION_URL}?category=${category}`;
  const businessCategoriesData = await fetcher(endpoint3);
  const businessPredictionData = await customFetcher(
    BUSINESS_SUCCESS_URL,
    token,
    httpMethod,
    customerReviewsJSON
  );

  return {
    props: {
      customerReviews: reviewTopicsData,
      popularBusinesses: popularBusinessesData,
      businessCategories: businessCategoriesData,
      businessPrediction: businessPredictionData,
      businessName,
      businessAddress,
    },
  };
};

export const DashboardPage = withSearch(Dashboard) as NextPageWithLayout;
export default DashboardPage;
DashboardPage.getLayout = withLayout();
