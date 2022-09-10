import { THEME_ACTION_TYPES } from '../actions/themeActionTypes';

type actionPayloadProps = {
  darkMode: boolean;
};
type actionProps = {
  type: string;
  payload: actionPayloadProps;
};
type stateProps = {
  darkMode: boolean;
};
export function themeReducer(
  state: stateProps = { darkMode: false },
  action: actionProps
) {
  switch (action.type) {
    case THEME_ACTION_TYPES.TOGGLE_LIGHT_MODE:
      return { darkMode: false };
    case THEME_ACTION_TYPES.TOGGLE_DARK_MODE:
      return { darkMode: true };
    default:
      return state;
  }
}
