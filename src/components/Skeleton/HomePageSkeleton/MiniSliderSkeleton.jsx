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
        540: { slidesPerView: 3 },
        712: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}>
      {[...Array(6)].map((_, index) => (
        <SwiperSlide key={index}>
          <CardSkeleton
            height={250}
            width='100%'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
));

MiniSliderSkeleton.displayName = 'MiniSliderSkeleton';

export default MiniSliderSkeleton;
