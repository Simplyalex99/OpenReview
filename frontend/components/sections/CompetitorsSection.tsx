import { useState } from 'react';
import { useAppSelector, usePaginationHelper } from '../../hooks';
import { BusinessProfileCard } from '../shared/BusinessProfileCard';
import { Pagination } from '../utils/PaginationComponent';
import competitorStyles from '../../styles/components/Competitors.module.scss';

type businessesProps = {
  business_id: string;
  business_name: string;
  business_rating: number;
  address: string;
  city: string;
  total_reviews: number;
  category: string;
  url: string;
  img_url: string;
};
interface CompetitorsSectionProps {
  businesses: businessesProps[];
}
export const CompetitorsSection = ({ businesses }: CompetitorsSectionProps) => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  const [currentPage, setCurrentPage] = useState(1);
  const onClickPageHandler = (page: number) => {
    setCurrentPage(page);
  };
  const competitorsPerPage = 3;

  const {
    filterData,
    maxPages,
  }: { filterData: businessesProps[]; maxPages: number } = usePaginationHelper(
    competitorsPerPage,
    currentPage,
    businesses
  );
  return (
    <section>
      <div className={`text-center ${darkMode ? 'white' : 'black'}`}>
        <h2 className={competitorStyles.heading}>Competitors</h2>
        {businesses.length === 0 && <p>Not available</p>}
      </div>
      <div className={competitorStyles['grid-container']}>
        {filterData.map((business) => {
          const {
            business_id,
            business_name,
            business_rating,
            address,
            city,
            total_reviews,
            category,
            url,
            img_url,
          } = business;
          return (
            <BusinessProfileCard
              title={business_name}
              imgUrl={img_url}
              reviewCount={total_reviews}
              averageRating={business_rating}
              businessUrl={url}
              categoryTags={[category]}
              address={address}
              city={city}
              dashboardUrl={`/dashboard/${business_id}`}
              isResponsive={false}
            />
          );
        })}
      </div>
      {businesses.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={maxPages}
          onChange={onClickPageHandler}
        />
      )}
    </section>
  );
};

export default CompetitorsSection;
