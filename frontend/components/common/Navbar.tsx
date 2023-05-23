import React, { useState } from 'react';
import Link, { LinkProps } from 'next/link';
import Switch from 'react-switch';
import { HamburgerMenuSVG } from '../svg/common/HamburgerMenu';
import { CloseSVG } from '../svg/common/Close';
import navbarStyles from '../../styles/components/Navbar.module.scss';
import {
  toggleDarkMode,
  toggleLightMode,
} from '../../redux/actions/themeActionCreator';
import {
  useToggleNavbarMenu,
  useAppSelector,
  useAppDispatch,
} from '../../hooks/index';
import homeStyles from '../../styles/pages/Home.module.scss';
import { UrlPages } from '../../enums/types';

export type NavItemProps = {
  href: string;
  children: React.ReactNode;
};
export const NavItem = (props: NavItemProps & LinkProps) => {
  const { children } = props;
  return <Link {...props}>{children}</Link>;
};

export enum ActiveTabType {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  DASHBOARD = 'DASHBOARD',
}

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
  const [activeTab, setActiveTab] = useState(ActiveTabType.HOME);
  const getIsActive = (type: ActiveTabType) => {
    return activeTab === type ? navbarStyles['active-tab'] : '';
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
            role="presentation"
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

          <NavItem href={UrlPages.HOME_PATH}>
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
            role="presentation"
            id="close"
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
            <NavItem href={UrlPages.HOME_PATH}>
              <div
                role="presentation"
                onClick={() => setActiveTab(ActiveTabType.HOME)}
                className={`${navbarStyles['nav-item-wrapper']}`}
              >
                <button
                  type="button"
                  className={`${getIsActive(ActiveTabType.HOME)} ${
                    navbarStyles['nav-item']
                  } ${darkMode ? 'white' : 'black'}`}
                >
                  <span>{ActiveTabType.HOME}</span>
                </button>
              </div>
            </NavItem>
            <NavItem href="/404">
              <div
                role="presentation"
                onClick={() => setActiveTab(ActiveTabType.ABOUT)}
                className={`${navbarStyles['nav-item-wrapper']} `}
              >
                <button
                  type="button"
                  className={`${getIsActive(ActiveTabType.ABOUT)} ${
                    navbarStyles['nav-item']
                  } ${darkMode ? 'white' : 'black'} `}
                >
                  <span> {ActiveTabType.ABOUT}</span>{' '}
                </button>
              </div>
            </NavItem>
            <NavItem href={UrlPages.DASHBOARD_SEARCH_PATH}>
              <div
                onClick={() => setActiveTab(ActiveTabType.DASHBOARD)}
                role="presentation"
                className={`${navbarStyles['nav-item-wrapper']}`}
              >
                <button
                  type="button"
                  className={`${getIsActive(ActiveTabType.DASHBOARD)} ${
                    navbarStyles['nav-item']
                  } ${darkMode ? 'white' : 'black'} `}
                >
                  <span> {ActiveTabType.DASHBOARD} </span>
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
