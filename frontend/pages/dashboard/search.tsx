import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import dashboardSearchStyles from '../../styles/pages/DashboardSearch.module.scss';
import {
  NextPageWithLayout,
  BusinessProfileCard,
  AbstractPatternSVG,
  SemiCirclePatternSVG,
  withSearch,
  SEO,
  SearchPropsType,
  withLayout,
  Pagination,
} from '../../components';
import { objectKeyToArray, getPaginationHelper } from '../../utils';
import { useAppSelector } from '../../hooks';

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
            isResponsive
          />
        );
      })}
    </>
  );
};

export const DashboardSearch = (props: SearchPropsType) => {
  const { businessResponse, searchTerm } = props;
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  const businessJSON: BusinessJSON = businessResponse?.data ?? {};
  const businesses: Businesses[] = businessJSON.businesses ?? [];
  const [currentPage, setCurrentPage] = useState(1);

  const onClickPageHandler = (page: number) => {
    setCurrentPage(page);
  };
  const businessesPerPage = 3;
  const {
    filterData,
    maxPages,
  }: { filterData: Businesses[]; maxPages: number } = getPaginationHelper(
    businessesPerPage,
    currentPage,
    businesses
  );

  return (
    <>
      <SEO title="Search" description="Search businesses from anywhere" />
      <div className={dashboardSearchStyles.wrapper}>
        <div className={dashboardSearchStyles['abstract-wrapper']}>
          <AbstractPatternSVG />
        </div>
        <div className={dashboardSearchStyles['semi-circle-wrapper']}>
          <SemiCirclePatternSVG />
        </div>

        <div className={dashboardSearchStyles['spinner-icon']}>
          {businessResponse?.loading && (
            <ClipLoader
              color={darkMode ? '#FFFFFF' : '#909090'}
              loading={businessResponse.loading}
              size={150}
              aria-label="Loading Spinner"
            />
          )}
        </div>

        {businesses && searchTerm?.length !== 0 ? (
          <>
            <p
              className={`${dashboardSearchStyles['search-status']} ${
                darkMode ? 'white' : 'black'
              }`}
            >
              Search results for &apos; <span>{searchTerm}</span> &apos;
            </p>
            <BusinessesSection businesses={filterData} />
          </>
        ) : (
          <p
            className={`${dashboardSearchStyles['error-message']} ${
              darkMode ? 'white' : 'black'
            }`}
          >
            Not available
          </p>
        )}
        {searchTerm.length !== 0 && businesses.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={maxPages}
            onChange={onClickPageHandler}
          />
        )}
      </div>
    </>
  );
};
export const DashboardSearchPage = withSearch(
  DashboardSearch
) as NextPageWithLayout;
export default DashboardSearchPage;
DashboardSearchPage.getLayout = withLayout();
