import React, { useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Filter, TrendingNow, SideMovieInfo, ScrollToTop, BreadCrumb, NoteViewer } from '../components/Common/index.js';
import { MoonLoader } from 'react-spinners';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { CardSkeleton, FilterSkeleton } from '../components/Skeleton/HomePageSkeleton/index.js';
import { useGetMovieResQuery } from '../store/apiSlice/homeApi.slice.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from './Error.jsx';
import { noteLine } from '../shared/constant.js';
import { useAppdispatch } from '../store/hook.js';
import { setActiveButton } from '../store/mainSlice/LoadingSlice/loadingSlice.js';

const MovieInfo = React.memo(() => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    data: MovieRes,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetMovieResQuery(slug, {
    skip: !slug,
  });
  const movieDetails = MovieRes?.data?.item;
  const breadCrumbItem = MovieRes?.data?.breadCrumb[0];

  const dispatch = useAppdispatch();
  const handleWatchMovie = useCallback(() => {
    // dispatch(setActiveButton(0));
    navigate(`/xem-phim/${slug}`, { state: { movieDetails } });
  }, [navigate, slug, movieDetails]);

  useEffect(() => {
    if (isError && error) {
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
  }, [isError, error]);

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
              height={2000}
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
            <TrendingNow addClass={`mb-4`} />
          </div>
        </div>
      </>
    ),
    [movieDetails, breadCrumbItem, handleWatchMovie]
  );

  return (
    <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
      <NoteViewer
        hidden='hidden'
        note={noteLine}
      />
      <ToastContainer />
      <ScrollToTop />
      {isFetching ? renderSkeletonContent : movieDetails ? renderMovieContent : <Error />}
    </div>
  );
});
MovieInfo.displayName = 'MovieInfo';
export default MovieInfo;
