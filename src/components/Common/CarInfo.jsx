import React, { useState, useCallback, useEffect } from 'react';
import { icons } from '../../shared/icon';

import { TrailerModal } from './index.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAppSelector } from '../../store/hook.js';

const { IoPlaySharp, MdExpandMore, FaCirclePlus, IoLogoYoutube, ImBookmark, FaCheck } = icons;
const CarInfo = React.memo(({ image, altname, setExpandServer, trailerLink, handleWatchMovie, handleBMarks, isBookmarked }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const toggleExpandServer = useCallback(() => {
    setExpandServer((prev) => !prev);
  }, [setExpandServer]);

  return (
    <div className='bg-blue-800 justify-between min-[425px]:mx-[43px] md:mx-0 relative rounded-lg'>
      <div className='flex flex-col items-center rounded-lg'>
        <LazyLoadImage
          effect='blur'
          wrapperProps={{
            style: { transitionDelay: '200ms' },
          }}
          src={image}
          alt={altname}
          className='rounded-lg '
        />

        <div className='mt-4 absolute text-black left-1.5 -top-4 animate-bookmarkshake'>
          <button
            onClick={handleBMarks}
            className='relative'>
            <ImBookmark
              size={30}
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
        </div>
        <button
          className='text-sm text-white flex items-center gap-1 mt-2 absolute top-[2px] right-[7px] cardInfo-trailer rounded-[20px] px-3 py-1'
          onClick={openModal}>
          <IoLogoYoutube
            color='white'
            size={15}
          />
          Trailer
        </button>
        {showModal && (
          <TrailerModal
            setShowModal={setShowModal}
            link={trailerLink}
          />
        )}

        <div className='flex justify-center text-sm mt-4 mb-3 absolute bottom-0 w-full text-white truncate min-[768px]:text-[11px] min-[1180px]:text-sm'>
          <button
            className='flex items-center gap-1 rounded-lg px-2 py-2 mx-2 button-one transition duration-300'
            onClick={toggleExpandServer}>
            <MdExpandMore />
            <span>Tập phim</span>
          </button>
          <button
            className='flex items-center gap-1 rounded-lg px-2 mx-2 button-two transition duration-300'
            onClick={handleWatchMovie}>
            <IoPlaySharp
              size={15}
              color='white'
            />
            <span>Xem phim</span>
          </button>
        </div>
      </div>
    </div>
  );
});
CarInfo.displayName = 'CardInfo';
export default CarInfo;
