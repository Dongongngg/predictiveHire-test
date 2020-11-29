import { LoginInput, AuthRes } from '../interfaces/auth';
import fetch from 'node-fetch';

const authConnector = async (input: LoginInput): Promise<AuthRes> => {
  const data: AuthRes = await fetch('http://localhost:8000/auth/login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
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

export default authConnector;
