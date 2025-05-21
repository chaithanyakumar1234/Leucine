import { Router } from 'express';
import { createSoftware } from '../controllers/softwareController';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// POST /api/software
router.post('/', authenticate, authorizeRoles('Admin'), createSoftware);

export default router;
