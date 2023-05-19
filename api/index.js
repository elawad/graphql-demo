import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { graphql, execute, subscribe } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import graphQLSchema from './_graphql/schema.js';

const MSG = 'GraphQL Server 🚀';
const PORT = 4000;
const HOST = process.env.REACT_APP_API_URL || `http://localhost:${PORT}`;
const HOST_WS = HOST.replace(/^http/, 'ws');

const app = express();

// Cache
app.use((req, res, next) => {
  const { method, originalUrl } = req;
  if (method === 'POST' && originalUrl === '/api/graphql') {
    res.setHeader('Cache-Control', 's-maxage=3600');
  }
  next();
});

// GraphQL
app.use('/api/graphql',
  cors(),
  bodyParser.json(),
  graphqlExpress({ schema: graphQLSchema })
);

// GraphQL UI
app.get('/api/graphiql',
  graphiqlExpress({
    endpointURL: '/api/graphql',
    subscriptionsEndpoint: `${HOST_WS}/api/subscriptions`,
  })
);

// Serve sample data
app.get('/api/data', async (req, res) => {
  const query = '{ image(id: 2) { name likes urlSm } }';
  const meta = await graphql(graphQLSchema, query);
  const data = JSON.stringify(meta, null, 4);

  res.send(`${MSG}<br/><br/><pre style='white-space: pre-wrap;'>${data}</pre>`);
});

// GraphQL Subscriptions
const ws = createServer(app);
ws.listen(PORT, () => {
  console.log(`${MSG}\n${HOST}/api/graphiql`);

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

export default app;
