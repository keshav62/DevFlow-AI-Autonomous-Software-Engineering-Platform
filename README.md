# DevFlow AI – Autonomous Software Engineering Platform

DevFlow AI is an AI-powered software engineering SaaS platform designed to automate software development activities using specialized AI agents.

## Architecture

| Application | Technology | Default Port |
|---|---|---|
| Next.js Frontend | Next.js 15, React 19, JavaScript ES Modules, Tailwind CSS | 3000 |
| Express Backend | Node.js, Express.js ES Modules, Prisma ORM, BullMQ, Pino | 5000 |
| FastAPI AI Service | Python 3.11+, FastAPI, Uvicorn, Pydantic, SQLAlchemy Async | 8000 |
| PostgreSQL | pgvector/pgvector:pg16 | 5432 |
| Redis | redis:7-alpine | 6379 |

---

## Repository Structure

```text
devflow-ai/
│
├── apps/
│   ├── frontend/         # Next.js 15 client dashboard (JavaScript only)
│   ├── backend/          # Express.js REST API & BullMQ job processor
│   ├── ai-service/       # FastAPI AI service (LLM & multi-agent foundation)
│   └── sandbox/          # Isolated execution environment (Phase 2+)
│
├── packages/
│   └── shared-contracts/ # Shared API schemas and constants
│
├── infrastructure/
│   ├── docker/           # Service Dockerfiles
│   ├── postgres/         # DB init scripts (pgvector & UUID)
│   └── monitoring/       # Monitoring configuration
│
├── docs/
│   ├── architecture.md   # System architecture & data flow
│   ├── database.md       # Database models & migration notes
│   ├── api.md            # API endpoints & contracts
│   └── development.md    # Local setup and workflow
│
├── docker-compose.yml    # PostgreSQL with pgvector + Redis
├── .env.example          # Environment variables reference
├── .gitignore
└── README.md
```

---

## Quick Start (Local Development)

### 1. Infrastructure (PostgreSQL + Redis)

Ensure Docker Desktop is running, then execute:

```bash
docker compose up -d
```

Verify services are healthy:
```bash
docker compose ps
```

### 2. Express Backend

```bash
cd apps/backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Server runs at `http://localhost:5000`.  
Health check: `http://localhost:5000/api/v1/health`

### 3. Next.js Frontend

```bash
cd apps/frontend
cp .env.example .env.local
npm install
npm run dev
```

Dashboard runs at `http://localhost:3000`.

### 4. FastAPI AI Service

```bash
cd apps/ai-service
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

API docs run at `http://localhost:8000/docs`.  
Health check: `http://localhost:8000/health`

---

## Running Automated Tests

```bash
# Express Backend tests (Vitest)
cd apps/backend
npm test

# FastAPI AI Service tests (Pytest)
cd apps/ai-service
.\venv\Scripts\pytest tests/ -v

# Frontend build verification
cd apps/frontend
npm run build
```

---

## Security & Architecture Principles

- **No TypeScript in Frontend**: Strict JavaScript ES Modules (`.js` and `.jsx`).
- **Clear Isolation**: Frontend never connects directly to database or internal AI service.
- **Internal Service Authentication**: Express communicates with FastAPI via private `X-Internal-Secret` header.
- **Fail-Safe Health Checks**: Health endpoints test actual socket connectivity (PostgreSQL query, Redis PING).
- **Graceful Shutdown**: Connections to PostgreSQL, Redis, and HTTP servers close cleanly on SIGINT/SIGTERM.
