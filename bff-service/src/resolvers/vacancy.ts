import { restConnector } from '../connectors/connectors';
import { VacancyInput, RestRes } from '../interfaces/vacancy';

const restUrl = 'http://localhost:5000/api/';

// restConnector:
//    method: string,
//    url: string,
//    id?: string,
//    input?: VacancyInput

const resolvers = {
  Query: {
    greeting: (): string => 'this is vacancy',
    getVacancys: (): Promise<RestRes> =>
      restConnector('GET', restUrl + 'vacancys', undefined, undefined),
    getVacancy: (_: void, args: { _id: string }): Promise<RestRes> =>
      restConnector('GET', restUrl + 'vacancy/', args._id, undefined),
  },
  Mutation: {
    createVacancy: (_: void, args: { input: VacancyInput }): Promise<RestRes> =>
      restConnector('POST', restUrl + 'vacancy/', undefined, args.input),
    deleteVacancy: (_: void, args: { _id: string }): Promise<RestRes> =>
      restConnector('DELETE', restUrl + 'vacancy/', args._id, undefined),
    updateVacancy: (_: void, args: { _id: string; input: VacancyInput }): Promise<RestRes> =>
      restConnector('PUT', restUrl + 'vacancy/', args._id, args.input),
  },
};

export default resolvers;
