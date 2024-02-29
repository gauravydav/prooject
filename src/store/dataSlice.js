// store/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit'; // Import nanoid for generating unique IDs

const initialState = {
  dataList: [],
};




export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.dataList = action.payload;
    },
    addData: (state, action) => {
      const newItem = { ...action.payload }; // Generate unique ID for the new item
      state.dataList.push(newItem);
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

export const { setData, addData, updateData, deleteData } = dataSlice.actions;

export default dataSlice.reducer;
