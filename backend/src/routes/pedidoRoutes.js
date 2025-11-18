import { Router } from 'express';
import pedidoController from '../controllers/pedidoController.js';
import { pedidoValidators, validate } from '../utils/validators.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

router.get('/', authenticateToken, pedidoController.getAll);
router.get('/:id', authenticateToken, pedidoController.getById);
router.post('/', authenticateToken, pedidoValidators.create, validate, pedidoController.create);
router.patch('/:id/status', authenticateToken, pedidoController.updateStatus);
router.patch('/:id/cancel', authenticateToken, pedidoController.cancel);
router.delete('/:id', authenticateToken, pedidoController.delete);

export default router;
