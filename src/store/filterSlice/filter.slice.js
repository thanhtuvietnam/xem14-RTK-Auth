import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filterValues: {
      timeSort: '',
      movieSort: '',
      theLoaiSort: '',
      quocGiaSort: '',
      yearSort: '',
      pageSort: 1,
    },
    recommendMovies: [],
    isSortFetching: false, // Thêm isSortFetching vào initialState
    bothFetchingComplete: false, // Thêm bothFetchingComplete vào initialState
  },
  reducers: {
    setFilterValues: (state, action) => {
      state.filterValues = action.payload;
    },

    setRecommendMovies: (state, action) => {
      state.recommendMovies = action.payload;
    },
    clearRecommendMovies(state) {
      state.recommendMovies = [];
    },
    setSortFetching: (state, action) => {
      // Thêm reducer setSortFetching
      state.isSortFetching = action.payload;
    },
    setBothFetchingComplete: (state, action) => {
      // Thêm reducer setBothFetchingComplete
      state.bothFetchingComplete = action.payload;
    },
  },
});
export const { setFilterValues, setRecommendMovies, clearRecommendMovies, setSortFetching, setBothFetchingComplete } = filterSlice.actions;
export default filterSlice.reducer;
