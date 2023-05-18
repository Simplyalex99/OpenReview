import { useAppSelector } from '../../hooks';

interface HeadingSectionProps {
  businessName: string | undefined;
  businessAddress: string | undefined;
}

export const HeadingSection = ({
  businessName,
  businessAddress,
}: HeadingSectionProps) => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;

  return (
    <section className={`${darkMode ? 'white' : 'black'} text-center`}>
      <h2>{businessName}</h2>
      <p>{businessAddress}</p>
    </section>
  );
};

export default HeadingSection;
/*

first option:
add grid container  in section component and check if array is empty in each file
remove section from id and add it to individual files

*/
