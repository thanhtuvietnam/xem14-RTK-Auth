// import React, { useState, useEffect, useMemo } from 'react';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/bundle';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow } from 'swiper/modules';
// import { Link } from 'react-router-dom';
// import { IMG_URL } from '../../shared/constant';
// import { icons } from '../../shared/icon';
// import { useHoverState, linkUrl, shuffleAndSliceArray } from '../../shared/utils.js';
// import ImdbScore from '../Common/ImdbScore.jsx';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// const { SlControlPlay, FaStar, IoCalendarOutline, IoMdTime, LuLanguages, MdOutlineHighQuality } = icons;

// const BannerSlider = ({ films }) => {
//   const { isHovering, handleMouseEnter, handleMouseLeave } = useHoverState();

//   // const filmAfterShuffles = shuffleAndSliceArray(films?.Phimmoi || [])
//   return (
//     <div className='mt-[3px] custom-responsive relative  !rounded-lg overflow-hidden swiper-container'>
//       <Swiper
//         // loop={true}
//         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
//         spaceBetween={100}
//         autoplay={{ delay: 7000, disableOnInteraction: false }}
//         slidesPerView={1}
//         navigation={{
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         }}
//         pagination={{ type: 'progressbar', el: '.swiper-pagination' }}
//         scrollbar={{ draggable: true, dragSize: 20 }}
//         className='mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 !rounded-lg'>
//         {films?.Phimmoi &&
//           films?.Phimmoi.map((film, index) => (
//             <SwiperSlide
//               key={index}
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}>
//               <Link
//                 to={`/${linkUrl(film)}`}
//                 key={film?._id}
//                 className='group'>
//                 <LazyLoadImage
//                   effect='blur'
//                   wrapperProps={{
//                     // If you need to, you can tweak the effect transition using the wrapper style.
//                     background: '#f0f0f0',
//                     style: { transitionDelay: '200ms' },
//                   }}
//                   src={`${IMG_URL}/${film?.poster_url}`}
//                   className='h-64 sm:h-80 md:h-96 lg:h-[720px]  w-full object-cover rounded-lg overflow-hidden'
//                   alt={film?.name}
//                 />
//                 <div className='absolute h-full w-full top-0 left-0 rounded-lg pointer-events-none group-hover:bg-[#00000026] tw-black-backdrop transition duration-700'></div>
//                 <div className='bg-[#eb5e33] px-3 py-1 text-white absolute top-[5%] right-[3%] rounded-full hidden md:flex items-center gap-1'>
//                   <span>{film?.tmdb?.vote_average}</span>
//                   <FaStar size={15} />
//                 </div>
//                 {isHovering && (
//                   <div className='absolute top-1/3 -translate-x-1/3 md:top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#ff9800bf] to-[#eb5e33] tw-flex-center z-10 transition duration-700'>
//                     <SlControlPlay
//                       className='ml-1 text-xl md:text-3xl '
//                       color='white'
//                     />
//                   </div>
//                 )}

//                 <div className='absolute top-1/2 -translate-y-1/2 left-[5%] max-w-[200px] md:max-w-md'>
//                   <h2 className='text-[#eb5e33] font-black tracking-wide text-xl md:text-5xl tw-multiline-ellipsis-3 md:tw-multiline-ellipsis-2 '>{film?.origin_name}</h2>
//                   <div className='mt-2'>
//                     <p className='text-white font-semibold text-base md:text-2xl'>{film?.name}</p>
//                     <div className='hidden md:flex items-center gap-3'>
//                       <p className='text-[#a5a5a5] hidden md:flex text-lg items-center gap-2 mt-1'>
//                         <span>
//                           <IoCalendarOutline
//                             color='yellow'
//                             size={22}
//                           />
//                         </span>
//                         {film?.year}
//                       </p>
//                       <p className='text-[#a5a5a5] text-lg hidden md:flex items-center gap-2 mt-1'>
//                         <span>
//                           <IoMdTime
//                             color='yellow'
//                             size={22}
//                           />
//                         </span>
//                         {film?.time}
//                       </p>
//                       <p className='text-lg text-yellow-300 hidden md:flex items-center gap-2 mt-1 '>
//                         <i className='fa-brands fa-imdb text-2xl'></i>
//                         {/* {<ImdbScore film={film} />} */}
//                       </p>
//                     </div>
//                   </div>
//                   <div className='tracking-wider'>
//                     <p className='hidden md:flex text-[#a5a5a5] gap-1 mt-1'>
//                       <span className='hidden md:flex items-center gap-2'>
//                         <LuLanguages
//                           color='yellow'
//                           size={22}
//                         />
//                         Ngôn Ngữ:
//                       </span>
//                       {film?.lang}
//                     </p>
//                     <p className='text-[#a5a5a5] mt-1 tracking-wider hidden md:flex items-center gap-2'>
//                       <span>
//                         <MdOutlineHighQuality
//                           color='yellow'
//                           size={22}
//                         />
//                       </span>
//                       Chất lượng: {film?.quality}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             </SwiperSlide>
//           ))}
//         <div>
//           <div className='swiper-button-prev navigation-button py-4 px-3 hidden md:flex swiper-container'></div>
//           <div className='swiper-button-next navigation-button py-4 px-3 hidden md:flex swiper-container'></div>
//           <div className='pagination-container'></div>
//         </div>
//         <div className='swiper-pagination'></div>
//       </Swiper>
//     </div>
//   );
// };

