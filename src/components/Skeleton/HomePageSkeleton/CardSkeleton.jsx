import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton = React.memo(({ height, width }) => (
  <div>
    <Skeleton height={height} />
    <div className='mt-2'>
      <Skeleton width={width} />
    </div>
  </div>
));
CardSkeleton.displayName = 'CardSkeleton';

export default CardSkeleton;
