import React, { useState } from 'react';
import Link from 'next/link';
import Switch from 'react-switch';
import { HamburgerMenuSVG } from '../svg/common/HamburgerMenu';
import { CloseSVG } from '../svg/common/Close';
import navbarStyles from '../../styles/Navbar.module.scss';
import {
  toggleDarkMode,
  toggleLightMode,
} from '../../redux/actions/themeActionCreator';
import {
  useToggleNavbarMenu,
  useStickyNavigation,
  useAppSelector,
  useAppDispatch,
} from '../../hooks/index';
import homeStyles from '../../styles/Home.module.scss';

export interface NavItemProps {
  url: string;
  children: React.ReactNode;
}
export const NavItem = (props: NavItemProps) => {
  const { url, children } = props;
  return <Link href={url}>{children}</Link>;
};

export enum activeTabType {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  DASHBOARD = 'DASHBOARD',
}
export const links: { [key: string]: string } = {
  HOME: '/',
  ABOUT: '/',
  DASHBOARD: '/',
};
export const socialMediaLinks: { [key: string]: string } = {
  YOUTUBE: 'https://www.youtube.com/channel/UCGDWxLAOJIxCRSjsUSkpSeQ',
  MEDIUM:
    'https://medium.com/@alexm5492/linear-regression-from-scratch-3-methods-2e803d82137c',
  GITHUB: 'https://github.com/Simplyalex99/Simplyalex99/blob/main/README.md',
};

export const Navbar = () => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const dispatch = useAppDispatch();
  const { darkMode } = stateTheme;
  const [activeTab, setActiveTab] = useState(activeTabType.HOME);
  const getIsActive = (type: activeTabType) => {
    return activeTab === type ? navbarStyles['active-tab'] : '';
  };
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);
  const toggleMenuHandler = () => {
    setToggleMenu(false);
  };
  const closeHandler = () => {
    setToggleMenu(true);
  };
  const switchHandler = () => {
    if (darkMode) {
      dispatch(toggleLightMode());
    } else {
      dispatch(toggleDarkMode());
    }
  };
  const toggleProps = {
    menuId: 'menu-wrapper',
    closeId: 'close',
    navbarId: 'nav',
    className: navbarStyles['open-nav'],
  };

  useToggleNavbarMenu(toggleProps);
  useStickyNavigation({
    navbarId: 'navbar',
    state: [darkMode],
    disable: toggleMenu,
  });
  return (
    <div
      id="navbar"
      className={`${
        darkMode
          ? 'dark-gradient-bg'
          : `white-bg ${navbarStyles['drop-shadow']}`
      } ${navbarStyles['navbar-bg']}`}
    >
      <header
        className={`flex  ${homeStyles.wrapper} ${navbarStyles.container}`}
      >
        <div className={`flex ${navbarStyles['custom-link-wrapper']}`}>
          <div
            id="menu-wrapper"
            role="button"
            tabIndex={0}
            onClick={toggleMenuHandler}
            onKeyDown={toggleMenuHandler}
            className={`${
              darkMode
                ? navbarStyles['menu-wrapper-dark']
                : navbarStyles['menu-wrapper-white']
            }`}
          >
            <HamburgerMenuSVG
              className={`${navbarStyles['menu-icon']} ${
                darkMode ? 'white' : 'black'
              }`}
              width="35"
              height="35"
            />
          </div>

          <NavItem url={links.HOME}>
            <button
              type="button"
              className={` ${darkMode ? 'white' : 'dark'} ${
                navbarStyles['custom-link']
              }`}
            >
              OpenReview
            </button>
          </NavItem>
        </div>
        <nav
          id="nav"
          className={`${navbarStyles['nav-container']} 
                  ${darkMode ? 'dark-bg' : 'white-bg '}
              `}
        >
          <div
            role="button"
            onKeyDown={closeHandler}
            tabIndex={0}
            id="close"
            onClick={closeHandler}
            className={navbarStyles['close-icon-wrapper']}
          >
            <CloseSVG
              className={`${navbarStyles['close-icon']} ${
                darkMode
                  ? navbarStyles['close-icon-dark']
                  : navbarStyles['close-icon-light']
              }`}
            />
          </div>
          <div className={`${navbarStyles['links-wrapper']}`}>
            <NavItem url={links.HOME}>
              <div
                role="presentation"
                onClick={() => setActiveTab(activeTabType.HOME)}
                className={`${navbarStyles['nav-item-wrapper']}`}
              >
                <button
                  type="button"
                  className={`${getIsActive(activeTabType.HOME)} ${
                    navbarStyles['nav-item']
                  } ${darkMode ? 'white' : 'black'}`}
                >
                  <span>{activeTabType.HOME}</span>
                </button>
              </div>
            </NavItem>
            <NavItem url={links.ABOUT}>
              <div
                role="presentation"
                onClick={() => setActiveTab(activeTabType.ABOUT)}
                className={`${navbarStyles['nav-item-wrapper']} `}
              >
                <button
                  type="button"
                  className={`${getIsActive(activeTabType.ABOUT)} ${
                    navbarStyles['nav-item']
                  } ${darkMode ? 'white' : 'black'} `}
                >
                  <span> {activeTabType.ABOUT}</span>{' '}
                </button>
              </div>
            </NavItem>
            <NavItem url={links.DASHBOARD}>
              <div
                onClick={() => setActiveTab(activeTabType.DASHBOARD)}
                role="presentation"
                className={`${navbarStyles['nav-item-wrapper']}`}
              >
                <button
                  type="button"
                  className={`${getIsActive(activeTabType.DASHBOARD)} ${
                    navbarStyles['nav-item']
                  } ${darkMode ? 'white' : 'black'} `}
                >
                  <span> {activeTabType.DASHBOARD} </span>
                </button>
              </div>
            </NavItem>
            <div className={navbarStyles['toggle-container']}>
              <button type="button">
                <span className={darkMode ? 'white' : 'black'}>
                  {darkMode ? 'Darkmode' : 'Lightmode'}
                </span>
              </button>
              <Switch
                onColor="#2f2e41"
                offColor="#D4D4D4"
                onHandleColor="#D4D4D4"
                onChange={switchHandler}
                checked={darkMode}
                height={14}
                width={35}
                handleDiameter={12}
                className={navbarStyles['toggle-switch']}
              />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Navbar;
