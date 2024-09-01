// import 'react-loading-skeleton/dist/skeleton.css';
// import { CardSkeleton } from './index.js';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

// const MiniSliderSkeleton = () => {
//   return (
//     <div className='custom-page pb-[3%]'>
//       <Swiper
//         loop={true}
//         autoHeight={true}
//         spaceBetween={5}
//         // slidesPerView={6}
//         breakpoints={{
//           320: {
//             slidesPerView: 2,
//           },
//           712: {
//             slidesPerView: 4,
//           },
//           1024: {
//             slidesPerView: 6,
//           },
//         }}>
//         {[...Array(6)].map((_, index) => (
//           <SwiperSlide key={index}>
//             <CardSkeleton
//               height={250}
//               width={`100%`}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default MiniSliderSkeleton;


import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { CardSkeleton } from './index.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const MiniSliderSkeleton = React.memo(() => (
  <div className='custom-page pb-[3%]'>
    <Swiper
      loop={true}
      autoHeight={true}
      spaceBetween={5}
      breakpoints={{
        320: { slidesPerView: 2 },
        712: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
    >
      {[...Array(6)].map((_, index) => (
        <SwiperSlide key={index}>
          <CardSkeleton height={250} width='100%' />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
));

export default MiniSliderSkeleton;