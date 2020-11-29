import fetch from 'node-fetch';
import { VacancyInput, RestRes } from '../interfaces/vacancy';

//  Use Graphql as wrapper to send rest api request

export const restConnector = async (
  method: string,
  url: string,
  id?: string,
  input?: VacancyInput,
): Promise<RestRes> => {
  const data: RestRes = await fetch(id ? url + id : url, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        return data;
      } else {
        throw new Error(data.data);
      }
    })
    .catch((error) => {
      if (error.message.includes('Cast to ObjectId failed for value')) {
        throw new Error('id format error');
      }
    });

  return data;
};
