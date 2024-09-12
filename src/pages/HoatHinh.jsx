import { MovieCategory } from '../components/Common';
const movieSortValue = 'hoat-hinh';

const sortParams = [
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: '_id', pageSort: 1 }, // Ngày
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'modified.time', pageSort: 1 }, // Tuần
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'year', pageSort: 1 }, // Tháng
];
const HoatHinh = () => (
  <MovieCategory
    numberSlice={10}
    movieSortValue={sortParams}
    categoryBreadCrumb='Hoạt Hình'
    sectionTitle='Hoạt Hình'
    categorySlug='hoat-hinh'
    hiddenOther='hidden'
  />
);

export default HoatHinh;
