//  CRUD of mongodb

import { Router } from 'express';
import {
  getVacancys,
  getVacancyById,
  addVacancy,
  updateVacancy,
  deleteVacancy,
} from '../controllers/vacancy';

const router: Router = Router();

router.get('/api/vacancys', getVacancys);
router.post('/api/vacancy', addVacancy);
router.get('/api/vacancy/:id', getVacancyById);
router.put('/api/vacancy/:id', updateVacancy);
router.delete('/api/vacancy/:id', deleteVacancy);

export default router;
