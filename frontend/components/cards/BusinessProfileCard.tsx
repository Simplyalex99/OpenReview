import Image from 'next/image';
import Link from 'next/link';
import { Rating } from '../others/Rating';
import businessProfileCardStyles from '../../styles/components/BusinessProfileCard.module.scss';
import { Card } from './Card';
import { RightArrowSVG } from '../svg/other/RightArrow';
import { useAppSelector } from '../../hooks';

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
}: BusinessProfileCardProps) => {
  const maxTags = Math.max(2, categoryTags.length) as number;
  const categories = categoryTags.slice(0, maxTags);
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  const color = darkMode ? '#6C63FF' : '#602BF8';
  return (
    <Card
      style={`${businessProfileCardStyles['card-container']} ${
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
              <button
                type="button"
                className={`${businessProfileCardStyles.tags} ${
                  darkMode
                    ? businessProfileCardStyles['tags-dark']
                    : businessProfileCardStyles['tags-light']
                }`}
              >
                {category}
              </button>
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
            <Link href={dashboardUrl}>
              <p className={businessProfileCardStyles['action-btn']}>
                Select Option
              </p>
            </Link>

            <Link href={businessUrl}>
              <p className={businessProfileCardStyles.link}>
                Visit Webpage: <RightArrowSVG width="20" height="20" />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default BusinessProfileCard;
