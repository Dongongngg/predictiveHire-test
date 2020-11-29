import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { MyUser } from '../types/user';

// @desc    login
// @route   POST /auth/login
// @access  public

const login = async (req: Request, res: Response): Promise<Response> => {
  // Check if user exist
  const loginUser = await User.findOne({ username: req.body.username });
  if (!loginUser) {
    return res.status(401).json({
      success: false,
      error: 'Username not exist.',
    });
  }
  //  Check if password is correct
  const loginPassword = await User.findOne({ password: req.body.password });
  if (!loginPassword) {
    return res.status(401).json({
      success: false,
      error: 'Password is wrong.',
    });
  } else {
    const newToken = jwt.sign({ _id: loginUser._id }, process.env.TOKEN_SECRET || '', {
      expiresIn: 3600,
    });

    return res.header('auth-token', newToken).status(200).json({
      success: true,
      id: loginUser._id,
      username: loginUser.username,
      token: newToken,
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
