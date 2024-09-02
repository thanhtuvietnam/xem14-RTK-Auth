import { useMemo } from 'react';
import useGetImdbDetails from '../../store/apiSlice/imdbApi.slice';

function ImdbScore({ film }) {
  const imdbId = film?.imdb?.id;
  const { loading, error, data } = useGetImdbDetails(imdbId);
  const rating = useMemo(() => {
    return data?.title?.rating?.aggregate_rating || 7;
  }, [data]);
  return <>{rating}</>;
}

export default ImdbScore;
