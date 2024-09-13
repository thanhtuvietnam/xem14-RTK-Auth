import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, TrendingNow, MovieWatchBox, RecommendMovie, TableLink, NoteViewer, BreadCrumb, BackupLinkPlayer, LinkServer } from '../components/Common/index.js';
import { useAppdispatch, useAppSelector } from '../store/hook.js';
import { setLoading } from '../store/mainSlice/LoadingSlice/loadingSlice.js';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { noteLine, noteMovieWatch } from '../shared/constant.js';
import { useActiveLinkButton } from '../hooks/useActiveButton.js';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import FilterSkeleton from '../components/Skeleton/HomePageSkeleton/FilterSkeleton.jsx';
import CardSkeleton from '../components/Skeleton/HomePageSkeleton/CardSkeleton.jsx';
import { MoonLoader } from 'react-spinners';

const movieSortValue = '';

const sortParams = [
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: '_id', pageSort: 1 }, // Ngày
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'modified.time', pageSort: 1 }, // Tuần
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'year', pageSort: 1 }, // Tháng
];

const MovieWatch = React.memo(() => {
  const location = useLocation();
  const movieDetails = location?.state?.movieDetails;

  const serverData = movieDetails?.episodes[0]?.server_data;
  // const isLoading = useAppSelector((state) => state.loadingState.Loading);
  const dispatch = useAppdispatch();
  const [isLoading, setIsLoading] = useState(false);

  const items = useAppSelector((state) => state.filter.recommendMoviesWatch);
  const excludeItems = useAppSelector((state) => state.filter.excludeItems);

  useEffect(() => {
    if (movieDetails) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [movieDetails]);

  const renderSkeletonContent = useMemo(
    () => (
      <SkeletonTheme
        baseColor='#202020'
        highlightColor='#444'>
        <FilterSkeleton />
        <div className='mt-3 lg:flex custom-page shadow-lg gap-3 min-h-screen'>
          <div className='lg:w-3/4'>
            <div className='w-full  gap-3 '>
              <Skeleton
                className='skeleton'
                width='100%'
              />
            </div>
            <div className='mt-2 '>
              <Skeleton
                height={200}
                width='100%'
              />
            </div>
            <div className='mt-2'>
              <Skeleton
                height={300}
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
      {renderNoteViewer}
      {isLoading ? (
        <div className='min-h-screen custom-page'>{renderSkeletonContent}</div>
      ) : (
        <>
          <Filter />
          <div className='bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg'>
            <div className='lg:w-3/4'>
              <div className='mt-2 sm lg:mr-5 mb-5'>
                <div className='mb-2'>
                  <BreadCrumb
                    categoryBreadCrumb={'Xem Phim'}
                    OthersBreadCrumb={movieDetails?.name}
                    hidden='opacity-0'
                  />
                </div>
                <LazyLoadComponent />
                <NoteViewer note={noteMovieWatch} />
                <div>
                  <MovieWatchBox movieDetails={movieDetails} />
                </div>

                <div className='bg-[#101821] rounded-md p-3 text-[#a5a5a5] mb-2 border-[1px] border-[#1e2732] overflow-y-auto overflow-x-scroll h-60 scroll-bar-custom'>
                  <TableLink movieServerData={serverData} />
                </div>
                <div>
                  <RecommendMovie
                    items={items}
                    excludeItems={excludeItems}
                  />
                </div>
              </div>
            </div>
            <div className='lg:w-2/6'>
              <TrendingNow
                numberSlice={10}
                movieSortValue={sortParams}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
});
MovieWatch.displayName = 'MovieWatch';
export default MovieWatch;
