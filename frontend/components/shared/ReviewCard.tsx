import Image from 'next/image';
import Link from 'next/link';
import { DefaultUserImage } from '../others/DefaultUserImage';
import { LargeCard } from '../cards/LargeCard';
import { Rating } from '../others/Rating';
import { Button } from '../common/Button';
import reviewStyles from '../../styles/components/ReviewCard.module.scss';

type ReviewCardProps = {
  darkMode: boolean;
  categories: Array<string>;
  text: string;
  rating: number;
  time_created: string;
  user: {
    id: string;
    profile_url: string;
    image_url: string;
    name: string;
  };
};
export const ReviewCard = ({
  darkMode,
  categories,

  text,
  rating,
  time_created,
  user,
}: ReviewCardProps) => {
  const { name, profile_url, image_url } = user;
  const color = darkMode ? '#6C63FF' : '#602BF8';

  let userImage = <DefaultUserImage className={reviewStyles['user-img']} />;
  if (image_url && image_url !== null) {
    userImage = (
      <Image
        loader={() => image_url}
        src={image_url}
        alt="business image"
        layout="fill"
        objectFit="cover"
        className={reviewStyles['user-img']}
      />
    );
  }
  return (
    <LargeCard
      className={`${reviewStyles['card-container']} ${
        darkMode ? 'dark-bg' : 'white-bg'
      }`}
    >
      <div className={`${reviewStyles['flex-container']}`}>
        <div className={`${reviewStyles['img-wrapper']}`}>{userImage}</div>
        <div className={reviewStyles.content}>
          <p className={`${reviewStyles.name} ${darkMode ? 'white' : 'black'}`}>
            {name}
          </p>
          <p className={reviewStyles.date}>{time_created}</p>
          <div className={reviewStyles['rating-wrapper']}>
            <Rating
              count={5}
              value={rating}
              edit={false}
              color={color}
              activeColor={color}
              size={25}
              className={reviewStyles.rating}
            />
          </div>

          {categories.map((category) => {
            return (
              <Button
                type="button"
                className={`${reviewStyles.tags} ${
                  darkMode
                    ? reviewStyles['tags-dark']
                    : reviewStyles['tags-light']
                }`}
              >
                {category}
              </Button>
            );
          })}
          <p className={`${reviewStyles.text}`}>
            {text}
            <span
              className={`${reviewStyles.link} ${
                darkMode ? 'warm-blue' : 'dark-blue'
              }`}
            >
              {profile_url !== null && (
                <Link href={profile_url}> read more</Link>
              )}
            </span>
          </p>
        </div>
      </div>
    </LargeCard>
  );
};

export default ReviewCard;
