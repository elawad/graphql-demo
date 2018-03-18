import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { graphql, execute, subscribe } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import graphQLSchema from './src/graphql-img/schema';

const MSG = 'GraphQL Server 🚀';
const PORT = 4000;
const server = express();

// GraphQL
server.use('/graphql', cors(), bodyParser.json(), graphqlExpress({
  schema: graphQLSchema,
}));

server.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
}));

// Serve client site
if (process.env.NODE_ENV === 'production') {
  server.use(express.static('../client/build'));
} else {
// Serve sample data
  server.get('/', async (req, res) => {
    const query = '{ image(id: 2) { name likes url } }';
    const meta = await graphql(graphQLSchema, query);
    const data = JSON.stringify(meta, null, 4);

    res.send(`${MSG} <br/><br/> <pre style='overflow:hidden'>${data}</pre> ${process.env.NODE_ENV}`);
  });
}

// Wrap the Express server
const ws = createServer(server);
ws.listen(PORT, () => {
  const URL = `http://localhost:${PORT}`;
  console.log(`${MSG}\nApp: ${URL}\nGQL: ${URL}/graphiql`);

  // Set up WebSocket for handling GraphQL subscriptions
  return new SubscriptionServer({
    execute,
    subscribe,
    schema: graphQLSchema,
  }, {
    server: ws,
    path: '/subscriptions',
  });
});
