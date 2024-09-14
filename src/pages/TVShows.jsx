import { MovieCategory } from '../components/Common';
import { metaDescriptionShows, titleTvShows } from '../shared/constant';
const movieSortValue = 'tv-shows';

const sortParams = [
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: '_id', pageSort: 1 }, // Ngày
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'modified.time', pageSort: 1 }, // Tuần
  { movieSort: movieSortValue, theLoaiSort: '', quocGiaSort: '', yearSort: '', timeSort: 'year', pageSort: 1 }, // Tháng
];
const TVShows = () => (
  <MovieCategory
    title={titleTvShows}
    metaDescription={metaDescriptionShows}
    numberSlice={10}
    movieSortValue={sortParams}
    categoryBreadCrumb='TV-SHOWS'
    sectionTitle='TVSHOWS'
    categorySlug='tv-shows'
    hiddenOther={`hidden`}
  />
);
export default TVShows;
