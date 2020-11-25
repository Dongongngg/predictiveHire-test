import { Response, Request } from 'express';
import { MyCompany } from '../types/company';
import Company from '../models/company';

// @desc    get all companys
// @route   GET /companys
// @access  public

const getCompanys = async (req: Request, res: Response): Promise<void> => {
  try {
    const companys: MyCompany[] = await Company.find();
    res.status(200).json({ success: true, data: companys });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { getCompanys };
