import { Router } from 'express';
import { getVacancys, addVacancy, updateVacancy, deleteVacancy } from '../controllers/vacancy';

const router: Router = Router();

router.get('/vacancys', getVacancys);
router.post('/vacancy', addVacancy);
router.put('/vacancy/:id', updateVacancy);
router.delete('/vacancy/:id', deleteVacancy);

export default router;
