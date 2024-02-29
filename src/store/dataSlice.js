// store/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataList: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.dataList.push(action.payload);
    },
    updateData: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.dataList.findIndex(data => data.id === id);
      if (index !== -1) {
        state.dataList[index] = { ...state.dataList[index], ...newData };
      }
    },
    deleteData: (state, action) => {
      const id = action.payload;
      state.dataList = state.dataList.filter(data => data.id !== id);
    },
  },
});

export const { addData, updateData, deleteData } = dataSlice.actions;

export default dataSlice.reducer;
