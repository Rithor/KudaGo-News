import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export enum Version {
  mobile,
  desktop,
}

const getVersion = (): Version =>
  window.innerWidth < 1024 ? Version.mobile : Version.desktop;

export const useAdaptive = (): {
  isMobile: boolean;
  isDesktop: boolean;
} => {
  const [version, setVersion] = useState(getVersion());
  const handleResize = throttle(() => {
    setVersion(getVersion());
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile: version === Version.mobile,
    isDesktop: version === Version.desktop,
  };
};
