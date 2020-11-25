import { Response, Request } from 'express';
import { MyUser } from '../types/user';
import User from '../models/user';

// @desc    get all users
// @route   GET /users
// @access  public

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: MyUser[] = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { getUsers };
