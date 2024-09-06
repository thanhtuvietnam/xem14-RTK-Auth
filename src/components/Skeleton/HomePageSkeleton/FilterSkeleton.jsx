import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FilterSkeleton = React.memo(({ width }) => (
  <div className='custom-page mt-1 h-full'>
    <Skeleton
      className='px-4 py-3'
      width={width}
    />
  </div>
));
FilterSkeleton.displayName = 'FilterSkeleton';
export default FilterSkeleton;
