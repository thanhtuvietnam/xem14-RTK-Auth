import React, { useState, useCallback, useMemo } from 'react';
import { BackupLinkPlayer, LinkServer, MovieBox, NoteViewer } from './index.js';
import { useActiveButton, useActiveLinkButton } from '../../hooks/useActiveButton.js';
import { icons } from '../../shared/icon.js';
import { noteMovieWatch2 } from '../../shared/constant.js';
import useBookmark from '../../hooks/useBookmark.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { MdOutlineExpandMore, ImBookmark, FaCirclePlus, MdOutlineExpandLess, FaCheck } = icons;

const MovieWatchBox = React.memo(({ movieDetails }) => {
  // console.log(movieDetails);

  const serverData = movieDetails?.episodes[0]?.server_data;
  const serverName = movieDetails?.episodes[0]?.server_name;
  const posterUrl = movieDetails?.poster_url;
  const { handleBMarks, isBookmarked } = useBookmark(movieDetails);
  // const [activeButton, handleClick] = useActiveButton(serverData);
  const [contentClick, setContentClick] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(serverData[0]);
  const [backupLink, setBackupLink] = useState(null);
  const [showBackup, setShowBackup] = useState(false);

  const [activeMainLink, handleMainLinkClick] = useActiveLinkButton(0);
  const [activeBackupLink, handleBackupLinkClick] = useActiveLinkButton();

  const handleEpisodeClick = useCallback(
    (episode, index) => {
      setSelectedEpisode(episode);
      handleMainLinkClick(index);
      handleBackupLinkClick(null);
      setShowBackup(false);
    },
    [handleMainLinkClick, handleBackupLinkClick]
  );
  const handleEpisodeBackupClick = useCallback(
    (episode, index) => {
      setBackupLink(episode);
      setSelectedEpisode(episode); // Cập nhật selectedEpisode
      handleBackupLinkClick(index);
      handleMainLinkClick(null);
      setShowBackup(true); // Hiện player dự phòng
    },
    [handleMainLinkClick, handleBackupLinkClick]
  );

  const contentWithoutTags = useMemo(() => movieDetails?.content?.replace(/<[^>]+>/g, ''), [movieDetails?.content]);

  return (
    <div>
      {showBackup ? (
        <BackupLinkPlayer backupLink={backupLink?.link_embed} />
      ) : (
        <MovieBox
          poster={posterUrl}
          episode={selectedEpisode?.link_m3u8}
        />
      )}
      <NoteViewer
        hidden='hidden'
        note={noteMovieWatch2}
      />
      <div className='bg-[#19222b] p-[15px] pb-0 shadow-md my-2.5 rounded-[4px] flex items-center justify-between'>
        <div className='flex gap-3'>
          <button
            className='relative animate-bookmarkshake '
            onClick={handleBMarks}>
            <ImBookmark
              size={40}
              color={isBookmarked ? '#0fdd20' : '#d75a4a'}
            />
            {isBookmarked ? (
              <FaCheck
                color='#0fdd20'
                className='absolute top-1/2 -right-1 bg-[#3c523e] rounded-full'
              />
            ) : (
              <FaCirclePlus
                color='#0fdd20'
                className='absolute top-1/2 -right-1 bg-[#3c523e] rounded-full'
              />
            )}
          </button>
          <div className='pb-[8px]'>
            <h1 className='leading-[25px] text-[18px] text-[#d78f07] tw-multiline-ellipsis-1 font-[500px]'>
              {movieDetails?.name}
              <span className='ml-1.5'>Tập: {selectedEpisode?.name} </span>
              <span className='ml-2'>
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
        activeButton={activeMainLink}
        onEpisodeClick={handleEpisodeClick}
        serverName={serverName}
        serverData={serverData}
      />
      <LinkServer
        activeButton={activeBackupLink}
        onEpisodeClick={handleEpisodeBackupClick}
        serverName={`Link dự phòng`}
        serverData={serverData}
      />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
});
MovieWatchBox.displayName = 'MovieWatchBox';
export default MovieWatchBox;
