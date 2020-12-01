import { Router } from 'express';
import { createToken } from '../controllers/token';
import { getAllUsers } from '../controllers/user';

const router: Router = Router();

router.post('/auth/login', createToken);
router.get('/auth/users', getAllUsers);

export default router;
