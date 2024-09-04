import React from 'react';
import { icons } from '../../shared/icon';
import YouTube from 'react-youtube';

const { IoCloseCircleSharp } = icons;
const TrailerModal = React.memo(({ setShowModal, link }) => {
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 tw-flex-center z-50'
      onClick={closeModal}>
      <div className=' rounded-md shadow-lg absolute top-0 right-0'>
        <button
          className='text-sm  shadow-lg rounded-full'
          onClick={closeModal}>
          <IoCloseCircleSharp
            size={70}
            color='#cb5050'
            className='bg-black/30 rounded-full'
          />
        </button>
      </div>

      <YouTube videoId={link} />
    </div>
  );
});

TrailerModal.displayName = 'TrailerModal';

export default TrailerModal;
