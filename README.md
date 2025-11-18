# DSM-P3-G02-2025-2 - Sonora Platform

Repositório do GRUPO 02 do Projeto Interdisciplinar do 3º semestre DSM 2025/2.

**Alunos:** Ana Laura Lis Oliveira Zenith, Eduardo Fernandes Grespi, Héricles Robert Mendes, João Marcos Landi Sousa.

---

## 📋 Sobre o Projeto

Sonora é uma plataforma de gerenciamento para artistas que permite:
- 🎤 Cadastro e gestão de perfis de artistas
- 🛍️ Venda de produtos (merchandising)
- 🎫 Gerenciamento de eventos e shows
- 👥 Sistema de clientes e pedidos
- 🏭 Controle de fornecedores

---

## 🚀 Tecnologias

### Backend
- **Node.js** + **Express.js** - API REST
- **Prisma ORM** - Gerenciamento de banco de dados
- **MongoDB** - Banco de dados NoSQL
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas

### Frontend
- **Next.js 16** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização

---

## 📁 Estrutura do Projeto

```
DSM-P3-G02-2025-2/
├── backend/              # API Backend
│   ├── src/
│   │   ├── controllers/  # Controladores HTTP
│   │   ├── services/     # Lógica de negócio
│   │   ├── routes/       # Rotas da API
│   │   ├── middlewares/  # Middlewares (auth, errors)
│   │   └── utils/        # Utilitários
│   ├── prisma/
│   │   └── schema.prisma # Esquema do banco de dados
│   └── package.json
│
├── frontend/             # Frontend Next.js
│   ├── app/             # Páginas e rotas
│   ├── components/      # Componentes React
│   ├── lib/            # API client e utilitários
│   ├── hooks/          # React hooks customizados
│   └── package.json
│
├── docs/               # Documentação
├── render.yaml        # Configuração Render
└── setup-render.sh    # Script de configuração
```

---

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### 1. Clone o Repositório
```bash
git clone https://github.com/FatecFranca/DSM-P3-G02-2025-2.git
cd DSM-P3-G02-2025-2
```

### 2. Configure o Backend

```bash
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Gere o Prisma Client
npm run prisma:generate

# Sincronize o schema com o banco
npm run prisma:push

# Inicie o servidor
npm run dev
```

Backend rodando em: `http://localhost:3001`

### 3. Configure o Frontend

```bash
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local

# Inicie o servidor
npm run dev
```

Frontend rodando em: `http://localhost:3000`

---

## 📚 Documentação Completa

### Backend API

#### Estrutura da API

A API segue o padrão **MVC + Service/Route**:
- **Routes**: Definem endpoints e aplicam middlewares
- **Controllers**: Lidam com requisições HTTP
- **Services**: Contêm lógica de negócio e operações de banco
- **Models**: Definidos no Prisma schema

#### Endpoints Principais

**Autenticação:**
```
POST   /api/auth/artista/register    # Registro de artista
POST   /api/auth/artista/login       # Login de artista
POST   /api/auth/cliente/register    # Registro de cliente
POST   /api/auth/cliente/login       # Login de cliente
GET    /api/auth/profile             # Perfil do usuário autenticado
```

**Artistas:**
```
GET    /api/artistas                 # Listar todos os artistas
GET    /api/artistas/:id             # Buscar artista por ID
POST   /api/artistas                 # Criar artista
PUT    /api/artistas/:id             # Atualizar artista
DELETE /api/artistas/:id             # Deletar artista
```

**Produtos:**
```
GET    /api/produtos                 # Listar produtos (filtros: artista_id, preço)
GET    /api/produtos/:id             # Buscar produto por ID
POST   /api/produtos                 # Criar produto (artista autenticado)
PUT    /api/produtos/:id             # Atualizar produto
PATCH  /api/produtos/:id/estoque     # Atualizar estoque
DELETE /api/produtos/:id             # Deletar produto
```

