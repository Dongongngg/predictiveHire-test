import { Response, Request } from 'express';
import { MyVacancy } from '../types/vacancy';
import Vacancy from '../models/vacancy';

// @desc    get all vacancys
// @route   GET /vacancys
// @access  all user

const getVacancys = async (req: Request, res: Response): Promise<void> => {
  try {
    const allVacancys: MyVacancy[] = await Vacancy.find();
    res.status(200).json({ success: true, data: allVacancys });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    create an vacancy
// @route   POST /vacancy
// @access  admin user

const addVacancy = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<MyVacancy, 'title' | 'description' | 'expiredAt'>;

    const vacancy: MyVacancy = new Vacancy({
      title: body.title,
      description: body.description,
      expiredAt: body.expiredAt,
    });

    const newVacancy: MyVacancy = await Vacancy.create(vacancy);

    res.status(201).json({ message: 'Vancancy added', data: newVacancy });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    edit an vacancy
// @route   PUT /vacancy/:id
// @access  admin user

const updateVacancy = async (req: Request, res: Response): Promise<void> => {
  try {
    const vacancy: MyVacancy | null = await Vacancy.findById(req.params.id);
    console.log(req.params.id);

    if (!vacancy) {
      res.status(401).json({
        success: false,
        error: `No vacancy found by id:${req.params.id}`,
      });
    } else {
      const body = req.body as Pick<MyVacancy, 'title' | 'description' | 'expiredAt'>;
      const vacancy: MyVacancy = new Vacancy({
        title: body.title,
        description: body.description,
        expiredAt: body.expiredAt,
      });
      const newVacancy: MyVacancy | null = await vacancy.updateOne(vacancy);
      res.status(200).json({
        success: true,
        message: 'vacancy updated',
        data: newVacancy,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    delete an vacancy
// @route   DELETE /vacancy/:id
// @access  admin user

const deleteVacancy = async (req: Request, res: Response): Promise<void> => {
  try {
    const vacancy: MyVacancy | null = await Vacancy.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      data: vacancy,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      error: error.message,
    });
  }
};

export { getVacancys, updateVacancy, deleteVacancy, addVacancy };
