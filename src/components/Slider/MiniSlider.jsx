// import React, { useEffect } from 'react';
// import { CardItem, SectionTitle } from '../Common';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, A11y, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { classifyAddon, linkUrl, randomPage } from '../../shared/utils';
// import { Link } from 'react-router-dom';
// import { IMG_URL } from '../../shared/constant.js';

// export const MiniSlider = ({ films }) => {
//   const allMovies = [...((films && films?.Phimbo) || []), ...((films && films?.Phimle) || [])];
//   // const allMovies = [...((films && films?.MiniSlider) || [])];

//   return (
//     <div className='custom-page pb-[3%] bg-[#151d25]'>
//       <div className='!border-b !border-[#1e2732]  mb-3'>
//         <SectionTitle
//           sectionFilm={`Phim hot`}
//           hidden={`hidden `}
//         />
//       </div>
//       <Swiper
//         modules={[Navigation, A11y, Autoplay]}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         // loop={true}
//         autoHeight={true}
//         breakpoints={{
//           320: {
//             slidesPerView: 2,
//             spaceBetween: 110,
//           },
//           375: {
//             slidesPerView: 2,
//             spaceBetween: 55,
//           },
//           412: {
//             slidesPerView: 2,
//             spaceBetween: 15,
//           },
//           425: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//           540: {
//             slidesPerView: 3,
//             spaceBetween: 90,
//           },
//           640: {
//             slidesPerView: 3,
//             spaceBetween: 10,
//           },
//           712: {
//             slidesPerView: 4,
//             spaceBetween: 120,
//           },
//           768: {
//             slidesPerView: 4,
//             spaceBetween: 10,
//           },
//           820: {
//             slidesPerView: 5,
//             spaceBetween: 140,
//           },
//           912: {
//             slidesPerView: 5,
//             spaceBetween: 35,
//           },
//           1024: {
//             slidesPerView: 6,
//             spaceBetween: 10,
//           },
//         }}
//         navigation={{
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         }}>
//         {allMovies &&
//           allMovies?.map((movie, index) => (
//             <SwiperSlide key={movie._id}>
//               <Link
//                 key={index}
//                 to={linkUrl(movie)}>
//                 <CardItem
//                   image={`${IMG_URL}/${movie.thumb_url}`}
//                   title={movie?.name}
//                   originalName={movie?.origin_name}
//                   quality={movie?.quality}
//                   lang={movie?.lang}
//                   addOn={classifyAddon(movie)}
//                   cardItemQualang='cardItemQualangMiniSlider'
//                 />
//               </Link>
//             </SwiperSlide>
//           ))}
//         <div>
//           <div className='swiper-container swiper-button-prev navigation-button px-3 py-4 '></div>
//           <div className='swiper-button-next navigation-button swiper-container px-3 py-4 '></div>
//         </div>
//       </Swiper>
//     </div>
//   );
// };

import React, { useMemo } from 'react';
import { CardItem, SectionTitle } from '../Common';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { classifyAddon, linkUrl } from '../../shared/utils';
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../shared/constant.js';

export const MiniSlider = React.memo(({ films }) => {
  const allMovies = useMemo(() => {
    const phimbo = films?.Phimbo || [];
    const phimle = films?.Phimle || [];
    return [...phimbo, ...phimle];
  }, [films]);

  const swiperBreakpoints = {
    320: { slidesPerView: 2, spaceBetween: 110 },
    375: { slidesPerView: 2, spaceBetween: 55 },
    412: { slidesPerView: 2, spaceBetween: 15 },
    425: { slidesPerView: 2, spaceBetween: 10 },
    540: { slidesPerView: 3, spaceBetween: 90 },
    640: { slidesPerView: 3, spaceBetween: 10 },
    712: { slidesPerView: 4, spaceBetween: 120 },
    768: { slidesPerView: 4, spaceBetween: 10 },
    820: { slidesPerView: 5, spaceBetween: 140 },
    912: { slidesPerView: 5, spaceBetween: 35 },
    1024: { slidesPerView: 6, spaceBetween: 10 },
  };

  return (
    <div className='custom-page pb-[3%] bg-[#151d25]'>
      <div className='!border-b !border-[#1e2732] mb-3'>
        <SectionTitle
          sectionFilm='Phim hot'
          hidden='hidden'
        />
      </div>
      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        autoHeight={true}
        breakpoints={swiperBreakpoints}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}>
        {allMovies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <Link to={linkUrl(movie)}>
              <CardItem
                image={`${IMG_URL}/${movie.thumb_url}`}
                title={movie.name}
                originalName={movie.origin_name}
                quality={movie.quality}
                lang={movie.lang}
                addOn={classifyAddon(movie)}
                cardItemQualang='cardItemQualangMiniSlider'
              />
            </Link>
          </SwiperSlide>
        ))}
        <div className='swiper-container swiper-button-prev navigation-button px-3 py-4'></div>
        <div className='swiper-button-next navigation-button swiper-container px-3 py-4'></div>
      </Swiper>
    </div>
  );
});

MiniSlider.displayName = 'MiniSlider';
