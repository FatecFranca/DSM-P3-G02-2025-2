import { Router } from 'express';
import clienteController from '../controllers/clienteController.js';
import { clienteValidators, validate } from '../utils/validators.js';
import { authenticateToken, isCliente } from '../middlewares/auth.js';

const router = Router();

router.get('/', authenticateToken, clienteController.getAll);
router.get('/:id', authenticateToken, clienteController.getById);
router.post('/', clienteValidators.create, validate, clienteController.create);
router.put('/:id', authenticateToken, isCliente, clienteValidators.update, validate, clienteController.update);
router.delete('/:id', authenticateToken, isCliente, clienteController.delete);

export default router;
