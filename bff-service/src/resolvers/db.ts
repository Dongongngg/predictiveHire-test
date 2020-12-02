// define all the query and mutation for db-service

import { dbConnector, dbConnectorAdmin } from '../helpers/dbConnector';
import { VacancyInput, RestRes, AuthInfo } from '../interfaces/db';

//  dbConnector/dbConnectorAdmin:
//     { method,url,id,input},
//      context

// const url = 'http://localhost:5000/api/';
const url = 'http://db-service:5000/api/';

const resolvers = {
  Query: {
    test: (): string => 'working',
    getVacancys: (_: void, args: void, ctx: AuthInfo): Promise<RestRes | void> =>
      dbConnector({ method: 'GET', url: url + 'vacancys' }, ctx),
    getVacancy: (_: void, args: { _id: string }, ctx: AuthInfo): Promise<RestRes | void> =>
      dbConnector({ method: 'GET', url: url + 'vacancy/', id: args._id }, ctx),
  },
  Mutation: {
    createVacancy: (
      _: void,
      args: { input: VacancyInput },
      ctx: AuthInfo,
    ): Promise<RestRes | void> =>
      dbConnectorAdmin(
        {
          method: 'POST',
          url: url + 'vacancy/',
          input: args.input,
        },
        ctx,
      ),
    deleteVacancy: (_: void, args: { _id: string }, ctx: AuthInfo): Promise<RestRes | void> =>
      dbConnectorAdmin(
        {
          method: 'DELETE',
          url: url + 'vacancy/',
          id: args._id,
        },
        ctx,
      ),
    updateVacancy: (
      _: void,
      args: { _id: string; input: VacancyInput },
      ctx: AuthInfo,
    ): Promise<RestRes | void> =>
      dbConnectorAdmin(
        {
          method: 'PUT',
          url: url + 'vacancy/',
          id: args._id,
          input: args.input,
        },
        ctx,
      ),
  },
};

export default resolvers;
