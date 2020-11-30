import dbConnector from '../helpers/dbConnector';
import { VacancyInput, RestRes } from '../interfaces/db';

const restUrl = 'http://localhost:5000/api/';

// dbConnector:
//   { method: string,
//    url: string,
//    id?: string,
//    input?: VacancyInput}

const resolvers = {
  Query: {
    test: (): string => 'connected',
    getVacancys: (): Promise<RestRes> => dbConnector({ method: 'GET', url: restUrl + 'vacancys' }),
    getVacancy: (_: void, args: { _id: string }): Promise<RestRes> =>
      dbConnector({ method: 'GET', url: restUrl + 'vacancy/', id: args._id }),
  },
  Mutation: {
    createVacancy: (_: void, args: { input: VacancyInput }): Promise<RestRes> =>
      dbConnector({ method: 'POST', url: restUrl + 'vacancy/', input: args.input }),
    deleteVacancy: (_: void, args: { _id: string }): Promise<RestRes> =>
      dbConnector({ method: 'DELETE', url: restUrl + 'vacancy/', id: args._id }),
    updateVacancy: (_: void, args: { _id: string; input: VacancyInput }): Promise<RestRes> =>
      dbConnector({ method: 'PUT', url: restUrl + 'vacancy/', id: args._id, input: args.input }),
  },
};

export default resolvers;
