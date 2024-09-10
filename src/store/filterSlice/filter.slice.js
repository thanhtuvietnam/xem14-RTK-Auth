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
    recommendMoviesWatch: [],
    excludeItems: [],
  },
  reducers: {
    setFilterValues: (state, action) => {
      state.filterValues = action.payload;
    },

    setRecommendMovies: (state, action) => {
      state.recommendMovies = action.payload;
    },
    setRecommendMoviesWatch: (state, action) => {
      state.recommendMoviesWatch = action.payload;
    },
    setExcludeItems: (state, action) => {
      state.excludeItems = action.payload;
    },
    clearRecommendMovies(state) {
      state.recommendMovies = [];
    },
  },
});
export const { setFilterValues, setRecommendMovies, setRecommendMoviesWatch, clearRecommendMovies, setExcludeItems } = filterSlice.actions;
export default filterSlice.reducer;
