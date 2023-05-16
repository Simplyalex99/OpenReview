import Image from 'next/image';
import Link from 'next/link';
import { Rating } from '../others/Rating';
import businessProfileCardStyles from '../../styles/components/BusinessProfileCard.module.scss';
import responsiveStyles from '../../styles/components/BusinessProfileCardResponsive.module.scss';
import { Card } from '../cards/Card';
import { RightArrowSVG } from '../svg/other/RightArrow';
import { useAppSelector } from '../../hooks';
import { Button } from '../common/Button';
import { SmallCard } from '../cards/SmallCard';

interface BusinessProfileCardProps {
  title: string;
  imgUrl: string;
  reviewCount: number;
  averageRating: number;
  businessUrl: string;
  categoryTags: Array<string>;
  address: string;
  city: string;
  dashboardUrl: string;
  isResponsive: boolean;
}
// try using  usestate to verify reactstar not updating else its our code
export const BusinessProfileCard = ({
  title,
  imgUrl,
  reviewCount,
  averageRating,
  businessUrl,
  categoryTags,
  address,
  city,
  dashboardUrl,
  isResponsive,
}: BusinessProfileCardProps) => {
  const maxTags = Math.max(2, categoryTags.length) as number;
  const categories = categoryTags.slice(0, maxTags);
  const sampleCategory = categories.length > 0 ? categories[0] : '';
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  const color = darkMode ? '#6C63FF' : '#602BF8';
  if (isResponsive) {
    return (
      <Card
        className={`${responsiveStyles['card-container']} ${
          darkMode ? 'dark-bg' : 'white-bg'
        }`}
      >
        <div className={`${responsiveStyles['flex-container']}`}>
          <div className={`${responsiveStyles['business-img-wrapper']}`}>
            <Image
              loader={() => imgUrl}
              src={imgUrl}
              alt="business image"
              layout="fill"
              objectFit="cover"
              className={responsiveStyles['business-img']}
            />
          </div>
          <div className={responsiveStyles.content}>
            <p
              className={`${responsiveStyles.title} ${
                darkMode ? 'white' : 'black'
              }`}
            >
              {title}
            </p>
            <div className={responsiveStyles['rating-wrapper']}>
              <Rating
                count={5}
                value={averageRating}
                edit={false}
                color={color}
                activeColor={color}
                size={25}
                className={responsiveStyles.rating}
              />
              <p
                className={`${responsiveStyles['review-count']} ${
                  darkMode ? 'white' : responsiveStyles['review-count-light']
                }`}
              >
                {reviewCount}
              </p>
            </div>

            {categories.map((category) => {
              return (
                <Button
                  type="button"
                  className={`${responsiveStyles.tags} ${
                    darkMode
                      ? responsiveStyles['tags-dark']
                      : responsiveStyles['tags-light']
                  }`}
                >
                  {category}
                </Button>
              );
            })}
            <p
              className={`${responsiveStyles.address} ${
                darkMode ? 'white' : 'black'
              }`}
            >
              <span>Address: </span>
              {address}, {city}
            </p>
            <div className={responsiveStyles['links-container']}>
              <Link
                href={{
                  pathname: dashboardUrl,
                  query: { category: sampleCategory, name: title, address },
                }}
              >
                <p
                  className={`${responsiveStyles['action-btn']} ${
                    darkMode ? 'warm-blue-bg' : 'dark-blue-bg'
                  }`}
                >
                  Select Option
                </p>
              </Link>

              <Link href={businessUrl}>
                <p
                  className={`${responsiveStyles.link} ${
                    darkMode ? 'warm-blue' : 'dark-blue'
                  }`}
                >
                  Visit Webpage: <RightArrowSVG width="20" height="20" />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  return (
    <SmallCard
      className={` ${businessProfileCardStyles['card-container']} ${
        darkMode ? 'dark-bg' : 'white-bg'
      }`}
    >
      <div className={`${businessProfileCardStyles['flex-container']}`}>
        <div className={`${businessProfileCardStyles['business-img-wrapper']}`}>
          <Image
            loader={() => imgUrl}
            src={imgUrl}
            alt="business image"
            layout="fill"
            objectFit="cover"
            className={businessProfileCardStyles['business-img']}
          />
        </div>
        <div className={businessProfileCardStyles.content}>
          <p
            className={`${businessProfileCardStyles.title} ${
              darkMode ? 'white' : 'black'
            }`}
          >
            {title}
          </p>
          <div className={businessProfileCardStyles['rating-wrapper']}>
            <Rating
              count={5}
              value={averageRating}
              edit={false}
              color={color}
              activeColor={color}
              size={25}
              className={businessProfileCardStyles.rating}
            />
            <p
              className={`${businessProfileCardStyles['review-count']} ${
                darkMode
                  ? 'white'
                  : businessProfileCardStyles['review-count-light']
              }`}
            >
              {reviewCount}
            </p>
          </div>

          {categories.map((category) => {
            return (
              <Button
                type="button"
                className={`${businessProfileCardStyles.tags} ${
                  darkMode
                    ? businessProfileCardStyles['tags-dark']
                    : businessProfileCardStyles['tags-light']
                }`}
              >
                {category}
              </Button>
            );
          })}
          <p
            className={`${businessProfileCardStyles.address} ${
              darkMode ? 'white' : 'black'
            }`}
          >
            <span>Address: </span>
            {address}, {city}
          </p>
          <div className={businessProfileCardStyles['links-container']}>
            <Link
              href={{
                pathname: dashboardUrl,
                query: { category: sampleCategory, name: title, address },
              }}
            >
              <p
                className={`${businessProfileCardStyles['action-btn']} ${
                  darkMode ? 'warm-blue-bg' : 'dark-blue-bg'
                }`}
              >
                Select Option
              </p>
            </Link>

            <Link href={businessUrl}>
              <p
                className={`${businessProfileCardStyles.link} ${
                  darkMode ? 'warm-blue' : 'dark-blue'
                }`}
              >
                Visit Webpage: <RightArrowSVG width="20" height="20" />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </SmallCard>
  );
};
export default BusinessProfileCard;
