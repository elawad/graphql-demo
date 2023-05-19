import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { graphql, execute, subscribe } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import graphQLSchema from './graphql-img/schema.js';

const MSG = 'GraphQL Server 🚀';
const PORT = process.env.PORT || 4000;
const HOST = process.env.API_URL || `http://localhost:${PORT}`;
const HOST_WS = HOST.replace(/^http/, 'ws');

const server = express();

// GraphQL
server.use('/api/graphql', cors(), bodyParser.json(), graphqlExpress({
  schema: graphQLSchema,
}));

server.get('/api/graphiql', graphiqlExpress({
  endpointURL: '/api/graphql',
  subscriptionsEndpoint: `${HOST_WS}/api/subscriptions`,
}));

// Serve sample data
server.get('/api/data', async (req, res) => {
  const query = '{ image(id: 2) { name likes urlSm } }';
  const meta = await graphql(graphQLSchema, query);
  const data = JSON.stringify(meta, null, 4);

  res.send(`${MSG} <br/><br/> <pre style='overflow:hidden'>${data}</pre>`);
});

// Wrap the Express server
const ws = createServer(server);
ws.listen(PORT, () => {
  console.log(`${MSG}\nApp: ${HOST}/api\nGQL: ${HOST}/api/graphiql`);

  // Set up WebSocket for handling GraphQL subscriptions
  return new SubscriptionServer({
    execute,
    subscribe,
    schema: graphQLSchema,
  }, {
    server: ws,
    path: '/api/subscriptions',
  });
});

// Server Errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason.message);
  console.error(promise);
  process.exit(1);
});

export default server;
