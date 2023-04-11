import { useEffect } from 'react';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper, store } from '../redux/store';
import { useAppSelector } from '../hooks/index';
import { NextPageWithLayout } from '../components';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  useEffect(() => {
    document
      ?.querySelector('body')
      ?.classList.add(darkMode ? 'black-bg' : 'white-bg');

    return () => {
      document
        ?.querySelector('body')
        ?.classList.remove(darkMode ? 'black-bg' : 'white-bg');
    };
  }, [darkMode]);
  return (
    <div>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </div>
  );
};

export default wrapper.withRedux(MyApp);
