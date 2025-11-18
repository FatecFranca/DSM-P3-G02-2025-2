import { Router } from 'express';
import authRoutes from './authRoutes.js';
import artistaRoutes from './artistaRoutes.js';
import clienteRoutes from './clienteRoutes.js';
import produtoRoutes from './produtoRoutes.js';
import eventoRoutes from './eventoRoutes.js';
import pedidoRoutes from './pedidoRoutes.js';
import fornecedorRoutes from './fornecedorRoutes.js';

const router = Router();

// API info
router.get('/', (req, res) => {
  res.json({
    message: 'Sonora API - Artist Management Platform',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      artistas: '/api/artistas',
      clientes: '/api/clientes',
      produtos: '/api/produtos',
      eventos: '/api/eventos',
      pedidos: '/api/pedidos',
      fornecedores: '/api/fornecedores'
    }
  });
});

// Routes
router.use('/auth', authRoutes);
router.use('/artistas', artistaRoutes);
router.use('/clientes', clienteRoutes);
router.use('/produtos', produtoRoutes);
router.use('/eventos', eventoRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/fornecedores', fornecedorRoutes);

export default router;