**Eventos:**
```
GET    /api/eventos                  # Listar eventos (filtros: artista_id, datas)
GET    /api/eventos/upcoming         # Próximos eventos
GET    /api/eventos/:id              # Buscar evento por ID
POST   /api/eventos                  # Criar evento (artista autenticado)
PUT    /api/eventos/:id              # Atualizar evento
DELETE /api/eventos/:id              # Deletar evento
```

**Pedidos:**
```
GET    /api/pedidos                  # Listar pedidos (filtros: cliente_id, status)
GET    /api/pedidos/:id              # Buscar pedido por ID
POST   /api/pedidos                  # Criar pedido (autenticado)
PATCH  /api/pedidos/:id/status       # Atualizar status do pedido
PATCH  /api/pedidos/:id/cancel       # Cancelar pedido
DELETE /api/pedidos/:id              # Deletar pedido
```

**Fornecedores:**
```
GET    /api/fornecedores             # Listar fornecedores
GET    /api/fornecedores/:id         # Buscar fornecedor por ID
POST   /api/fornecedores             # Criar fornecedor (artista autenticado)
PUT    /api/fornecedores/:id         # Atualizar fornecedor
DELETE /api/fornecedores/:id         # Deletar fornecedor
POST   /api/fornecedores/:id/produtos           # Adicionar produto ao fornecedor
DELETE /api/fornecedores/:id/produtos/:produto_id # Remover produto do fornecedor
```

#### Autenticação

A API usa JWT (JSON Web Tokens) para autenticação:

1. Registre-se ou faça login usando os endpoints de autenticação
2. Receba um token JWT na resposta
3. Inclua o token em requisições subsequentes:
   ```
   Authorization: Bearer <seu-token>
   ```

#### Tipos de Usuário

- **Artista**: Pode gerenciar produtos, eventos e fornecedores
- **Cliente**: Pode fazer pedidos e gerenciar seu perfil

#### Exemplos de Uso

**Registro de Cliente:**
```bash
curl -X POST http://localhost:3001/api/auth/cliente/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "cpf": "12345678900",
    "dataNascimento": "1990-05-15",
    "email": "maria@example.com",
    "senha": "senha123",
    "telefone": "11988888888"
  }'
```

**Login de Artista:**
```bash
curl -X POST http://localhost:3001/api/auth/artista/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }'
```

**Criar Produto (Autenticado):**
```bash
curl -X POST http://localhost:3001/api/produtos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "artista_id": "ID_DO_ARTISTA",
    "nome": "Camiseta Show 2025",
    "descricao": "Camiseta oficial",
    "preco": 59.90,
    "estoque": 100
  }'
```

#### Modelo de Dados

**Artista:**
```json
{
  "id": "string",
  "nome": "string",
  "genero_musical": "string?",
  "bio": "string?",
  "rede_social": ["string"],
  "email": "string",
  "telefone": "string?",
  "createdAt": "datetime"
}
```

**Cliente:**
```json
{
  "id": "string",
  "nome": "string",
  "cpf": "string",
  "dataNascimento": "datetime",
  "email": "string",
  "telefone": "string?",
  "endereco": "string?",
  "createdAt": "datetime"
}
```

**Produto:**
```json
{
  "id": "string",
  "artista_id": "string",
  "nome": "string",
  "descricao": "string?",
  "preco": "float",
  "estoque": "int",
  "createdAt": "datetime"
}
```

**Evento:**
```json
{
  "id": "string",
  "artista_id": "string",
  "data": "datetime",
  "local": "string",
  "descricao": "string?",
  "preco_ingresso": "float",
  "createdAt": "datetime"
}
```

**Pedido:**
```json
{
  "id": "string",
  "nome": "string",
  "data_hora": "datetime",
  "cliente_id": "string",
  "status": "string",
  "total": "float",
  "itensPedido": [
    {
      "produto_id": "string",
      "quantidade": "int",
      "preco_unitario": "float"
    }
  ]
}
```

#### Scripts Disponíveis

