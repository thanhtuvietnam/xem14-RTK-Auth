import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchKey: '',
  page: 1,
  currentPage: 1,
  totalItems: 0,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    clearSearchKey: (state) => {
      state.searchKey = '';
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
  },
});

export const { setSearchKey, clearSearchKey, setPage, setCurrentPage, setTotalItems } = searchSlice.actions;

export default searchSlice.reducer;
