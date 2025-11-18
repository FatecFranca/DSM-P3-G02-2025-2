import { Router } from 'express';
import fornecedorController from '../controllers/fornecedorController.js';
import { fornecedorValidators, validate } from '../utils/validators.js';
import { authenticateToken, isArtist } from '../middlewares/auth.js';

const router = Router();

router.get('/', authenticateToken, fornecedorController.getAll);
router.get('/:id', authenticateToken, fornecedorController.getById);
router.post('/', authenticateToken, isArtist, fornecedorValidators.create, validate, fornecedorController.create);
router.put('/:id', authenticateToken, isArtist, fornecedorValidators.update, validate, fornecedorController.update);
router.delete('/:id', authenticateToken, isArtist, fornecedorController.delete);

// Manage supplier-product relationship
router.post('/:id/produtos', authenticateToken, isArtist, fornecedorController.addProduto);
router.delete('/:id/produtos/:produto_id', authenticateToken, isArtist, fornecedorController.removeProduto);

export default router;
