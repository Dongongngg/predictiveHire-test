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
// @route   POST /test/company/seed
// @access  test

const addSeedCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const company: MyCompany[] = await Company.find({ name: 'PredictiveHire' });

    if (company.length === 0) {
      const PH: MyCompany = new Company({
        name: 'PredictiveHire',
        address: '15 Newton St',
      });

      const seed: MyCompany = await Company.create(PH);

      res.status(200).json({ success: true, data: seed });
    } else {
      res.status(401).json({ success: false, data: 'seed exist' });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export { getCompanys, addSeedCompany };
