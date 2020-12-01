import fetch from 'node-fetch';
import { VacancyInput, RestRes, AuthInfo } from '../interfaces/db';

//  Use Graphql as wrapper to send rest api request

interface connectorOption {
  method: string;
  url: string;
  id?: string;
  input?: VacancyInput;
}

const dbConnector = async (option: connectorOption, context: AuthInfo): Promise<RestRes | void> => {
  console.log('ctx', context);

  if (!context.loggedIn) {
    throw new Error('Please login');
  } else {
    const data: RestRes = await fetch(option.id ? option.url + option.id : option.url, {
      method: option.method,
      headers: {
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
  }
};

const dbConnectorAdmin = async (
  option: connectorOption,
  context: AuthInfo,
): Promise<RestRes | void> => {
  if (!context.loggedIn) {
    throw new Error('Please login');
  } else {
    if (context.role.includes('admin')) {
      const data: RestRes = await fetch(option.id ? option.url + option.id : option.url, {
        method: option.method,
        headers: {
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
    } else {
      throw new Error('Use is not admin');
    }
  }
};

export { dbConnector, dbConnectorAdmin };
