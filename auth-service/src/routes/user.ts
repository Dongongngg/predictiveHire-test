import { Router } from 'express';
import { login, getAllUsers, addUser } from '../controllers/user';

const router: Router = Router();

router.post('/auth/login', login);
router.post('/auth/user', addUser);
router.get('/auth/users', getAllUsers);

export default router;
