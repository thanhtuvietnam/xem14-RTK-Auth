import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, TrendingNow, MovieWatchBox, RecommendMovie, TableLink, NoteViewer, BreadCrumb, BackupLinkPlayer } from '../components/Common/index.js';
import { useAppdispatch, useAppSelector } from '../store/hook.js';
import { setLoading } from '../store/mainSlice/LoadingSlice/loadingSlice.js';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { noteLine, noteMovieWatch } from '../shared/constant.js';

const MovieWatch = React.memo(() => {
  const location = useLocation();
  const movieDetails = location?.state?.movieDetails;
  const serverData = movieDetails?.episodes[0]?.server_data;
  const isLoading = useAppSelector((state) => state.loadingState.Loading);
  const dispatch = useAppdispatch();

  const [currentLink, setCurrentLink] = useState(null);
  const [backupLink, setBackupLink] = useState(null);
  const [showBackup, setShowBackup] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    if (movieDetails) {
      setCurrentLink(movieDetails.episodes[0]?.server_data[0]?.link_m3u8);
      setBackupLink(movieDetails.episodes[0]?.server_data[1]?.link_m3u8);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 100);
    }
  }, [movieDetails, dispatch]);

  const handleLinkChange = useCallback((newLink) => {
    setCurrentLink(newLink);
  }, []);

  const handleMovieWatchBoxError = useCallback(() => {
    setShowBackup(true);
  }, []);

  if (isLoading) {
    return <div className='min-h-screen w-full'>{/* Loading skeleton */}</div>;
  }

  return (
    <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
      <NoteViewer
        hidden='hidden'
        note={noteLine}
      />
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
              {!showBackup ? (
                <MovieWatchBox
                  movieDetails={movieDetails}
                  onError={handleMovieWatchBoxError}
                />
              ) : (
                <BackupLinkPlayer
                  mainLink={currentLink}
                  backupLink={backupLink}
                  onLinkChange={handleLinkChange}
                />
              )}
            </div>
            <div className='bg-[#101821] rounded-md p-3 text-[#a5a5a5] mb-2 border-[1px] border-[#1e2732] overflow-y-auto overflow-x-scroll h-60 scroll-bar-custom'>
              <TableLink movieServerData={serverData} />
            </div>
            <div>
              <RecommendMovie />
            </div>
          </div>
        </div>
        <div className='lg:w-2/6'>
          <TrendingNow />
        </div>
      </div>
    </div>
  );
});
MovieWatch.displayName = 'MovieWatch';
export default MovieWatch;
