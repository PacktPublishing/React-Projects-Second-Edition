import { createGlobalStyle } from 'styled-components';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from '../components/Header';

const GlobalStyle = createGlobalStyle` 
  body { 
    margin: 0; 
    padding: 0; 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", 
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", 
      sans-serif; 
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale; 
  } 
`;

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/api/graphql/',
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
