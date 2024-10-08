import * as React from 'react';
import { useHoverState } from '../../shared/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAppdispatch, useAppSelector } from '../../store/hook';
import { clearSearchKey } from '../../store/searchSlice/searchSlice';

const RightBarCar = React.memo(({ movieName, originName, year, view, thumbImage, heightThumb, lineclampCss, setShowDropdown, onRemove, showRemoveButton }) => {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHoverState();
  const searchKeyRTK = useAppSelector((state) => state.search.searchKey);
  const dispatch = useAppdispatch();

  const handleClickItem = () => {
    if (searchKeyRTK !== '') {
      dispatch(clearSearchKey());
    }
    if (typeof setShowDropdown === 'function') {
      setShowDropdown(); // Kiểm tra xem setShowDropdown có phải là hàm không
    }
  };

  return (
    <div
      onClick={handleClickItem}
      className={`relative rightbar-custom group flex items-center gap-4 p-3 rounded-md transition duration-300 ease-in-out 
      ${isHovering ? 'animate-gradientMovertl' : 'animate-gradientMoveltr'}
      sm:flex-row sm:px-4 border-l border-[#473434]`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className={`w-1/4 sm:w-[15%] md:w-[12%] lg:w-1/4 overflow-hidden rounded-md ${heightThumb}`}>
        <LazyLoadImage
          effect='blur'
          wrapperProps={{
            background: '#f0f0f0',
            style: { transitionDelay: '200ms' },
          }}
          src={thumbImage}
          alt='movie'
          className='w-full h-auto object-contain rounded-md transition-transform duration-300 ease-in-out group-hover:-translate-y-1 group-hover:scale-105'
        />
      </div>
      <div className={`flex-1 mt-2 sm:mt-0 ${lineclampCss}`}>
        <h2 className='text-[#1879bf] font-semibold text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2 sm:line-clamp-none group-hover:text-[#da9d29]'>{movieName}</h2>
        <div>
          <p className='text-gray-400 text-[10px] sm:text-[11px] md:text-sm lg:text-base line-clamp-3 sm:line-clamp-none'>
            {originName}
            <span className='ml-1'>{year}</span>
          </p>
        </div>
        <div>
          <span className='text-xs sm:text-sm md:text-base'>{view}</span>
        </div>
        {showRemoveButton && (
          <button
            onClick={onRemove}
            className='absolute top-0 right-2 bg-[#b34646] text-white rounded-md px-2 py-1 hover:bg-red-600'>
            Xóa
          </button>
        )}
      </div>
    </div>
  );
});

RightBarCar.displayName = 'RightBarCar';

export default RightBarCar;
