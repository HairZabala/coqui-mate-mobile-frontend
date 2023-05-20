import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { apolloDevToolsInit } from 'react-native-apollo-devtools-client';
import Config from 'react-native-config';
import { LOGOUT } from './features/auth/store/authTypes';
import store from './store';
import logError from './utils/logError';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import apolloLogger from 'apollo-link-logger';

const httpLink = createHttpLink({
  uri: Config.API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from redux store if it exists

  const {
    auth: { authToken },
  } = store.getState();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(logError);
  }

  if (
    graphQLErrors &&
    graphQLErrors.length > 0 &&
    (graphQLErrors[0].message.toLowerCase() === 'unauthorized' ||
      graphQLErrors[0].message.toLowerCase() === 'unauthorised')
  ) {
    if (graphQLErrors[0].message[0] !== 'me') {
      console.debug('API authentication error, logging out user');

      store.dispatch({
        type: LOGOUT,
        payload: null,
      });
    }
  }

  if (networkError) {
    if (__DEV__) {
      console.error('Network error occurred', { networkError });
    }
    // TODO: show a toast warning
  }
});

const retryLink = new RetryLink();

const cache = new InMemoryCache();

let links: ApolloLink;
if (__DEV__) {
  // httpLink must be last
  links = ApolloLink.from([errorLink, retryLink, authLink, apolloLogger, httpLink]);
} else {
  links = ApolloLink.from([errorLink, retryLink, authLink, httpLink]);
}

const client = new ApolloClient({
  link: links,
  cache: cache,
  connectToDevTools: true,
});

if (__DEV__) {
  apolloDevToolsInit(client);
}

export default client;
