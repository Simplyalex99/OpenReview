import { THEME_ACTION_TYPES } from './themeActionTypes';

export const toggleLightMode = () => {
  return {
    type: THEME_ACTION_TYPES.TOGGLE_LIGHT_MODE,
    payload: {
      darkMode: true,
    },
  };
};
export const toggleDarkMode = () => {
  return {
    type: THEME_ACTION_TYPES.TOGGLE_DARK_MODE,
    payload: {
      darkMode: false,
    },
  };
};