```bash
# Backend
npm run dev              # Servidor de desenvolvimento
npm start                # Servidor de produção
npm run prisma:generate  # Gerar Prisma Client
npm run prisma:push      # Sincronizar schema com DB
npm run prisma:studio    # Abrir Prisma Studio (GUI do DB)

# Frontend
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm start                # Servidor de produção
```

---

### Frontend - Integração com API

#### Cliente API

Localização: `frontend/lib/api.ts`

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function api(endpoint: string, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
```

#### Serviços Disponíveis

**Autenticação** (`lib/auth.ts`):
```typescript
loginCliente(email, senha)
loginArtista(email, senha)
registerCliente(dados)
registerArtista(dados)
```

**Artistas** (`lib/artists.ts`):
```typescript
getArtistas()
getArtistaById(id)
createArtista(dados)
updateArtista(id, dados)
```

**Produtos** (`lib/products.ts`):
```typescript
getProdutos(filtros?)
getProdutoById(id)
createProduto(dados)
updateProduto(id, dados)
```

**Eventos** (`lib/events.ts`):
```typescript
getEventos(filtros?)
getEventoById(id)
createEvento(dados)
updateEvento(id, dados)
```

**Pedidos** (`lib/orders.ts`):
```typescript
getPedidos(filtros?)
getPedidoById(id)
createPedido(dados)
updatePedidoStatus(id, status)
cancelPedido(id)
```

#### React Hooks Customizados

Localização: `frontend/hooks/useApi.ts`

```typescript
// Hook para buscar artistas
const { artists, loading, error } = useArtists();

// Hook para buscar produtos (com filtros)
const { products, loading, error } = useProducts({ artista_id: 'xyz' });

// Hook para buscar eventos
const { events, loading, error } = useEvents({ artista_id: 'xyz' });
```

#### Exemplo de Uso em Componente

```typescript
'use client';

import { useArtists } from '@/hooks/useApi';

export default function ArtistList() {
  const { artists, loading, error } = useArtists();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {artists.map(artist => (
        <div key={artist.id}>
          <h2>{artist.nome}</h2>
          <p>{artist.genero_musical}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🌐 Deploy (Render)

### Configuração Rápida

1. **Execute o script de configuração:**
```bash
./setup-render.sh
```

2. **Crie um cluster MongoDB Atlas:**
   - Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crie uma conta e cluster gratuito (M0)
   - Obtenha a connection string

3. **Faça push para o GitHub:**
```bash
git add .
git commit -m "Configuração para deploy"
git push
```

4. **Deploy no Render:**
   - Acesse [Render Dashboard](https://dashboard.render.com)
   - Clique em "New" → "Blueprint"
   - Conecte seu repositório GitHub
   - O Render detectará o `render.yaml` automaticamente
   - Adicione a variável de ambiente `DATABASE_URL`
   - Clique em "Apply"

### Arquitetura de Deploy

```
Internet
   ↓
Render Platform (Free Tier)
   ├─ Frontend (Next.js)
   │  └─ https://sonora-frontend.onrender.com
   │
   └─ Backend (Express + Prisma)
      └─ https://sonora-backend.onrender.com
         ↓
MongoDB Atlas (Free Tier)
   └─ M0 Cluster (512MB)
```

### Variáveis de Ambiente

**Backend (Render):**
```
NODE_ENV=production
PORT=10000
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/sonora
JWT_SECRET=<gerado-automaticamente>
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://sonora-frontend.onrender.com
```

**Frontend (Render):**
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://sonora-backend.onrender.com/api
```

---

## 🗄️ Banco de Dados

### Schema Prisma

7 modelos principais:

1. **Artista** - Perfis de artistas com autenticação
2. **Cliente** - Contas de clientes
3. **Produto** - Produtos/merchandising
4. **Evento** - Eventos/shows
5. **Pedido** - Pedidos de clientes
6. **ItemPedido** - Itens dos pedidos
7. **Fornecedor** - Fornecedores de produtos

### Relacionamentos

```
Artista (1) → (N) Produtos
Artista (1) → (N) Eventos
Cliente (1) → (N) Pedidos
Pedido (1) → (N) ItemPedido
Produto (1) → (N) ItemPedido
Fornecedor (N) ↔ (N) Produtos
```

### Visualizar Dados

Use o Prisma Studio para visualizar e editar dados:

```bash
cd backend
npm run prisma:studio
```

Abre em: `http://localhost:5555`

---

## 🔐 Segurança

- ✅ Hash de senhas com bcrypt
- ✅ Autenticação baseada em JWT
- ✅ Controle de acesso baseado em roles
- ✅ Validação de requisições com express-validator
- ✅ Rotas protegidas com middleware de autenticação
- ✅ Configuração de CORS
- ✅ Variáveis de ambiente para secrets
- ✅ HTTPS/TLS automático no Render

---

## 🐛 Troubleshooting

### Backend não inicia

**Erro:** "Port 3001 already in use"

**Solução:**
```bash
# Mate o processo na porta 3001
lsof -ti:3001 | xargs kill -9

# Ou mude a porta no .env
PORT=3002
```

### Erro de conexão com MongoDB

**Erro:** "Can't reach database server"

**Soluções:**
1. Verifique se o MongoDB está rodando
2. Confirme a `DATABASE_URL` no `.env`
3. Para MongoDB Atlas, verifique network access (whitelist 0.0.0.0/0)
4. Teste a connection string localmente

### Erros de CORS

**Erro:** "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solução:**
1. Verifique `FRONTEND_URL` no backend `.env`:
   ```
   FRONTEND_URL=http://localhost:3000
   ```
2. Certifique-se que o frontend está fazendo requisições para a URL correta

### Prisma Client não encontrado

**Erro:** "Cannot find module '@prisma/client'"

**Solução:**
```bash
cd backend
npm run prisma:generate
```

### Frontend não conecta ao backend

**Soluções:**
1. Verifique se o backend está rodando na porta 3001
2. Confirme `.env.local` no frontend:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```
3. Verifique o console do browser para erros de rede

### Problemas com autenticação

**Soluções:**
1. Verifique se o token está sendo armazenado no localStorage
2. Confirme que o token está sendo enviado no header Authorization
3. Verifique se o token não expirou (7 dias por padrão)
4. Limpe o localStorage e faça login novamente

---

## 🧪 Testes

### Testar API Backend

**Health Check:**
```bash
curl http://localhost:3001/health
```

**Listar endpoints:**
```bash
curl http://localhost:3001/api
```

**Registrar usuário:**
```bash
curl -X POST http://localhost:3001/api/auth/cliente/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "cpf": "12345678900",
    "dataNascimento": "1990-01-01",
    "email": "teste@teste.com",
    "senha": "senha123"
  }'
```

### Testar Frontend

1. Acesse `http://localhost:3000`
2. Vá para `/auth/register` e crie uma conta
3. Faça login em `/auth`
4. Navegue pela aplicação

---

## 📖 Recursos Adicionais

### Ferramentas Recomendadas

- **Postman/Insomnia** - Testar API
- **MongoDB Compass** - GUI para MongoDB local
- **VS Code Extensions:**
  - Prisma
  - ESLint
  - Prettier
  - REST Client

### Links Úteis

- [Documentação do Express](https://expressjs.com/)
- [Documentação do Prisma](https://www.prisma.io/docs)
- [Documentação do Next.js](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render Docs](https://render.com/docs)

---

## 👥 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 👨‍💻 Equipe

**GRUPO 02 - DSM 3º Semestre 2025/2**

- Ana Laura Lis Oliveira Zenith
- Eduardo Fernandes Grespi
- Héricles Robert Mendes
- João Marcos Landi Sousa

**Instituição:** FATEC Franca
**Curso:** Desenvolvimento de Software Multiplataforma
**Semestre:** 3º - 2025/2