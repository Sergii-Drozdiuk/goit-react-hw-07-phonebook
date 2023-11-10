import { createSlice } from '@reduxjs/toolkit';
import { initialData } from '../InitialData';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialData.filterValue,
  reducers: {
    changeFilter(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const getFilter = state => state.filter;
export const filterReducer = filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;
