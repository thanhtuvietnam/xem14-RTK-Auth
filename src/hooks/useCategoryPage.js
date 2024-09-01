import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppdispatch, useAppSelector } from '../store/hook';
import { useGetCategoriesQuery } from '../store/apiSlice/homeApi.slice';
import { setError } from '../store/mainSlice/LoadingSlice/loadingSlice';
import { addSlug, addType } from '../store/mainSlice/SubmenuSlice/submenuSlice';

export const useCategoryPage = () => {
  const selectedSlug = useAppSelector((state) => state.submenu.slug);
  const selectedType = useAppSelector((state) => state.submenu.type);
  const page = useAppSelector((state) => state.search.page);

  const location = useLocation();
  const dispatch = useAppdispatch();

  useEffect(() => {
    const { slug, type } = location.state || {};
    if (slug && type) {
      dispatch(addType(type));
      dispatch(addSlug(slug));
    }
  }, [location.state, dispatch]);

  const { data: categoryRes, isLoading, isFetching, isError, error } = useGetCategoriesQuery(
    { category: selectedType, genreName: selectedSlug, page },
    { skip: !selectedSlug || !selectedType }
  );

  useEffect(() => {
    if (isError && error) {
      console.error(error);
      dispatch(setError(true));
    }
  }, [isError, error, dispatch]);

  return {
    titlePage: categoryRes?.data?.titlePage,
    totalPages: categoryRes?.data?.params?.pagination?.totalItems,
    dataResults: categoryRes?.data?.items,
    isLoading,
    isFetching
  };
};