import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

// @desc    login
// @route   POST /auth/login
// @access  public

const createToken = async (req: Request, res: Response): Promise<void> => {
  // Check if user exist
  console.log({ username: req.body.username });

  let loginUser = await User.findOne({ username: req.body.username });
  if (!loginUser) {
    res.status(401).json({
      success: false,
      data: 'Username not exist.',
    });
    return;
  }
  //  Check if password is correct
  loginUser = await User.findOne({ password: req.body.password });
  if (loginUser === null) {
    res.status(401).json({
      success: false,
      data: 'Password is wrong.',
    });
  } else {
    const newToken = jwt.sign({ _id: loginUser._id }, process.env.TOKEN_SECRET || '', {
      expiresIn: 3600,
    });

    res
      .header('authToken', newToken)
      .status(200)
      .json({
        success: true,
        data: {
          _id: loginUser._id,
          username: loginUser.username,
          name: loginUser.name,
          companyId: loginUser.companyId,
          roles: loginUser.roles,
          token: newToken,
        },
      });
  }
};

export { createToken };
