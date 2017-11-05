import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphql } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import graphQLSchema from './src/graphql-img/schema';

const MSG = 'GraphQL Server 🚀';
const PORT = 4000;
const app = express();

app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({
  schema: graphQLSchema,
}));

app.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.get('/', async (req, res) => {
  const query = '{ image(id: 2) { name likes url } }';
  const meta = await graphql(graphQLSchema, query);
  const data = JSON.stringify(meta, null, 4);

  res.send(`${MSG} <br/><br/> <pre>${data}</pre>`);
});

app.listen(PORT, () => {
  const URL = `http://localhost:${PORT}`;
  console.log(`${MSG}\nAPI: ${URL}\nGQL: ${URL}/graphiql`);
});
