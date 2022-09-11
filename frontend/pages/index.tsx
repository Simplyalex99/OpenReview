import { useRef } from 'react';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.scss';
import {
  MouseSVG,
  DarkModeSVG,
  EatingReviewSVG,
  ReportSVG,
  AccentSVG,
  PrimaryLayout,
  NextPageWithLayout,
  NavItem,
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
    speed: 7,
    center: true,
    wrapper: '',
    round: true,
    vertical: true,
    horizontal: false,
  });
  useScrollOut({});

  const toggleHandler = () => {
    if (darkMode) {
      dispatch(toggleLightMode());
    } else {
      dispatch(toggleDarkMode());
    }
  };
  return (
    <>
      <div className={`${homeStyles['hero-img-wrapper']}`}>
        <Image
          src="/images/editorial.jpg"
          alt="road"
          layout="fill"
          objectFit="cover"
          className={homeStyles['hero-img']}
        />
      </div>

      <div className={homeStyles.wrapper}>
        <section className={`  ${homeStyles.hero} `}>
          <div ref={ref} className={homeStyles.parallax}>
            <p className={homeStyles['sub-heading']}>
              Connecting you with the best services
            </p>
            <h1>Experience Satisfication</h1>
            <span className={`  ${homeStyles['accet-svg']} `}>
              <AccentSVG
                className={`${homeStyles['accent-svg']}  `}
                width="300"
                height="30"
              />
            </span>
            <NavItem url="/404">
              <div className={`${homeStyles['action-btn-wrapper']}`}>
                <button
                  type="button"
                  className={` ${homeStyles['action-btn']}`}
                >
                  Find Reviews
                </button>
              </div>
            </NavItem>
            <div className={` text-center ${homeStyles['scroll-wrapper']}`}>
              <p className="">scroll</p>
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
                <NavItem url="/404">
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
