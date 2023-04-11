import { useEffect } from 'react';

export const usePosition = () => {
  const coordinates = { latitude: 0, longitude: 0 };
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        coordinates.latitude = position.coords.latitude;
        coordinates.longitude = position.coords.longitude;
      });
    }
  }, []);
  return coordinates;
};
export default usePosition;
