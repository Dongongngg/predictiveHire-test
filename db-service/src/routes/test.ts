import { Router } from 'express';
import { getCompanys, addCompany } from '../controllers/test';

const router: Router = Router();

router.get('/test/companys', getCompanys);
router.post('/test/company', addCompany);

export default router;
