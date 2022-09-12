import { useEffect } from 'react';
import stickyNavigationStyle from '../../styles/StickyNavigation.module.scss';

interface StickyNavigationProps {
  navbarId: string;
  dependencies?: any[];
}
export const useStickyNavigation = ({
  navbarId,
  dependencies,
}: StickyNavigationProps) => {
  let lastScroll = 0;
  useEffect(() => {
    if (process.browser) {
      const navbar = document.getElementById(navbarId);
      if (!navbar?.classList.contains(stickyNavigationStyle['sticky-navbar'])) {
        navbar?.classList.add(stickyNavigationStyle['sticky-navbar']);
      }
      const listener = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
          navbar?.classList.remove(stickyNavigationStyle['scroll-up']);
          return;
        }
        if (
          currentScroll > lastScroll &&
          !navbar?.classList.contains('scroll-down')
        ) {
          navbar?.classList.remove(stickyNavigationStyle['scroll-up']);
          navbar?.classList.add(stickyNavigationStyle['scroll-down']);
        } else if (
          currentScroll < lastScroll &&
          navbar?.classList.contains(stickyNavigationStyle['scroll-down'])
        ) {
          navbar?.classList.remove(stickyNavigationStyle['scroll-down']);
          navbar?.classList.add(stickyNavigationStyle['scroll-up']);
        }
        lastScroll = currentScroll;
      };

      window?.addEventListener('scroll', listener);
      return () => {
        window?.removeEventListener('scroll', listener);
      };
    }
  }, [dependencies]);
};
export default useStickyNavigation;
