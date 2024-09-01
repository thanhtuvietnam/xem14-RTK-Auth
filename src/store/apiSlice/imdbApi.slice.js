import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graph.imdbapi.dev/v1',
  // uri: 'https://cors-anywhere.herokuapp.com/https://graph.imdbapi.dev/v1',
  cache: new InMemoryCache(),
  // Thêm header Authorization (nếu cần) trong phần headers của Apollo Client
  // headers: {
  //   Authorization: 'ApiKey {YOUR_API_KEY}',
  // },
});

const GET_IMDB_DETAILS = gql`
  query queryWithVariables($id: ID!) {
    title(id: $id) {
      id
      rating {
        aggregate_rating
      }
    }
  }
`;

const useGetImdbDetails = (imdbId) => {
  const { loading, error, data } = useQuery(GET_IMDB_DETAILS, {
    variables: { id: imdbId },
    client: client,
    skip: !imdbId || imdbId === "", // Bỏ qua query nếu imdbId không hợp lệ
  });
  return { loading, error, data };
};
export default useGetImdbDetails;