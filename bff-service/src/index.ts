import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
//  jwt
import jwt from 'jsonwebtoken';

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

    // try to retrieve a user with the token
    const role: string = req.header('role') || '';
    if (!token) {
      return { loggedIn: false, role: '' };
    } else {
      try {
        // try to verify token
        const payload = jwt.verify(token, '91sd2ej91jdojlaqjsd');
        console.log(payload);

        if (payload) {
          return { loggedIn: true, role: role };
        } else {
          return { loggedIn: false, role: '' };
        }
      } catch (err) {
        return err;
      }
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
