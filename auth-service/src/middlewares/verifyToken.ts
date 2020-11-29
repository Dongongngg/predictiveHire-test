import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface Payload {
  _id: string;
  username: string;
}

const tokenValidator = (req: Request, res: Response, next: NextFunction): Response | void => {
  const token: string | undefined = req.header('auth-token');
  if (!token) {
    return res.status(401).send('unauthorized');
  } else {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET || '') as Payload;
      return next();
    } catch (err) {
      return res.status(401).send('unauthorized');
    }
  }
};

export { tokenValidator };
