// import React, { useState, useEffect } from 'react';
// import { LinkServer, MovieBox, NoteViewer } from './index.js';
// import { useActiveButton } from '../../hooks/useActiveButton.js';
// import { icons } from '../../shared/icon.js';
// import { noteMovieWatch2 } from '../../shared/constant.js';
// // import { Rate } from 'antd';

// const { MdOutlineExpandMore, ImBookmark, FaCirclePlus, MdOutlineExpandLess, ImStarEmpty } = icons;
// // import ArtPlayer from './ArtPlayer';
// // import Artplayer from 'artplayer';

// const MovieWatchBox = ({ movieDetails }) => {
//   const serverData = movieDetails?.episodes[0]?.server_data;
//   const serverName = movieDetails?.episodes[0]?.server_name;
//   const posterUrl = movieDetails?.poster_url;

//   const [activeButton, handleClick] = useActiveButton();

//   const [contentClick, SetContentClick] = useState(false);

//   // const [selectedEpisode, setSelectedEpisode] = useState(null);
//   const [selectedEpisode, setSelectedEpisode] = useState(serverData[0]);

//   const handleEpisodeClick = (episode, index) => {
//     setSelectedEpisode(episode);
//     handleClick(index);
//   };

//   const contentWithoutTags = movieDetails?.content?.replace(/<[^>]+>/g, '');

//   // console.log(posterUrl);
//   return (
//     <div>
//       {/* <iframe src='http://172.247.50.10:2100/share/NABjuA91stoRYU2B' height={600} width={800} allowFullScreen></iframe> */}
//       <MovieBox
//         poster={posterUrl}
//         episode={selectedEpisode}
//       />
//       <NoteViewer
//         hidden={`hidden`}
//         note={noteMovieWatch2}
//       />
//       <div className='bg-[#19222b] p-[15px] pb-0 shadow-md my-2.5 rounded-[4px] flex items-center justify-between'>
//         <div className='flex gap-3'>
//           <div className='relative animate-bookmarkshake'>
//             <ImBookmark
//               size={40}
//               color='#d75a4a'
//             />
//             <FaCirclePlus
//               color='#77a61a'
//               className='absolute top-[40%] -right-1 bg-white rounded-full'
//             />
//           </div>
//           <div className='pb-[8px]'>
//             <h1 className='leading-[25px] text-[18px] text-[#d78f07] tw-multiline-ellipsis-1 font-[500px]'>
//               {movieDetails?.name}
//               <span className='ml-1.5'>Tập: {selectedEpisode?.name} </span>
//               <span className=''>
//                 {movieDetails?.quality}+ {movieDetails?.lang}
//               </span>
//             </h1>
//             <button
//               className='text-[13px] text-[#a5a5a5] flex items-center'
//               onClick={() => SetContentClick((prev) => !prev)}>
//               <span>Nội dung phim</span> {contentClick ? <MdOutlineExpandLess /> : <MdOutlineExpandMore size={15} />}
//             </button>
//           </div>
//         </div>

//         {/* <div>sao đánh giá</div> */}
//       </div>
//       {contentClick ? (
//         <div className='bg-[#101821] mb-4 h-auto border-[1px] border-[#1d2731a6] p-[15px] text-[14px] text-[#a5a5a5] rounded-md'>
//           <p className='leading-relaxed'>{contentWithoutTags}</p>
//         </div>
//       ) : null}
//       <LinkServer
//         activeButton={activeButton}
//         onEpisodeClick={handleEpisodeClick}
//         serverName={serverName}
//         serverData={serverData}
//       />
//     </div>
//   );
// };

// export default MovieWatchBox;

import React, { useState, useCallback, useMemo } from 'react';
import { LinkServer, MovieBox, NoteViewer } from './index.js';
import { useActiveButton } from '../../hooks/useActiveButton.js';
import { icons } from '../../shared/icon.js';
import { noteMovieWatch2 } from '../../shared/constant.js';

const { MdOutlineExpandMore, ImBookmark, FaCirclePlus, MdOutlineExpandLess } = icons;

const MovieWatchBox = React.memo(({ movieDetails }) => {
  const serverData = movieDetails?.episodes[0]?.server_data;
  const serverName = movieDetails?.episodes[0]?.server_name;
  const posterUrl = movieDetails?.poster_url;

  const [activeButton, handleClick] = useActiveButton();
  const [contentClick, setContentClick] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(serverData[0]);

  const handleEpisodeClick = useCallback(
    (episode, index) => {
      setSelectedEpisode(episode);
      handleClick(index);
    },
    [handleClick, setSelectedEpisode]
  );

  const contentWithoutTags = useMemo(() => movieDetails?.content?.replace(/<[^>]+>/g, ''), [movieDetails?.content]);

  return (
    <div>
      <MovieBox
        poster={posterUrl}
        episode={selectedEpisode}
      />
      <NoteViewer
        hidden='hidden'
        note={noteMovieWatch2}
      />
      <div className='bg-[#19222b] p-[15px] pb-0 shadow-md my-2.5 rounded-[4px] flex items-center justify-between'>
        <div className='flex gap-3'>
          <div className='relative animate-bookmarkshake'>
            <ImBookmark
              size={40}
              color='#d75a4a'
            />
            <FaCirclePlus
              color='#77a61a'
              className='absolute top-[40%] -right-1 bg-white rounded-full'
            />
          </div>
          <div className='pb-[8px]'>
            <h1 className='leading-[25px] text-[18px] text-[#d78f07] tw-multiline-ellipsis-1 font-[500px]'>
              {movieDetails?.name}
              <span className='ml-1.5'>Tập: {selectedEpisode?.name} </span>
              <span className=''>
                {movieDetails?.quality}+ {movieDetails?.lang}
              </span>
            </h1>
            <button
              className='text-[13px] text-[#a5a5a5] flex items-center'
              onClick={() => setContentClick((prev) => !prev)}>
              <span>Nội dung phim</span> {contentClick ? <MdOutlineExpandLess /> : <MdOutlineExpandMore size={15} />}
            </button>
          </div>
        </div>
      </div>
      {contentClick && (
        <div className='bg-[#101821] mb-4 h-auto border-[1px] border-[#1d2731a6] p-[15px] text-[14px] text-[#a5a5a5] rounded-md'>
          <p className='leading-relaxed'>{contentWithoutTags}</p>
        </div>
      )}
      <LinkServer
        activeButton={activeButton}
        onEpisodeClick={handleEpisodeClick}
        serverName={serverName}
        serverData={serverData}
      />
    </div>
  );
});
MovieWatchBox.displayName = 'MovieWatchBox';
export default MovieWatchBox;
