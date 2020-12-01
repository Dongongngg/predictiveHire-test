import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface Payload {
  _id: string;
  username: string;
}

const tokenValidator = (req: Request, res: Response, next: NextFunction): void => {
  const token: string | undefined = req.header('authToken');
  if (!token) {
    res.status(401).send('unauthorized');
  } else {
    try {
      const profile = jwt.verify(token, process.env.TOKEN_SECRET || '') as Payload;

      next();
    } catch (err) {
      res.status(401).send('unauthorized');
    }
  }
};

export { tokenValidator };
