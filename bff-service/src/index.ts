import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';

// typeDefs
import typeDefs from './typeDefs';
//  resolvers
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  formatError: (err) => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith('Field ')) {
      return new Error('Input format error');
    } else if (err.message.startsWith('Cast to ObjectId failed for value')) {
      throw new Error('id format error');
    }
    return err;
  },
});

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server listening on http://localhost:4000${server.graphqlPath}`),
);
