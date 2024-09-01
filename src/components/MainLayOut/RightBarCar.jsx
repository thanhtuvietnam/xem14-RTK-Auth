// export default RightBarCar;
import * as React from 'react';
import { useHoverState } from '../../shared/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAppdispatch, useAppSelector } from '../../store/hook';
import { clearSearchKey } from '../../store/searchSlice/searchSlice';
const RightBarCar = ({ movieName, originName, year, view, thumbImage, heightThumb, lineclampCss, setShowDropdown }) => {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHoverState();
  const searchKeyRTK = useAppSelector((state) => state.search.searchKey);
  const dispatch = useAppdispatch();
  const handleClickItem = () => {
    if (searchKeyRTK !== '') {
      dispatch(clearSearchKey());
    }
    setShowDropdown(false);
  };

  return (
    <div
      onClick={handleClickItem}
      className={`rightbar-custom group relative px-2 py-3 rounded-md overflow-hidden transition duration-300 ease-in-out transform 
      ${isHovering ? 'animate-gradientMovertl' : 'animate-gradientMoveltr'}
      sm:flex  sm:items-center sm:gap-4 sm:px-4 
    `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className={`w-full sm:w-1/4 lg:w-1/5 pr-2 sm:pr-0 overflow-hidden rounded-md ${heightThumb}`}>
        <LazyLoadImage
          effect='blur'
          wrapperProps={{
            // If you need to, you can tweak the effect transition using the wrapper style.
            background: '#f0f0f0',
            style: { transitionDelay: '200ms' },
          }}
          src={thumbImage}
          alt='movie'
          // className='group-hover:scale-110  duration-500 transition-transform '
          className={`w-full object-cover h-auto rounded-md group-hover:-translate-y-1 group-hover:scale-105 transition duration-300 ease-in-out`}
        />
      </div>
      <div className={`w-full sm:w-3/4 lg:w-4/5 mt-2 sm:mt-0 line-clamp-6 sm:line-clamp-3 md:line-clamp-none ${lineclampCss} `}>
        <h2 className='line-clamp-2 sm:line-clamp-none text-[#1879bf] font-semibold text-sm sm:text-base md:text-lg group-hover:text-[#da9d29]'>{movieName}</h2>
        <div>
          <p className='text-gray-400 line-clamp-3 sm:line-clamp-none text-[9px] sm:text-[11px] md:text-sm'>
            {originName}
            <span className='ml-1'>({year})</span>
          </p>
        </div>
        <div>
          <span>{view}</span>
        </div>
      </div>
    </div>
  );
};

export default RightBarCar;
