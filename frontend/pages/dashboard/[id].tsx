import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  PrimaryLayout,
  NextPageWithLayout,
  SearchSection,
} from '../../components';
import {
  useAppSelector,
  useFormInput,
  useFetchData,
  usePosition,
} from '../../hooks';
import { fetcher, customFetcher, objectKeyToArray } from '../../helpers';
import URLTypesEnum, { BASE_URL } from '../../enums/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const businessID = context.params?.id ?? '';
  const category = context.query?.category ?? '';
  const {
    REVIEW_TOPICS_URL,
    CATEGORIES_RECOMMENDATION_URL,
    POPULAR_RECOMMENDATION_URL,
    BUSINESS_SUCCESS_URL,
  } = URLTypesEnum;
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
    },
  };
};
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
interface BusinessProps {
  customerReviews?: CustomerReviewsProps;
  popularBusinesses?: PopularBusinessProps;
  businessCategories?: BusinessCategoriesProps;
  businessPrediction?: BusinessPredictionProps;
}

interface AutoCompleteJSON {
  terms?: object[];
}
const Dashboard: NextPageWithLayout = (props) => {
  const {
    customerReviews,
    popularBusinesses,
    businessCategories,
    businessPrediction,
  }: BusinessProps = props;
  const stateTheme = useAppSelector((state) => state.themeReducer);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { darkMode } = stateTheme;
  const [endpoint, setEndpoint] = useState('');
  const { AUTOCOMPLETE_URL } = URLTypesEnum;
  const { latitude, longitude } = usePosition();
  const [formInput, onChangeHandler, setFormInput] = useFormInput();
  const autoCompleteResponse = useFetchData(AUTOCOMPLETE_URL, endpoint);

  const autoCompleteJSON: AutoCompleteJSON = autoCompleteResponse?.data ?? {};
  const terms = autoCompleteJSON?.terms ?? undefined;

  const suggestions = terms ? objectKeyToArray(terms, 'text') : [];
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(e);
    const queryURL = `?text=${formInput}&latitude=${latitude}&longitude=${longitude}`;
    setEndpoint(queryURL);
  };

  const suggestionsHandler = (name: string) => {
    setFormInput(name);
  };
  const searchHandler = () => {
    const searchResultsLimit = 3;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const query = `?term=${formInput}&latitude=${latitude}&longitude=${longitude}&limit=${searchResultsLimit}`;
  };
  console.log(customerReviews);
  console.log(popularBusinesses);
  console.log(businessCategories);
  console.log(businessPrediction);

  return (
    <>
      <p>hi</p>
      <SearchSection
        formInput={formInput}
        searchHandler={searchHandler}
        suggestions={suggestions}
        suggestionsHandler={suggestionsHandler}
        inputHandler={inputHandler}
      />
    </>
  );
};
export default Dashboard;
Dashboard.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
