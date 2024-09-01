// import React from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const BannerSliderSkeleton = () => {
//   return (
//     <div>
//       <Skeleton className='mt-[10px] h-full  custom-responsive  ' />
//     </div>
//   );
// };

// export default BannerSliderSkeleton;

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BannerSliderSkeleton = React.memo(() => (
  <div>
    <Skeleton className='mt-[10px] h-full custom-responsive' />
  </div>
));

export default BannerSliderSkeleton;
