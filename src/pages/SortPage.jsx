import React, { useEffect, useMemo } from 'react';
import { MovieCategory } from '../components/Common';
import { useNavigate } from 'react-router-dom';
import { useAppdispatch, useAppSelector } from '../store/hook';
import { setFilterValues } from '../store/filterSlice/filter.slice';
import { useGetSortQuery } from '../store/apiSlice/homeApi.slice';
import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll';
import { setError } from '../store/mainSlice/LoadingSlice/loadingSlice';
import { metaDescriptionHome, titleHomePage } from '../shared/constant';

const movieSortValue = '';
const sortParams = [
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: '_id', pageSort: 1 }, // Ngày
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'modified.time', pageSort: 1 }, // Tuần
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'year', pageSort: 1 }, // Tháng
];
const SortPage = React.memo(() => {
  const dispatch = useAppdispatch();
  const navigate = useNavigate();

  const filterValues = useAppSelector((state) => state.filter.filterValues);

  const shouldSkip = !filterValues.timeSort && !filterValues.movieSort && !filterValues.theLoaiSort && !filterValues.quocGiaSort && !filterValues.yearSort;
  const { data, isFetching, isLoading, isError, error } = useGetSortQuery(filterValues, { skip: shouldSkip });
  // console.log(data);
  const dataFilter = data?.data?.items;
  const totalPages = useMemo(() => data?.data?.params?.pagination?.totalItems, [data?.data?.params?.pagination?.totalItems]);
  const currentPage = useAppSelector((state) => state.search.currentPage);

  const titlePage = data?.data.titlePage;
  useEffect(() => {
    if (filterValues.pageSort !== currentPage) {
      const updatedFilterValues = { ...filterValues, pageSort: currentPage }; // Tạo bản sao của filterValues và cập nhật pageSort
      dispatch(setFilterValues(updatedFilterValues)); // Dispatch hành động với giá trị cập nhật
      const queryParams = new URLSearchParams({
        sort_field: filterValues.timeSort || '',
        category: filterValues.theLoaiSort || '',
        country: filterValues.quocGiaSort || '',
        year: filterValues.yearSort || '',
        page: currentPage || '',
      }).toString();
      const newPath = `/sort/${filterValues.movieSort}?${queryParams}`;
      window.history.replaceState(null, '', newPath); // Thay đổi URL mà không điều hướng lại trang
      // console.log(`i have changed`);
    }
  }, [currentPage, dispatch, filterValues]);

  useEffect(() => {
    if (isError && error) {
      // console.error('Search error:', error);
      dispatch(setError(true));
      navigate('/error');
    }
  }, [isError, error, dispatch]);

  if (isLoading || isFetching) {
    return (
      <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
        <SkeletonForAll />
      </div>
    );
  }

  return (
    <MovieCategory
      title={titleHomePage}
      metaDescription={metaDescriptionHome}
      numberSlice={10}
      movieSortValue={sortParams}
      dataResults={dataFilter}
      categoryBreadCrumb='Lọc phim'
      sectionTitle={`Lọc phim: ${titlePage}`}
      totalItemsSearch={totalPages}
      hiddenOther='hidden'
    />
  );
});

SortPage.displayName = 'SortPage';

export default SortPage;
