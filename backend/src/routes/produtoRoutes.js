import { Router } from 'express';
import produtoController from '../controllers/produtoController.js';
import { produtoValidators, validate } from '../utils/validators.js';
import { authenticateToken, isArtist } from '../middlewares/auth.js';

const router = Router();

router.get('/', produtoController.getAll);
router.get('/:id', produtoController.getById);
router.post('/', authenticateToken, isArtist, produtoValidators.create, validate, produtoController.create);
router.put('/:id', authenticateToken, isArtist, produtoValidators.update, validate, produtoController.update);
router.patch('/:id/estoque', authenticateToken, isArtist, produtoController.updateEstoque);
router.delete('/:id', authenticateToken, isArtist, produtoController.delete);

export default router;
