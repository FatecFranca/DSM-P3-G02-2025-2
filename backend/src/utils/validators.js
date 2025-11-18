import { body, param, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Artista validators
export const artistaValidators = {
  create: [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('telefone').optional().trim(),
    body('genero_musical').optional().trim(),
    body('bio').optional().trim(),
    body('rede_social').optional().isArray()
  ],
  update: [
    param('id').isMongoId().withMessage('ID inválido'),
    body('nome').optional().trim().notEmpty(),
    body('email').optional().isEmail(),
    body('telefone').optional().trim(),
    body('genero_musical').optional().trim(),
    body('bio').optional().trim(),
    body('rede_social').optional().isArray()
  ]
};

// Cliente validators
export const clienteValidators = {
  create: [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('cpf').trim().notEmpty().withMessage('CPF é obrigatório'),
    body('dataNascimento').isISO8601().withMessage('Data de nascimento inválida'),
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('telefone').optional().trim(),
    body('endereco').optional().trim()
  ],
  update: [
    param('id').isMongoId().withMessage('ID inválido'),
    body('nome').optional().trim().notEmpty(),
    body('telefone').optional().trim(),
    body('endereco').optional().trim()
  ]
};

// Produto validators
export const produtoValidators = {
  create: [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('preco').isFloat({ min: 0 }).withMessage('Preço deve ser maior ou igual a 0'),
    body('estoque').isInt({ min: 0 }).withMessage('Estoque deve ser maior ou igual a 0'),
    body('descricao').optional().trim(),
    body('artista_id').isMongoId().withMessage('ID do artista inválido')
  ],
  update: [
    param('id').isMongoId().withMessage('ID inválido'),
    body('nome').optional().trim().notEmpty(),
    body('preco').optional().isFloat({ min: 0 }),
    body('estoque').optional().isInt({ min: 0 }),
    body('descricao').optional().trim()
  ]
};

// Evento validators
export const eventoValidators = {
  create: [
    body('data').isISO8601().withMessage('Data inválida'),
    body('local').trim().notEmpty().withMessage('Local é obrigatório'),
    body('preco_ingresso').isFloat({ min: 0 }).withMessage('Preço do ingresso inválido'),
    body('descricao').optional().trim(),
    body('artista_id').isMongoId().withMessage('ID do artista inválido')
  ],
  update: [
    param('id').isMongoId().withMessage('ID inválido'),
    body('data').optional().isISO8601(),
    body('local').optional().trim().notEmpty(),
    body('preco_ingresso').optional().isFloat({ min: 0 }),
    body('descricao').optional().trim()
  ]
};

// Pedido validators
export const pedidoValidators = {
  create: [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('cliente_id').isMongoId().withMessage('ID do cliente inválido'),
    body('items').isArray({ min: 1 }).withMessage('Pedido deve ter pelo menos um item'),
    body('items.*.produto_id').isMongoId().withMessage('ID do produto inválido'),
    body('items.*.quantidade').isInt({ min: 1 }).withMessage('Quantidade deve ser maior que 0')
  ]
};

// Fornecedor validators
export const fornecedorValidators = {
  create: [
    body('razao_social').trim().notEmpty().withMessage('Razão social é obrigatória'),
    body('cnpj').trim().notEmpty().withMessage('CNPJ é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('endereco').trim().notEmpty().withMessage('Endereço é obrigatório'),
    body('nome_fantasia').optional().trim(),
    body('telefone').optional().trim()
  ],
  update: [
    param('id').isMongoId().withMessage('ID inválido'),
    body('razao_social').optional().trim().notEmpty(),
    body('email').optional().isEmail(),
    body('endereco').optional().trim(),
    body('nome_fantasia').optional().trim(),
    body('telefone').optional().trim()
  ]
};
