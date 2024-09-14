import React from 'react';
import { MovieCategory } from '../components/Common';
import { metaDescriptionBo, titlePhimBo } from '../shared/constant';

const movieSortValue = 'phim-bo';

const sortParams = [
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: '_id', pageSort: 1 }, // Ngày
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'modified.time', pageSort: 1 }, // Tuần
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'year', pageSort: 1 }, // Tháng
];

const PhimBo = () => {
  return (
    <MovieCategory
      title={titlePhimBo}
      metaDescription={metaDescriptionBo}
      numberSlice={10}
      movieSortValue={sortParams}
      categoryBreadCrumb='Phim Bộ'
      categorySlug='phim-bo'
      sectionTitle='Phim Bộ'
      hiddenOther='hidden'
    />
  );
};

export default PhimBo;
