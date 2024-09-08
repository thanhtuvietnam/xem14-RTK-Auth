import React from 'react';
import { MovieCategory } from '../components/Common';
import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll';
import { useCategoryPage } from '../hooks/useCategoryPage';

const QuocGia = () => {
  const { titlePage, totalPages, dataResults, isFetching } = useCategoryPage();

  return (
    <div className='custom-page min-h-screen px-0 bg-[#151d25]'>
      {isFetching ? (
        <SkeletonForAll />
      ) : (
        <MovieCategory
          OthersBreadCrumb={titlePage}
          categoryBreadCrumb={'Thể loại'}
          totalItemsSearch={totalPages}
          sectionTitle={`Thể loại ${titlePage}`}
          dataResults={dataResults}
        />
      )}
    </div>
  );
};

export default QuocGia;
