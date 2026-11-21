# DevFlow AI – Development Guide

## Monorepo Workflow

DevFlow AI keeps services independent within an `apps/` directory.

### Conventions
- **Frontend**: Strictly JavaScript (`.js`, `.jsx`). App Router, Tailwind CSS, Lucide icons.
- **Backend**: Node.js ES Modules (`import/export`, `"type": "module"`).
- **AI Service**: Python 3.11+ using FastAPI with async drivers (`asyncpg`, `redis.asyncio`).

### Port Allocations
- `3000`: Next.js Frontend
- `5000`: Express.js Backend
- `8000`: FastAPI AI Service
- `5432`: PostgreSQL 16
- `6379`: Redis 7
