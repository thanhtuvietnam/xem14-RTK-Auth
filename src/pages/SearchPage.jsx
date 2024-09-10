import React, { useEffect, useMemo } from 'react';
import { MovieCategory } from '../components/Common';
import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll';
import { useAppdispatch, useAppSelector } from '../store/hook';
import { useGetSearchQuery } from '../store/apiSlice/homeApi.slice';
import { useDebounce } from '../hooks/useDebounce';
import { setError } from '../store/mainSlice/LoadingSlice/loadingSlice';
import { useNavigate } from 'react-router-dom';

const SearchPage = React.memo(() => {
  const dispatch = useAppdispatch();
  const searchTerm = useAppSelector((state) => state.search.searchKey);
  const page = useAppSelector((state) => state.search.page);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const navigate = useNavigate();

  const { data: state, isLoading, isError, error, isFetching } = useGetSearchQuery({ searchTerm: debouncedSearchTerm, page }, { skip: !debouncedSearchTerm });

  const totalPages = useMemo(() => state?.data?.params?.pagination?.totalItems, [state]);
  const dataResults = useMemo(() => state?.data?.items, [state]);

  useEffect(() => {
    if (isError && error) {
      console.error('Search error:', error);
      dispatch(setError(true));
      navigate('/error');
    }
  }, [isError, error, dispatch, navigate]);

  if (isLoading || isFetching) {
    return (
      <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
        <SkeletonForAll />
      </div>
    );
  }

  return (
    <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
      <MovieCategory
        hiddenOther='hidden'
        categoryBreadCrumb='Tìm Kiếm'
        sectionTitle={`Kết quả tìm kiếm cho từ khoá: ${searchTerm}`}
        dataResults={dataResults}
        totalItemsSearch={totalPages}
      />
    </div>
  );
});

SearchPage.displayName = 'SearchPage';
export default SearchPage;
