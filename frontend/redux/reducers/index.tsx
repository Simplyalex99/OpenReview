import { combineReducers } from 'redux';
import { themeReducer } from './themeReducer';

export const allReducers = combineReducers({ themeReducer });
