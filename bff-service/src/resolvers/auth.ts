import authConnector from '../helpers/authConnector';
import { LoginInput, AuthRes } from '../interfaces/auth';

const resolvers = {
  Mutation: {
    login: (_: void, args: { input: LoginInput }): Promise<AuthRes> => authConnector(args.input),
  },
};

export default resolvers;
