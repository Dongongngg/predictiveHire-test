import { Router } from 'express';
import { getCompanys } from '../controllers/company';

const router: Router = Router();

router.get('/companys', getCompanys);

export default router;
