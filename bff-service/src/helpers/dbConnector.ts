//  Use Graphql as wrapper to send request to db-service
//  Check if user as logged in and user's role
//  option: method of fetch, db-service url, request id, request data
//  this one is for all users

import fetch from 'node-fetch';
import { VacancyInput, RestRes, AuthInfo } from '../interfaces/db';
interface connectorOption {
  method: string;
  url: string;
  id?: string;
  input?: VacancyInput;
}

const dbConnector = async (option: connectorOption, context: AuthInfo): Promise<RestRes | void> => {
  //  check if logged in
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

//  this one is for admin, check information in context,  if  role has admin with end request to db-service

const dbConnectorAdmin = async (
  option: connectorOption,
  context: AuthInfo,
): Promise<RestRes | void> => {
  //  check if logged in
  if (!context.loggedIn) {
    throw new Error('Please login');
  } else {
    //   check if is admin
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
