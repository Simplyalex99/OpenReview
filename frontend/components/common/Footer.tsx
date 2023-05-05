import FooterStyles from '../../styles/components/Footer.module.scss';
import { useAppSelector } from '../../hooks/redux/useReduxHooks';
import { YoutubeSVG } from '../svg/icons/Youtube';
import { MediumSVG } from '../svg/icons/Medium';
import { GithubSVG } from '../svg/icons/Github';
import { NavItem, links, socialMediaLinks as iconLinks } from './Navbar';

export const Footer = () => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  return (
    <footer
      className={`${FooterStyles.footer} ${
        darkMode ? 'bg-dark' : FooterStyles['footer-bg']
      }
}`}
    >
      <div className={FooterStyles['footer-wrapper']}>
        <div className={FooterStyles['footer-icons']}>
          <NavItem href={iconLinks.YOUTUBE}>
            <YoutubeSVG
              className={`${
                darkMode
                  ? FooterStyles['footer-icon-light-bg']
                  : FooterStyles['footer-icon-dark-bg']
              } ${FooterStyles['footer-icon']}`}
            />
          </NavItem>
          <NavItem href={iconLinks.GITHUB}>
            <GithubSVG
              className={`${
                darkMode
                  ? FooterStyles['footer-icon-light-bg']
                  : FooterStyles['footer-icon-dark-bg']
              } ${FooterStyles['footer-icon']}`}
            />
          </NavItem>
          <NavItem href={iconLinks.MEDIUM}>
            <MediumSVG
              className={`${
                darkMode
                  ? FooterStyles['footer-icon-light-bg']
                  : FooterStyles['footer-icon-dark-bg']
              } ${FooterStyles['footer-icon']}`}
            />
          </NavItem>
        </div>
        <div
          className={`${FooterStyles['footer-links']} ${
            darkMode ? 'white' : 'black'
          }`}
        >
          <NavItem href={links.HOME}>
            <p className={FooterStyles['footer-link']}>Home</p>
          </NavItem>
          <NavItem href={links.ABOUT}>
            <p className={FooterStyles['footer-link']}>About</p>
          </NavItem>
          <NavItem href={links.DASHBOARD}>
            <p className={FooterStyles['footer-link']}>Dashboard</p>
          </NavItem>
        </div>
        <p
          className={`${FooterStyles['footer-copyright']} ${
            darkMode ? 'white' : 'black'
          }`}
        >
          © 2022 OpenReview
        </p>
      </div>
    </footer>
  );
};
export default Footer;
