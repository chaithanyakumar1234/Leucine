import { Router } from 'express';
import {
  createAccessRequest,
  updateRequestStatus,
  listPendingRequests,
} from '../controllers/requestController';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// POST /api/requests
router.post('/', authenticate, authorizeRoles('Employee'), createAccessRequest);

// PATCH /api/requests/:id
router.patch('/:id', authenticate, authorizeRoles('Manager'), updateRequestStatus);

// GET /api/requests/pending
router.get('/pending', authenticate, authorizeRoles('Manager'), listPendingRequests);

export default router;
