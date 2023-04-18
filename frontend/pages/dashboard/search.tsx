import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import URLTypesEnum from '../../enums/types';
import dashboardSearchStyles from '../../styles/pages/DashboardSearch.module.scss';
import {
  PrimaryLayout,
  NextPageWithLayout,
  BusinessProfileCard,
  AbstractPatternSVG,
  SemiCirclePatternSVG,
  SearchSection,
  SEO,
} from '../../components';
import { objectKeyToArray } from '../../helpers';
import {
  useFormInput,
  usePosition,
  useFetchData,
  useAppSelector,
} from '../../hooks';

type Categories = {
  title: string;
};
type Location = {
  address1: string;
  city: string;
};
interface Businesses {
  id: string;
  name: string;
  image_url: string;
  url: string;
  review_count: number;
  categories: Array<Categories>;
  rating: number;
  location: Location;
}
interface BusinessJSON {
  businesses?: Array<Businesses>;
}
interface AutoCompleteJSON {
  terms?: object[];
}
interface BusinessesSectionProps {
  businesses: Businesses[];
}
const BusinessesSection = ({ businesses }: BusinessesSectionProps) => {
  return (
    <>
      {businesses.map((business) => {
        const categories = objectKeyToArray(business.categories, 'title');
        return (
          <BusinessProfileCard
            title={business.name}
            imgUrl={business.image_url}
            reviewCount={business.review_count}
            averageRating={business.rating}
            businessUrl={business.url}
            categoryTags={categories}
            address={business.location.address1}
            city={business.location.city}
            dashboardUrl={`/dashboard/${business.id}`}
          />
        );
      })}
    </>
  );
};

const DashboardSearch: NextPageWithLayout = () => {
  const { AUTOCOMPLETE_URL, SEARCH_BUSINESSES_URL } = URLTypesEnum;
  const { latitude, longitude } = usePosition();
  const [formInput, onChangeHandler, setFormInput] = useFormInput();
  const [endpoint, setEndpoint] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  const autoCompleteResponse = useFetchData(AUTOCOMPLETE_URL, endpoint);
  const businessesResponse = useFetchData(SEARCH_BUSINESSES_URL, searchQuery);
  const businessJSON: BusinessJSON = businessesResponse?.data ?? {};
  const businesses: Businesses[] = businessJSON.businesses ?? [];
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
    const query = `?term=${formInput}&latitude=${latitude}&longitude=${longitude}&limit=${searchResultsLimit}`;
    setSearchTerm(formInput);
    setSearchQuery(query);
  };
  return (
    <>
      <SEO title="Search" description="Search businesses from anywhere" />
      <div className={`${dashboardSearchStyles.wrapper}`}>
        <div className={dashboardSearchStyles['abstract-wrapper']}>
          <AbstractPatternSVG />
        </div>
        <div className={dashboardSearchStyles['semi-circle-wrapper']}>
          <SemiCirclePatternSVG />
        </div>
        <div className={`${dashboardSearchStyles['search-wrapper']}`}>
          <SearchSection
            formInput={formInput}
            suggestionsHandler={suggestionsHandler}
            inputHandler={inputHandler}
            searchHandler={searchHandler}
            suggestions={suggestions}
          />
        </div>

        <div className={dashboardSearchStyles['spinner-icon']}>
          <ClipLoader
            color={darkMode ? '#FFFFFF' : '#909090'}
            loading={businessesResponse.loading}
            size={150}
            aria-label="Loading Spinner"
          />
        </div>

        {businesses && searchTerm.length !== 0 ? (
          <>
            <p
              className={`${dashboardSearchStyles['search-status']} ${
                darkMode ? 'white' : 'black'
              }`}
            >
              Search results for &apos; <span>{searchTerm}</span> &apos;
            </p>
            <BusinessesSection businesses={businesses} />
          </>
        ) : (
          <p className={dashboardSearchStyles['error-message']}>
            Not available
          </p>
        )}
      </div>
    </>
  );
};

export default DashboardSearch;
DashboardSearch.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
