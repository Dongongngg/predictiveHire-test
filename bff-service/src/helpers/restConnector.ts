import fetch from 'node-fetch';
import { VacancyInput, RestRes } from '../interfaces/db';

//  Use Graphql as wrapper to send rest api request

interface connectorOption {
  method: string;
  url: string;
  id?: string;
  input?: VacancyInput;
}

const restConnector = async (option: connectorOption): Promise<RestRes> => {
  const data: RestRes = await fetch(option.id ? option.url + option.id : option.url, {
    method: option.method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(option.input),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        return data;
      } else {
        return new Error(data.data);
      }
    })
    .catch((error) => error);

  return data;
};

export default restConnector;
