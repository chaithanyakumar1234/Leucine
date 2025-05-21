import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Software } from '../entities/Software';

const softwareRepo = AppDataSource.getRepository(Software);

export const createSoftware = async (req: Request, res: Response) => {
  try {
    const { name, description, accessLevels } = req.body;
    const software = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(software);
    res.status(201).json({ message: 'Software created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create software', details: err });
  }
};
export const getAllSoftware = async (_: Request, res: Response) => {
  const all = await softwareRepo.find();
  res.json(all);
};
