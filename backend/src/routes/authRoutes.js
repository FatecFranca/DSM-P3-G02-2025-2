import { Router } from 'express';
import authController from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/auth.js';
import { body } from 'express-validator';
import { validate, artistaValidators, clienteValidators } from '../utils/validators.js';

const router = Router();

// Login routes
router.post(
  '/artista/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').notEmpty().withMessage('Senha é obrigatória')
  ],
  validate,
  authController.loginArtista
);

router.post(
  '/cliente/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').notEmpty().withMessage('Senha é obrigatória')
  ],
  validate,
  authController.loginCliente
);

// Register routes
router.post(
  '/artista/register',
  artistaValidators.create,
  validate,
  authController.registerArtista
);

router.post(
  '/cliente/register',
  clienteValidators.create,
  validate,
  authController.registerCliente
);

// Get profile
router.get('/profile', authenticateToken, authController.getProfile);

export default router;