// export default BannerSlider;

import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../shared/constant';
import { icons } from '../../shared/icon';
import { useHoverState, linkUrl, shuffleAndSliceArray } from '../../shared/utils.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { SlControlPlay, FaStar, IoCalendarOutline, IoMdTime, LuLanguages, MdOutlineHighQuality } = icons;

const BannerSlider = React.memo(({ films }) => {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHoverState();

  const shuffledFilms = useMemo(() => shuffleAndSliceArray(films?.Phimmoi || [], 15), [films?.Phimmoi]);

  return (
    <div className='mt-[3px] custom-responsive relative !rounded-lg overflow-hidden swiper-container'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={100}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ type: 'progressbar', el: '.swiper-pagination' }}
        scrollbar={{ draggable: true, dragSize: 20 }}
        className='mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 !rounded-lg'>
        {shuffledFilms.map((film, index) => (
          <SwiperSlide
            key={film?._id || index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <Link
              to={`/${linkUrl(film)}`}
              className='group'>
              <LazyLoadImage
                effect='blur'
                wrapperProps={{
                  style: { transitionDelay: '200ms', background: '#f0f0f0' },
                }}
                src={`${IMG_URL}/${film?.poster_url}`}
                className='h-64 sm:h-80 md:h-96 lg:h-[720px] w-full object-cover rounded-lg overflow-hidden'
                alt={film?.name}
              />
              <div className='absolute h-full w-full top-0 left-0 rounded-lg pointer-events-none group-hover:bg-[#00000026] tw-black-backdrop transition duration-700'></div>
              <div className='bg-[#eb5e33] px-3 py-1 text-white absolute top-[5%] right-[3%] rounded-full hidden md:flex items-center gap-1'>
                <span>{film?.tmdb?.vote_average}</span>
                <FaStar size={15} />
              </div>
              {isHovering && (
                <div className='absolute top-1/3 -translate-x-1/3 md:top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#ff9800bf] to-[#eb5e33] tw-flex-center z-10 transition duration-700'>
                  <SlControlPlay
                    className='ml-1 text-xl md:text-3xl'
                    color='white'
                  />
                </div>
              )}
              <div className='absolute top-1/2 -translate-y-1/2 left-[5%] max-w-[200px] md:max-w-md'>
                <h2 className='text-[#eb5e33] font-black tracking-wide text-xl md:text-5xl tw-multiline-ellipsis-3 md:tw-multiline-ellipsis-2'>{film?.origin_name}</h2>
                <div className='mt-2'>
                  <p className='text-white font-semibold text-base md:text-2xl'>{film?.name}</p>
                  <div className='hidden md:flex items-center gap-3'>
                    <p className='text-[#a5a5a5] hidden md:flex text-lg items-center gap-2 mt-1'>
                      <IoCalendarOutline
                        color='yellow'
                        size={22}
                      />
                      {film?.year}
                    </p>
                    <p className='text-[#a5a5a5] text-lg hidden md:flex items-center gap-2 mt-1'>
                      <IoMdTime
                        color='yellow'
                        size={22}
                      />
                      {film?.time}
                    </p>
                    <p className='text-lg text-yellow-300 hidden md:flex items-center gap-2 mt-1'>
                      <i className='fa-brands fa-imdb text-2xl'></i>
                    </p>
                  </div>
                </div>
                <div className='tracking-wider'>
                  <p className='hidden md:flex text-[#a5a5a5] gap-1 mt-1'>
                    <span className='hidden md:flex items-center gap-2'>
                      <LuLanguages
                        color='yellow'
                        size={22}
                      />
                      Ngôn Ngữ:
                    </span>
                    {film?.lang}
                  </p>
                  <p className='text-[#a5a5a5] mt-1 tracking-wider hidden md:flex items-center gap-2'>
                    <MdOutlineHighQuality
                      color='yellow'
                      size={22}
                    />
                    Chất lượng: {film?.quality}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <div>
          <div className='swiper-button-prev navigation-button py-4 px-3 hidden md:flex swiper-container'></div>
          <div className='swiper-button-next navigation-button py-4 px-3 hidden md:flex swiper-container'></div>
          <div className='pagination-container'></div>
        </div>
        <div className='swiper-pagination'></div>
      </Swiper>
    </div>
  );
});
BannerSlider.displayName = 'BannerSlider';
export default BannerSlider;
