import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

import App from '../App/App';

const PORT = 4000;
const BASE = process.env.REACT_APP_API_URL || `http://localhost:${PORT}`;
const HOST = `${BASE}/api`;
const HOST_WS = HOST.replace(/^http/, 'ws');

// Create an http link:
const httpLink = new HttpLink({ uri: `${HOST}/graphql` });

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `${HOST_WS}/subscriptions`,
  options: {
    reconnect: true,
    reconnectionAttempts: 4,
  },
});

// Split based on operation type:
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Apollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Apollo;
