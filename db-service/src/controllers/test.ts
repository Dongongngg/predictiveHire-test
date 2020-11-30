import { Response, Request } from 'express';
import { MyCompany } from '../types/company';
import Company from '../models/company';

// @desc    get all companys
// @route   GET /test/companys
// @access  test

const getCompanys = async (req: Request, res: Response): Promise<void> => {
  try {
    const companys: MyCompany[] = await Company.find();
    res.status(200).json({ success: true, data: companys });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    create all companys
// @route   POST /test/company
// @access  test

const addCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const company: MyCompany = new Company({
      name: body.name,
      location: body.location,
    });

    const newCompany: MyCompany = await Company.create(company);

    res.status(201).json({ success: true, data: newCompany });
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export { getCompanys, addCompany };
