import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';

import GraphQLSchema from './src/graphql/schema';
import { fetchAssetById } from './src/api';

const MSG = 'GraphQL Server 🚀';
const PORT = 4000;
const app = express();

app.use('/graphql', cors(), graphqlHTTP({
  schema: GraphQLSchema,
  graphiql: true,
}));

app.get('/', async (req, res) => {
  const meta = await fetchAssetById(40811); // 40811 // 1000111
  const data = JSON.stringify(meta, null, 4);
  res.send(`${MSG} <br/><br/> <pre>${data}</pre>`);
});

app.listen(PORT, () => (
  console.log(`${MSG}\nhttp://localhost:${PORT}`)
));


// const root = {
//   postTitle: () => 'Build a Simple GraphQL Server With Express and NodeJS',
//   blogTitle: () => 'scotch.io'
// };
// rootValue: root,
// graphiql: true,
