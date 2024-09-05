import { configureStore } from '@reduxjs/toolkit';
import { homeApi } from './apiSlice/homeApi.slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import loadingReducer from './mainSlice/LoadingSlice/loadingSlice';
import searchReducer from './searchSlice/searchSlice';
import submenuReducer from './mainSlice/SubmenuSlice/submenuSlice';
import authReducer from './Auth/auth.slice';
import bookmarksReducer from './bookmarks/bookmarks.slice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    submenu: submenuReducer,
    search: searchReducer,
    loadingState: loadingReducer,
    [homeApi.reducerPath]: homeApi.reducer,
    bookmarks: bookmarksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(homeApi.middleware),
});

setupListeners(store.dispatch);
