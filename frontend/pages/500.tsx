import errorStyles from '../styles/pages/500.module.scss';
import {
  NavItem,
  ServerErrorSVG,
  DownArrowSVG,
  PrimaryLayout,
  NextPageWithLayout,
} from '../components';
import { useAppSelector } from '../hooks/index';

const ServerErrorPage: NextPageWithLayout = () => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  return (
    <div className={errorStyles.wrapper}>
      <section
        className={`${errorStyles['error-illustration-wrapper']} ${
          darkMode
            ? errorStyles['error-illustration-dark']
            : errorStyles['error-illustration-light']
        }`}
      >
        <ServerErrorSVG />
      </section>
      <section className={errorStyles.content}>
        <h1 className={`${errorStyles.title} ${darkMode ? 'white' : 'black'}`}>
          <span>Oops! </span>Something went wrong
        </h1>
        <div className={errorStyles['status-code-wrapper']}>
          <p
            className={`${errorStyles['status-code']} ${
              darkMode
                ? errorStyles['status-code-dark']
                : errorStyles['status-code-light']
            }`}
          >
            500
          </p>
        </div>
        <p
          className={`${errorStyles['sub-heading']}  ${
            darkMode ? 'white' : 'black'
          }`}
        >
          Maybe you can find what you need here?
        </p>{' '}
        <DownArrowSVG
          className={`${errorStyles['down-arrow']} ${
            darkMode ? errorStyles['white-arrow'] : errorStyles['black-arrow']
          }`}
        />
        <NavItem href="/">
          <p
            className={`${errorStyles['redirect-link']}  ${
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
export default ServerErrorPage;
ServerErrorPage.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
