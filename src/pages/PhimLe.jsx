import React from 'react';
import { MovieCategory } from '../components/Common';
const movieSortValue = 'phim-le';

const sortParams = [
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: '_id', pageSort: 1 }, // Ngày
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'modified.time', pageSort: 1 }, // Tuần
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'year', pageSort: 1 }, // Tháng
];
const PhimLe = () => (
  <MovieCategory
    numberSlice={10}
    movieSortValue={sortParams}
    categoryBreadCrumb='Phim Lẻ'
    categorySlug='phim-le'
    sectionTitle='Phim Lẻ'
    hiddenOther='hidden'
  />
);

export default PhimLe;
