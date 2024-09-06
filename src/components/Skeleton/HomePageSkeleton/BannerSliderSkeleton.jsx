import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BannerSliderSkeleton = React.memo(() => (
  <div>
    <Skeleton className='mt-[10px] h-full custom-responsive' />
  </div>
));
BannerSliderSkeleton.displayName = 'BannerSliderSkeleton';
export default BannerSliderSkeleton;
