import { useMediaQuery } from 'react-responsive';

export const RESOLUTION_QUERY = {
  TABLET: { query: '(min-width: 768px)' },
  DESKTOP: { query: '(min-width: 1280px)' },
};

export const SCREENS = {
  mobile: 'mobile',
  tablet: 'tablet',
  desktop: 'desktop',
};

export const useScreenSize = (): 'desktop' | 'tablet' | 'mobile' => {
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  if (isTablet && !isDesktop) {
    return 'tablet';
  }

  if (isDesktop) {
    return 'desktop';
  }

  return 'mobile';
};
