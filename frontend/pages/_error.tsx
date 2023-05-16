'use client';

import { NextPageContext } from 'next';
import errorStyles from '../styles/pages/500.module.scss';
import {
  NavItem,
  ServerErrorSVG,
  DownArrowSVG,
  Button,
  withLayout,
} from '../components';
import { useAppSelector } from '../hooks/index';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  return (
    <div className={errorStyles.wrapper}>
      <section className={errorStyles['error-illustration-wrapper']}>
        <ServerErrorSVG />
      </section>
      <section className={errorStyles.content}>
        <h1 className={`${errorStyles.title} ${darkMode ? 'white' : 'black'}`}>
          <span>Oops! </span>Something went wrong
        </h1>
        <p> Error: {error.message}</p>
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
        <Button
          className={` ${errorStyles['action-btn']} ${
            darkMode
              ? errorStyles['action-btn-dark-mode']
              : errorStyles['action-btn-light-mode']
          }`}
          type="button"
          onClick={reset}
        >
          Try again
        </Button>
      </section>
    </div>
  );
};
Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
Error.getLayout = withLayout();
