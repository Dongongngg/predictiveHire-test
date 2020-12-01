import { Response, Request } from 'express';
import User from '../models/user';
import { MyUser } from '../types/user';

// @desc    get all users
// @route   GET /auth/users
// @access  test

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

// @desc    create an user
// @route   POST /auth/user
// @access  test

const addSeedUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const seedNames = ['bob', 'mark'];
    const users = await User.find({ username: { $in: seedNames } });

    if (users.length === 0) {
      const bob: MyUser = new User({
        name: 'Bob Markle',
        username: 'bob',
        password: 'bob',
        roles: ['user'],
      });
      const mark: MyUser = new User({
        name: 'Mark Smith',
        username: 'mark',
        password: 'mark',
        roles: ['admin'],
      });

      const seed: MyUser[] = await User.insertMany([bob, mark]);
      res.status(200).json({ success: true, data: seed });
    } else {
      res.status(401).json({ success: false, data: 'seed exist' });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export { getAllUsers, addSeedUser };
