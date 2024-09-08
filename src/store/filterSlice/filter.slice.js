import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filterData: null,
    filterValues: {
      timeSort: '',
      movieSort: '',
      theLoaiSort: '',
      quocGiaSort: '',
      yearSort: '',
      pageSort: 1,
    },
  },
  reducers: {
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    setFilterValues: (state, action) => {
      state.filterValues = action.payload;
    },
  },
});
export const { setFilterData, setFilterValues } = filterSlice.actions;
export default filterSlice.reducer;
