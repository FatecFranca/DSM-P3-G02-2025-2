import { Router } from 'express';
import eventoController from '../controllers/eventoController.js';
import { eventoValidators, validate } from '../utils/validators.js';
import { authenticateToken, isArtist } from '../middlewares/auth.js';

const router = Router();

router.get('/', eventoController.getAll);
router.get('/upcoming', eventoController.getUpcoming);
router.get('/:id', eventoController.getById);
router.post('/', authenticateToken, isArtist, eventoValidators.create, validate, eventoController.create);
router.put('/:id', authenticateToken, isArtist, eventoValidators.update, validate, eventoController.update);
router.delete('/:id', authenticateToken, isArtist, eventoController.delete);

export default router;
