import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { allReducers } from './reducers/index';
import { createWrapper } from 'next-redux-wrapper';

const middleware: Array<any> = [thunk];

export const store = createStore(
  allReducers,

  composeWithDevTools(applyMiddleware(...middleware))
);
const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
