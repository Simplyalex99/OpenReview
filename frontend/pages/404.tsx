import pageNotFoundStyles from '../styles/pages/404.module.scss';
import {
  NavItem,
  PageNotFoundSVG,
  DownArrowSVG,
  PrimaryLayout,
  NextPageWithLayout,
} from '../components';
import { useAppSelector } from '../hooks/index';

const NotFoundPage: NextPageWithLayout = () => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  return (
    <div className={pageNotFoundStyles.wrapper}>
      <section className={pageNotFoundStyles['error-illustration-wrapper']}>
        <PageNotFoundSVG />
      </section>
      <section className={pageNotFoundStyles.content}>
        <h1
          className={`${pageNotFoundStyles.title} ${
            darkMode ? 'white' : 'black'
          }`}
        >
          <span>Oops! </span>We couldn&apos;t find that page.
        </h1>
        <p
          className={`${pageNotFoundStyles['sub-heading']}  ${
            darkMode ? 'white' : 'black'
          }`}
        >
          Maybe you can find what you need here?
        </p>{' '}
        <DownArrowSVG
          className={`${pageNotFoundStyles['down-arrow']} ${
            darkMode
              ? pageNotFoundStyles['white-arrow']
              : pageNotFoundStyles['black-arrow']
          }`}
        />
        <NavItem url="/">
          <p
            className={`${pageNotFoundStyles['redirect-link']}  ${
              darkMode ? 'white' : 'black'
            }`}
          >
            Go to home
          </p>
        </NavItem>
      </section>
    </div>
  );
};
export default NotFoundPage;
NotFoundPage.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
