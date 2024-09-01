import useGetImdbDetails from '../../store/apiSlice/imdbApi.slice';

function ImdbScore({ film }) {
  const imdbId = film?.imdb?.id; // Ví dụ:  lấy từ props detailed
  const { loading, error, data } = useGetImdbDetails(imdbId);
  return <>{data?.title?.rating?.aggregate_rating || 7}</>;
}

export default ImdbScore;
