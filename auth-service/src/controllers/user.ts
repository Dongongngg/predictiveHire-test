import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { MyUser } from '../types/user';

// @desc    login
// @route   POST /auth/login
// @access  public

const login = async (req: Request, res: Response): Promise<void> => {
  // Check if user exist
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
      .header('auth-token', newToken)
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

// @desc    get all users
// @route   GET /auth/users
// @access  test

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
  }
};

// @desc    create an user
// @route   POST /auth/user
// @access  test

const addUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newUser: MyUser = new User({
      name: 'james',
      username: 'james',
      password: '111111',
      roles: ['admin'],
    });

    const users: MyUser = await User.create(newUser);
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
  }
};

export { login, getAllUsers, addUser };
