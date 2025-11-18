#!/bin/bash

# Quick setup script for Render deployment preparation

echo "🚀 Sonora - Render Deployment Preparation"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env file exists in backend
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Warning: backend/.env file not found${NC}"
    echo "Creating from .env.example..."
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  Please update backend/.env with your MongoDB connection string${NC}"
    echo ""
else
    echo -e "${GREEN}✓ backend/.env exists${NC}"
fi

# Check if .env.local exists in frontend
if [ ! -f "frontend/.env.local" ]; then
    echo -e "${YELLOW}⚠️  Warning: frontend/.env.local file not found${NC}"
    echo "Creating with default values..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > frontend/.env.local
    echo -e "${GREEN}✓ Created frontend/.env.local${NC}"
else
    echo -e "${GREEN}✓ frontend/.env.local exists${NC}"
fi

echo ""
echo "📋 Pre-Deployment Checklist:"
echo "=============================="
echo ""
echo "1. ☐ Create MongoDB Atlas account and cluster (free tier)"
echo "   Visit: https://www.mongodb.com/cloud/atlas"
echo ""
echo "2. ☐ Get MongoDB connection string and update DATABASE_URL in:"
echo "   - backend/.env (for local development)"
echo "   - Render dashboard (for production)"
echo ""
echo "3. ☐ Push code to GitHub repository"
echo ""
echo "4. ☐ Create Render account at https://render.com"
echo ""
echo "5. ☐ Deploy using render.yaml blueprint:"
echo "   - Go to Render Dashboard > New > Blueprint"
echo "   - Connect your GitHub repository"
echo "   - Add DATABASE_URL environment variable"
echo "   - Click 'Apply'"
echo ""
echo "6. ☐ After deployment, update environment variables:"
echo "   - Backend: FRONTEND_URL with your frontend URL"
echo "   - Frontend: NEXT_PUBLIC_API_URL with your backend URL"
echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "To test locally:"
echo "  Backend:  cd backend && npm install && npm run dev"
echo "  Frontend: cd frontend && npm install && npm run dev"
