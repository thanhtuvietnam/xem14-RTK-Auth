import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Loading: false,
  Error: false,
  activeOther: null,
  activeButton: null,
};

const loadingSlice = createSlice({
  name: 'loadingState',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.Loading = action.payload;
    },
    setError: (state, action) => {
      state.Error = action.payload;
    },
    setActiveOther: (state, action) => {
      state.activeOther = action.payload;
    },
    setActiveButton: (state, action) => {
      state.activeButton = action.payload;
    },
  },
});

export const { setLoading, setError, setActiveOther, setActiveButton } = loadingSlice.actions;

export default loadingSlice.reducer;
