import React from 'react';
import { MovieCategory } from '../components/Common';
import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll';
import { useCategoryPage } from '../hooks/useCategoryPage';

const movieSortValue = '';

const sortParams = [
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: '_id', pageSort: 1 }, // Ngày
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'modified.time', pageSort: 1 }, // Tuần
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'year', pageSort: 1 }, // Tháng
];

const Theloai = () => {
  const { titlePage, totalPages, dataResults, isFetching } = useCategoryPage();

  return (
    <div className='custom-page min-h-screen px-0 bg-[#151d25]'>
      {isFetching ? (
        <SkeletonForAll />
      ) : (
        <MovieCategory
          numberSlice={10}
          movieSortValue={sortParams}
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

// Theloai.displayName = 'Theloai';

export default Theloai;
