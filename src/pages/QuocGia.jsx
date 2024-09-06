import React from 'react';
import { MovieCategory } from '../components/Common';
import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll';
import { useCategoryPage } from '../hooks/useCategoryPage';

const Theloai = () => {
  const { titlePage, totalPages, dataResults, isFetching } = useCategoryPage();

  return (
    <div className='custom-page min-h-screen px-0 bg-[#151d25]'>
      {isFetching ? (
        <SkeletonForAll />
      ) : (
        <MovieCategory
          OthersBreadCrumb={titlePage}
          categoryBreadCrumb={'Thể Loại'}
          dataResults={dataResults}
          sectionTitle={`Thể loại ${titlePage}`}
          totalItemsSearch={totalPages}
        />
      )}
    </div>
  );
};

export default Theloai;
