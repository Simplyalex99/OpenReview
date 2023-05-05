import { useRef } from 'react';
import Image from 'next/image';
import homeStyles from '../styles/pages/Home.module.scss';
import {
  MouseSVG,
  DarkModeSVG,
  EatingReviewSVG,
  ReportSVG,
  AccentSVG,
  SquaresSVG,
  PrimaryLayout,
  NextPageWithLayout,
  NavItem,
  SEO,
} from '../components/index';
import {
  toggleDarkMode,
  toggleLightMode,
} from '../redux/actions/themeActionCreator';
import {
  useParallaxEffect,
  useAppSelector,
  useAppDispatch,
  useScrollOut,
} from '../hooks/index';

const Home: NextPageWithLayout = () => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useParallaxEffect(ref, {
    speed: 4,
    center: true,
    wrapper: '',
    round: true,
    vertical: true,
    horizontal: false,
  });
  useScrollOut({ options: { once: true } });

  const toggleHandler = () => {
    if (darkMode) {
      dispatch(toggleLightMode());
    } else {
      dispatch(toggleDarkMode());
    }
  };
  return (
    <>
      <SEO
        title="Home"
        description="Beautiful webdesign with rich business insight and dark mode"
      />
      <div className={`${homeStyles['hero-img-wrapper']}`}>
        <div
          className={`${
            darkMode
              ? homeStyles['hero-img-accent-dark-mode']
              : homeStyles['hero-img-accent-light-mode']
          }`}
        >
          <SquaresSVG />
        </div>
        <Image
          src="/images/experience.jpg"
          alt="road"
          layout="fill"
          objectFit="cover"
          className={homeStyles['hero-img']}
        />
      </div>

      <div className={homeStyles.wrapper}>
        <section className={`  ${homeStyles.hero} `}>
          <div ref={ref} className={homeStyles.parallax}>
            <p
              className={`${homeStyles['sub-heading']} ${
                darkMode
                  ? homeStyles['hero-content-dark-mode']
                  : homeStyles['hero-content-light-mode']
              }`}
            >
              Connecting you with the best services
            </p>
            <h1
              className={` ${
                darkMode
                  ? homeStyles['hero-content-dark-mode']
                  : homeStyles['hero-content-light-mode']
              } `}
            >
              {' '}
              <span
                className={`${
                  darkMode
                    ? homeStyles['heading-accent-dark-mode']
                    : homeStyles['heading-accent-light-mode']
                }`}
              >
                Experience
              </span>{' '}
              Satisfication
            </h1>
            <span
              className={`${homeStyles['accent-svg']} ${
                darkMode
                  ? homeStyles['accent-svg-dark-mode']
                  : homeStyles['accent-svg-light-mode']
              }  `}
            >
              <AccentSVG width="300" height="30" />
            </span>
            <NavItem href="/404">
              <div className={`${homeStyles['action-btn-wrapper']}`}>
                <button
                  type="button"
                  className={` ${homeStyles['action-btn']} ${
                    darkMode
                      ? homeStyles['action-btn-dark-mode']
                      : homeStyles['action-btn-light-mode']
                  }`}
                >
                  Find Reviews
                </button>
              </div>
            </NavItem>
            <div
              className={` text-center ${homeStyles['scroll-wrapper']} ${
                darkMode
                  ? homeStyles['scroll-dark-mode']
                  : homeStyles['scroll-light-mode']
              }`}
            >
              <p
                className={`${
                  darkMode
                    ? homeStyles['hero-content-dark-mode']
                    : homeStyles['hero-content-light-mode']
                }`}
              >
                scroll
              </p>
              <MouseSVG className={`  ${homeStyles.svg}`} />
            </div>
          </div>
        </section>

        <div>
          <section className={` ${homeStyles['more-info']}`}>
            <div
              data-scroll
              className={`${homeStyles.feature} ${homeStyles.left}`}
            >
              <EatingReviewSVG />
              <div
                className={`${homeStyles.content} ${
                  darkMode ? 'white' : 'dark'
                }`}
              >
                <p className={homeStyles.title}>Millions of reviews</p>
                <p className={homeStyles.description}>
                  Get all the information about business and products so that
                  you can connect with the best local businesses. Find many
                  reviews of your favorite restaurants and see what is trending
                  with the help from yelp&apos;s dataset.{' '}
                </p>
              </div>
            </div>
            <div
              data-scroll
              className={`${homeStyles.feature} ${homeStyles.right}`}
            >
              <DarkModeSVG />
              <div
                className={`${homeStyles.content} ${
                  darkMode ? 'white' : 'dark'
                }`}
              >
                <p className={homeStyles.title}>Dark & Light Mode</p>
                <p
                  className={`${homeStyles.description} ${homeStyles['darkmode-description']}`}
                >
                  Too bright? No problem try out the dark mode and pick the best
                  theme for you. To change themes, toggle the lightmode/darkmode
                  button on the navigation.
                </p>
                <button
                  type="button"
                  className={`${
                    darkMode
                      ? homeStyles['darkmode-btn']
                      : homeStyles['lightmode-btn']
                  }`}
                  onClick={toggleHandler}
                >
                  {' '}
                  Try it
                </button>
              </div>
            </div>
            <div
              data-scroll
              className={`${homeStyles.feature} ${homeStyles.left}  `}
            >
              <ReportSVG />
              <div
                className={`${homeStyles.content} ${
                  darkMode ? 'white' : 'dark'
                }`}
              >
                <p className={homeStyles.title}>Insight & feedback</p>
                <p className={homeStyles.description}>
                  Get an overview of local business and see how people feel
                  about their products, how businesses are trending over any
                  period of time, and more.
                </p>
                <NavItem href="/404">
                  <button
                    type="button"
                    className={`${
                      darkMode
                        ? homeStyles['darkmode-btn']
                        : homeStyles['lightmode-btn']
                    }`}
                  >
                    Let&apos;s start
                  </button>
                </NavItem>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
