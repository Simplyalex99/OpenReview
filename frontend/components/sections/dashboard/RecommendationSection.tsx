type Business = {
  business_id: string;
  business_name: string;
  business_rating: number;
};
interface RecommendationSectionProps {
  businesses: Array<Business>;
  categories: Array<string>;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const RecommendationSection = (props: RecommendationSectionProps) => {};
export default RecommendationSection;
