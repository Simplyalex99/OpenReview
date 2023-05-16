import { useAppSelector } from '../../hooks';
import recommendationStyles from '../../styles/components/Recommendation.module.scss';

interface RecommendationSectionProps {
  categories: Array<string>;
}
type TagProps = {
  category: string;
};

const Tag = ({ category }: TagProps) => {
  return (
    <span className={`${recommendationStyles.tag} text-center`}>
      {category}
    </span>
  );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const RecommendationSection = ({
  categories,
}: RecommendationSectionProps) => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  /*   const maxTagsToDisplay = 6;
  const lastIndex = Math.min(maxTagsToDisplay, categories.length);
  const tagsToDisplay = categories.slice(0, lastIndex); */
  const temp = ['a', 'b', 'c', 'd', 'e', 'f'];
  return (
    <section className={recommendationStyles.container}>
      <h2 className={`${darkMode ? 'white' : 'black'} text-center`}>
        Similar Products Genre
      </h2>
      {categories.length === 0 && (
        <p className={`${darkMode ? 'white' : 'black'} text-center`}>
          {' '}
          Not available
        </p>
      )}
      <div className={recommendationStyles['grid-container']}>
        {temp.map((category) => {
          return <Tag category={category} />;
        })}
      </div>
    </section>
  );
};
export default RecommendationSection;
