import { Router } from 'express';
import artistaController from '../controllers/artistaController.js';
import { artistaValidators, validate } from '../utils/validators.js';
import { authenticateToken, isArtist } from '../middlewares/auth.js';

const router = Router();

router.get('/', artistaController.getAll);
router.get('/:id', artistaController.getById);
router.post('/', artistaValidators.create, validate, artistaController.create);
router.put('/:id', authenticateToken, isArtist, artistaValidators.update, validate, artistaController.update);
router.delete('/:id', authenticateToken, isArtist, artistaController.delete);

export default router;
