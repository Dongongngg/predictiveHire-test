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
    if (err.message.startsWith('Field ' || 'invalid json response body')) {
      return new Error('Input format error');
    } else if (err.message.startsWith('Cast to ObjectId failed for value')) {
      throw new Error('id format error');
    }
    return err;
  },
  context: ({ req }) => {
    // get token from the headers
    const token: string = req.header('authToken') || '';
    console.log('token', req.headers);

    // try to retrieve a user with the token
    const role: string = req.header('role') || '';

    if (token) {
      return { loggedIn: true, role: role };
    } else {
      return { loggedIn: false, role: role };
    }
  },
});

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

server.applyMiddleware({ app });
const PORT = { port: 4000 };
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT.port}${server.graphqlPath}`),
);
