// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

const store = configureStore({
  reducer: {
    dataList: dataReducer,
  },
});

export default store;
