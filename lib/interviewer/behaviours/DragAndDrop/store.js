import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from '../../ducks/middleware/logger';
import reducer from './reducer';

const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});

export default store;
