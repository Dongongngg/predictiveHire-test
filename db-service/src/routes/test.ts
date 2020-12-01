import { Router } from 'express';
import { getCompanys, addSeedCompany } from '../controllers/test';

const router: Router = Router();

router.get('/api/companys', getCompanys);
router.post('/test/company/seed', addSeedCompany);

export default router;
