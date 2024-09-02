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
      <div className='bg-gradient-to-tr from-[#008994] to-[#002404] p-4 rounded-md shadow-lg'>
        <div className='w-full'>
          <button
            className='text-sm mb-2 p-5 absolute top-0 right-0 shadow-lg rounded-full'
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
    </div>
  );
});

TrailerModal.displayName = 'TrailerModal';

export default TrailerModal;
