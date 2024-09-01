
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theLoaiRTK: [],
  quocGiaRTK: [],
  type: '',
  slug: '',
};

const submenuSlice = createSlice({
  name: 'submenu',
  initialState,
  reducers: {
    addTheLoai: (state, action) => {
      state.theLoaiRTK = action.payload;
    },
    addQuocGia: (state, action) => {
      state.quocGiaRTK = action.payload;
    },
    addType: (state, action) => {
      state.type = action.payload;
    },
    addSlug: (state, action) => {
      state.slug = action.payload;
    },
    clearType: (state) => {
      state.type = '';
    },
    clearSlug: (state) => {
      state.slug = '';
    },
  },
});
export const { addTheLoai, addQuocGia, addType, clearType, addSlug, clearSlug } = submenuSlice.actions;

export default submenuSlice.reducer;
