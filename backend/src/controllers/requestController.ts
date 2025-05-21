import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Request as AccessRequest } from '../entities/Request';
import { Software } from '../entities/Software';
import { User } from '../entities/User';

const requestRepo = AppDataSource.getRepository(AccessRequest);
const softwareRepo = AppDataSource.getRepository(Software);
const userRepo = AppDataSource.getRepository(User);

export const createAccessRequest = async (req: Request, res: Response) => {
  try {
    const { softwareId, accessType, reason } = req.body;
    const userId = (req as any).user.id;

    const software = await softwareRepo.findOneByOrFail({ id: softwareId });
    const user = await userRepo.findOneByOrFail({ id: userId });

    const accessRequest = requestRepo.create({
      software,
      user,
      accessType,
      reason,
      status: 'Pending',
    });

    await requestRepo.save(accessRequest);
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create request', details: err });
  }
};

export const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    const requestId = parseInt(req.params.id);
    const { status } = req.body; // 'Approved' or 'Rejected'

    const request = await requestRepo.findOneByOrFail({ id: requestId });
    request.status = status;
    await requestRepo.save(request);

    res.json({ message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update request', details: err });
  }
};

export const listPendingRequests = async (_: Request, res: Response) => {
  try {
    const pendingRequests = await requestRepo.findBy({ status: 'Pending' });
    res.json(pendingRequests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests', details: err });
  }
};
