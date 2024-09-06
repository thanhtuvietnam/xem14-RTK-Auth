import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../shared/constant';

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Cache-Control', 'max-age=3600'); // Cache for 1 hour
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHome: builder.query({
      query: () => 'home',
      keepUnusedDataFor: 300, // Keep data for 5 minutes
    }),
    getMovieRes: builder.query({
      query: (slug) => `phim/${slug}`,
      keepUnusedDataFor: 300,
    }),
    getPhimmoi: builder.query({
      query: (page = 1) => `danh-sach/phim-moi-cap-nhat?page=${page}`,
      keepUnusedDataFor: 300,
    }),
    getPhimbo: builder.query({
      query: (page = 1) => `danh-sach/phim-bo?page=${page}`,
      keepUnusedDataFor: 300,
    }),
    getPhimle: builder.query({
      query: (page = 1) => `danh-sach/phim-le?page=${page}`,
      keepUnusedDataFor: 300,
    }),
    getTVShows: builder.query({
      query: (page = 1) => `danh-sach/tv-shows?page=${page}`,
      keepUnusedDataFor: 300,
    }),
    getHoathinh: builder.query({
      query: (page = 1) => `danh-sach/hoat-hinh?page=${page}`,
      keepUnusedDataFor: 300,
    }),
    getMoviesByCategory: builder.query({
      query: ({ category, page = 1 }) => `danh-sach/${category}?page=${page}`,
      keepUnusedDataFor: 300,
    }),
    getCategories: builder.query({
      query: ({ category, genreName = '', page = 1 }) => `${category}/${genreName}?page=${page}`,
      keepUnusedDataFor: 300,
    }),
    getSearch: builder.query({
      query: ({ searchTerm, page = 1 }) => `tim-kiem?keyword=${encodeURIComponent(searchTerm)}&page=${page}`,
      keepUnusedDataFor: 60, // Keep search results for 1 minute
    }),
  }),
});

export const { useGetHomeQuery, useGetMovieResQuery, useGetPhimmoiQuery, useGetPhimboQuery, useGetPhimleQuery, useGetTVShowsQuery, useGetHoathinhQuery, useGetMoviesByCategoryQuery, useGetCategoriesQuery, useGetSearchQuery } = homeApi;
