import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieResQuery, useGetSortQuery } from '../store/apiSlice/homeApi.slice.js';
import { useAppdispatch, useAppSelector } from '../store/hook.js';
import { clearRecommendMovies, setExcludeItems, setRecommendMovies, setRecommendMoviesWatch } from '../store/filterSlice/filter.slice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Filter, TrendingNow, SideMovieInfo, ScrollToTop, BreadCrumb, NoteViewer } from '../components/Common/index.js';
import Error from './Error.jsx';

import { MoonLoader } from 'react-spinners';
import { CardSkeleton, FilterSkeleton } from '../components/Skeleton/HomePageSkeleton/index.js';

import { metaDescriptionHome, noteLine, timeSort, titleHomePage } from '../shared/constant.js';
import { getRandomItem } from '../shared/utils.js';
import { Helmet } from 'react-helmet';
import useSplitContents from '../hooks/useSplitContent.js';

const movieSortValue = '';

const sortParams = [
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: '_id', pageSort: 1 }, // Ngày
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'modified.time', pageSort: 1 }, // Tuần
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'year', pageSort: 1 }, // Tháng
];

const MovieInfo = React.memo(() => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLoadingRecommend, setIsLoadingRecommend] = useState(null);

  const {
    data: MovieRes,
    isLoading: isMovieLoading,
    isFetching: isMovieFetching,
    isError: isMovieError,
    error: movieError,
  } = useGetMovieResQuery(slug, {
    skip: !slug,
  });
  const movieDetails = MovieRes?.data?.item;
  const breadCrumbItem = MovieRes?.data?.breadCrumb[0];

  const { contentBlockWithoutTags, contentBlockSplitted } = useSplitContents(movieDetails);

  const dispatch = useAppdispatch();

  const handleWatchMovie = useCallback(() => {
    navigate(`/xem-phim/${slug}`, { state: { movieDetails, slug } });
  }, [navigate, slug, movieDetails]);

  // ------------------------------------------------------------------//

  //------------------------------------------------------------//
  const [isReady, setIsReady] = useState(false);
  const [isValuesSet, setIsValuesSet] = useState(false);
  const [filterValuesIndex, setFilterValuesIndex] = useState({
    timeSortIndex: '',
    theLoaiSortIndex: '',
    categoryRTK: [],
    timeSortValueMain: [],
  });

  useEffect(() => {
    if (movieDetails) {
      const country = movieDetails.country?.map((coun) => coun.name) || [];
      const timeSortValue = timeSort.map((slug) => slug.sortfield) || [];
      const category = movieDetails.category?.map((i) => i.slug) || [];

      if (category.length > 0 && timeSortValue.length > 0) {
        const timeSortValueIndex = getRandomItem(timeSortValue);
        const theLoaiSortValueIndex = getRandomItem(category);
        setFilterValuesIndex({
          timeSortIndex: timeSortValueIndex,
          theLoaiSortIndex: theLoaiSortValueIndex,
          categoryRTK: category,
          timeSortValueMain: timeSortValue,
        });
        setIsValuesSet(true);
      }
    }
  }, [movieDetails]);

  const { timeSortIndex, theLoaiSortIndex, categoryRTK, timeSortValueMain } = filterValuesIndex;

  const filterValues = useMemo(
    () => ({
      timeSort: timeSortValueMain[timeSortIndex] || '',
      movieSort: '',
      theLoaiSort: categoryRTK[theLoaiSortIndex] || '',
      quocGiaSort: '',
      yearSort: '',
      page: 1,
    }),
    [timeSortValueMain, timeSortIndex, categoryRTK, theLoaiSortIndex]
  );

  useEffect(() => {
    if (timeSortIndex !== '' && theLoaiSortIndex !== '') {
      setIsReady(true);
    }
  }, [timeSortIndex, theLoaiSortIndex]);

  const shouldSkip = !isValuesSet || !isReady || !filterValues.timeSort || !filterValues.theLoaiSort;
  const { data: sortData, isFetching: isSortFetching, isError: isSortError, error: sortError } = useGetSortQuery(filterValues, { skip: shouldSkip });

  useEffect(() => {
    if (sortData && !isSortFetching) {
      dispatch(setExcludeItems(movieDetails?._id));
      dispatch(setRecommendMovies(sortData.data.items || []));
      dispatch(setRecommendMoviesWatch(sortData.data.items || []));
    }
  }, [sortData, isSortFetching, movieDetails, dispatch]);
  useEffect(() => {
    if ((isSortError && sortError) || (isMovieLoading && movieError)) {
      toast.warn('BẠN VUI LÒNG BẤM F5 HOẶC BẤM TẢI LẠI TRANG', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isSortError, sortError, isMovieLoading, movieError]);

  const [bothFetchingComplete, setBothFetchingComplete] = useState(false);
  useEffect(() => {
    if (!isMovieFetching && !isSortFetching) {
      setBothFetchingComplete(true);
      setIsLoadingRecommend(false); // Cập nhật trạng thái isLoading khi dữ liệu đã tải xong
    }
  }, [isMovieFetching, isSortFetching]);

  useEffect(() => {
    return () => {
      dispatch(clearRecommendMovies());
    };
  }, [dispatch]);

  useEffect(() => {
    const handlePopState = () => {
      setIsLoadingRecommend(true);
      // Cập nhật dữ liệu mới dựa trên slug
      const newSlug = window.location.pathname.split('/').pop();
      navigate(`/chitiet-phim/${newSlug}`, { replace: true });

      // Đảm bảo setIsLoading(false) được gọi sau khi điều hướng hoàn tất
      setTimeout(() => {
        setIsLoadingRecommend(false);
      }, 500);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const renderSkeletonContent = useMemo(
    () => (
      <SkeletonTheme
        baseColor='#202020'
        highlightColor='#444'>
        <FilterSkeleton />
        <div className='mt-3 lg:flex custom-page shadow-lg gap-3 min-h-screen'>
          <div className='lg:w-3/4'>
            <div className='w-full md:flex gap-3'>
              <div className='md:w-2/6'>
                <CardSkeleton
                  height={350}
                  width='100%'
                />
              </div>
              <div className='md:w-3/4'>
                <Skeleton
                  height={400}
                  width='100%'
                />
              </div>
            </div>
            <div className='mt-2'>
              <Skeleton
                height={200}
                width='100%'
              />
            </div>
            <div className='mt-2'>
              <Skeleton
                height={100}
                width='100%'
              />
            </div>
            <div className='mt-2'>
              <Skeleton
                height={50}
                width='25%'
              />
            </div>
            <div className='grid grid-cols-2 mt-3 gap-2 md:grid-cols-4 md:grid-rows-3'>
              {[...Array(8)].map((_, index) => (
                <div key={index}>
                  <CardSkeleton
                    height={250}
                    width='100%'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='lg:w-2/6'>
            <Skeleton
              className='h-screen lg:flex'
              height={1200}
            />
          </div>
        </div>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
          <MoonLoader
            size={160}
            color='#e06c26'
            className='z-50'
          />
        </div>
      </SkeletonTheme>
    ),
    []
  );

  const renderMovieContent = useMemo(
    () => (
      <>
        <Filter />
        <div className='mx-4'>
          <BreadCrumb
            OthersBreadCrumb={'Chi Tiết Phim'}
            hidden={'hidden'}
            categoryBreadCrumb={breadCrumbItem?.name}
          />
        </div>
        <div className='bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg'>
          <div className='lg:mr-5 mb-5 lg:w-3/4'>
            <SideMovieInfo
              detail={movieDetails}
              handleWatchMovie={handleWatchMovie}
            />
          </div>
          <div className='lg:w-2/6'>
            <TrendingNow
              numberSlice={10}
              movieSortValue={sortParams}
              addClass={`mb-4`}
            />
          </div>
        </div>
      </>
    ),
    [movieDetails, breadCrumbItem, handleWatchMovie]
  );

  const renderNoteViewer = useMemo(() => {
    return (
      <NoteViewer
        hidden='hidden'
        note={noteLine}
      />
    );
  }, []);
  return (
    <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
      <Helmet>
        <title>{movieDetails ? `${movieDetails?.name}-${movieDetails?.origin_name}` : titleHomePage}</title>
        <meta
          name='description'
          content={`${contentBlockSplitted[0]}...`}
        />
        <link
          rel='canonical'
          href={`https://cuongphim.vercel.app/chitiet-phim/${slug}`}
        />
      </Helmet>

      {renderNoteViewer}
      <ToastContainer />
      <ScrollToTop />
      {isLoadingRecommend ? renderSkeletonContent : bothFetchingComplete ? isMovieError || isSortError ? <Error /> : renderMovieContent : renderSkeletonContent}
    </div>
  );
});
MovieInfo.displayName = 'MovieInfo';
export default MovieInfo;
