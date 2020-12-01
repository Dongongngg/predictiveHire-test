//  generate seed user for testing
import { Router } from 'express';
import { addSeedUser } from '../controllers/user';

const router: Router = Router();

router.post('/test/user/seed', addSeedUser);

export default router;
