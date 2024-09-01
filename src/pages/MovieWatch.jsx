// import React, { useState, useEffect } from 'react';

// import { Filter, TrendingNow, MovieWatchBox, RecommendMovie, TableLink, LinkServer, NoteViewer, BreadCrumb, BackupLinkPlayer } from '../components/Common/index.js';
// import { PacmanLoader, MoonLoader } from 'react-spinners';

// import { useLocation } from 'react-router-dom';
// import { noteLine, noteMovieWatch } from '../shared/constant.js';
// import { useAppdispatch, useAppSelector } from '../store/hook.js';
// import { setLoading } from '../store/mainSlice/LoadingSlice/loadingSlice.js';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import FilterSkeleton from '../components/Skeleton/HomePageSkeleton/FilterSkeleton.jsx';
// import CardSkeleton from '../components/Skeleton/HomePageSkeleton/CardSkeleton.jsx';

// const MovieWatch = () => {
//   // const [isLoading, setIsLoading] = React.useState(false);
//   const location = useLocation();

//   const movieDetails = location?.state?.movieDetails;

//   const serverData = movieDetails?.episodes[0].server_data;
//   const isLoading = useAppSelector((state) => state.loadingState.Loading); // Lấy loading state từ Redux
//   // console.log(serverData);
//   const dispatch = useAppdispatch();
//   useEffect(() => {
//     dispatch(setLoading(true));
//     if (movieDetails) {
//       setTimeout(() => {
//         dispatch(setLoading(false));
//       }, 100);
//     }
//   }, [movieDetails]);

//   return (
//     <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
//       <NoteViewer
//         hidden={`hidden`}
//         note={noteLine}
//       />
//       {isLoading ? (
//         <div className='min-h-screen w-full'>
//           <SkeletonTheme
//             baseColor='#202020'
//             highlightColor='#444'>
//             <FilterSkeleton />
//             <div className='mt-3 lg:flex custom-page  shadow-lg gap-3 min-h-screen'>
//               <div className='lg:w-3/4'>
//                 <div className='w-full md:flex gap-3'>
//                   <div className='skeleton w-full'>
//                     <Skeleton
//                       height={30}
//                       width={`30%`}
//                       className='skeleton'
//                     />
//                     <Skeleton
//                       // height={300}
//                       width={`100%`}
//                       className='skeleton'
//                     />
//                   </div>
//                 </div>
//                 <div className='mt-2'>
//                   <Skeleton
//                     height={200}
//                     width={`100%`}
//                   />
//                 </div>
//                 <div className='mt-2'>
//                   <Skeleton
//                     height={100}
//                     width={`100%`}
//                   />
//                 </div>
//                 <div className='mt-2'>
//                   <Skeleton
//                     height={50}
//                     width={`25%`}
//                   />
//                 </div>
//                 <div className='grid grid-cols-2 mt-3 gap-2 md:grid-cols-4 md:grid-rows-3 '>
//                   {[...Array(8)].map((_, index) => (
//                     <div key={index}>
//                       <CardSkeleton
//                         height={250}
//                         width={`100%`}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className='lg:w-2/6'>
//                 <Skeleton
//                   className=' h-screen lg:flex'
//                   height={2000}
//                 />
//               </div>
//             </div>
//             <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
//               <MoonLoader
//                 size={160}
//                 color='#e06c26'
//                 className='z-50'
//               />
//             </div>
//           </SkeletonTheme>
//         </div>
//       ) : (
//         <>
//           <Filter />
//           <div className='bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg'>
//             <div className='lg:w-3/4'>
//               <div className='mt-2 sm  lg:mr-5 mb-5'>
//                 <div className='mb-2'>
//                   <BreadCrumb
//                     categoryBreadCrumb={'Xem Phim'}
//                     OthersBreadCrumb={movieDetails?.name}
//                     hidden={`opacity-0`}
//                   />
//                 </div>
//                 <LazyLoadComponent />
//                 <NoteViewer note={noteMovieWatch} />
//                 <div>
//                   <MovieWatchBox movieDetails={movieDetails} />
//                 </div>
//                 <BackupLinkPlayer
//                   mainLink={currentLink}
//                   backupLink={backupLink}
//                   onLinkChange={handleLinkChange}
//                 />
//                 {/* <div>tập dự phòng</div> */}
//                 <div className='bg-[#101821] rounded-md p-3 text-[#a5a5a5] mb-2 border-[1px] border-[#1e2732] overflow-y-auto overflow-x-scroll h-60 scroll-bar-custom'>
//                   <TableLink movieServerData={serverData} />
//                 </div>
//                 <div>comment</div>
//                 <div>
//                   <RecommendMovie />
//                 </div>
//               </div>
//             </div>
//             <div className='lg:w-2/6 '>
//               <TrendingNow />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MovieWatch;


// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Filter, TrendingNow, MovieWatchBox, RecommendMovie, TableLink, NoteViewer, BreadCrumb, BackupLinkPlayer } from '../components/Common/index.js';
// import { useAppdispatch, useAppSelector } from '../store/hook.js';
// import { setLoading } from '../store/mainSlice/LoadingSlice/loadingSlice.js';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
// import { noteLine, noteMovieWatch } from '../shared/constant.js';

// const MovieWatch = () => {
//   const location = useLocation();
//   const movieDetails = location?.state?.movieDetails;
//   const serverData = movieDetails?.episodes[0]?.server_data;
//   const isLoading = useAppSelector((state) => state.loadingState.Loading);
//   const dispatch = useAppdispatch();

//   const [currentLink, setCurrentLink] = useState(null);
//   const [backupLink, setBackupLink] = useState(null);
//   const [showBackup, setShowBackup] = useState(false);

//   useEffect(() => {
//     dispatch(setLoading(true));
//     if (movieDetails) {
//       setCurrentLink(movieDetails.episodes[0]?.server_data[0]?.link_m3u8);
//       setBackupLink(movieDetails.episodes[0]?.server_data[1]?.link_m3u8);
//       setTimeout(() => {
//         dispatch(setLoading(false));
//       }, 100);
//     }
//   }, [movieDetails, dispatch]);

//   const handleLinkChange = (newLink) => {
//     setCurrentLink(newLink);
//   };

//   const handleMovieWatchBoxError = () => {
//     setShowBackup(true);
//   };

//   return (
//     <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
//       <NoteViewer hidden='hidden' note={noteLine} />
//       {isLoading ? (
//         <div className='min-h-screen w-full'>
//           {/* Loading skeleton */}
//         </div>
//       ) : (
//         <>
//           <Filter />
//           <div className='bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg'>
//             <div className='lg:w-3/4'>
//               <div className='mt-2 sm  lg:mr-5 mb-5'>
//                 <div className='mb-2'>
//                   <BreadCrumb
//                     categoryBreadCrumb={'Xem Phim'}
//                     OthersBreadCrumb={movieDetails?.name}
//                     hidden='opacity-0'
//                   />
//                 </div>
//                 <LazyLoadComponent />
//                 <NoteViewer note={noteMovieWatch} />
//                 <div>
//                   {!showBackup ? (
//                     <MovieWatchBox 
//                       movieDetails={movieDetails} 
//                       onError={handleMovieWatchBoxError}
//                     />
//                   ) : (
//                     <BackupLinkPlayer
//                       mainLink={currentLink}
//                       backupLink={backupLink}
//                       onLinkChange={handleLinkChange}
//                     />
//                   )}
//                 </div>
//                 <div className='bg-[#101821] rounded-md p-3 text-[#a5a5a5] mb-2 border-[1px] border-[#1e2732] overflow-y-auto overflow-x-scroll h-60 scroll-bar-custom'>
//                   <TableLink movieServerData={serverData} />
//                 </div>
//                 <div>
//                   <RecommendMovie />
//                 </div>
//               </div>
//             </div>
//             <div className='lg:w-2/6 '>
//               <TrendingNow />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default React.memo(MovieWatch);


import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, TrendingNow, MovieWatchBox, RecommendMovie, TableLink, NoteViewer, BreadCrumb, BackupLinkPlayer } from '../components/Common/index.js';
import { useAppdispatch, useAppSelector } from '../store/hook.js';
import { setLoading } from '../store/mainSlice/LoadingSlice/loadingSlice.js';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { noteLine, noteMovieWatch } from '../shared/constant.js';

const MovieWatch = () => {
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
    return (
      <div className='min-h-screen w-full'>
        {/* Loading skeleton */}
      </div>
    );
  }

  return (
    <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
      <NoteViewer hidden='hidden' note={noteLine} />
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
};

export default React.memo(MovieWatch);