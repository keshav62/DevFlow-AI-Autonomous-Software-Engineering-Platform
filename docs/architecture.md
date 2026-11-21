# DevFlow AI – System Architecture (Phase 1)

## Overview

DevFlow AI is architected as an autonomous software engineering SaaS platform. In Phase 1, the core infrastructure foundation is established across three microservices.

```
                    +---------------------------+
                    |   Next.js 15 Frontend     |
                    |   (Port 3000 / React 19)  |
                    +-------------+-------------+
                                  |
                                  | REST / HTTP
                                  v
                    +---------------------------+
                    |    Express.js Backend     |
                    |        (Port 5000)        |
                    +------+--------------+-----+
                           |              |
         +-----------------+              +----------------+
         | (Prisma ORM)                   | (BullMQ / PING)| (Internal Auth HTTP)
         v                                v                v
+------------------+             +-----------------+   +---------------------+
| PostgreSQL 16    |             |  Redis 7        |   | FastAPI AI Service  |
| (pgvector, 5432) |             |  (Port 6379)    |   | (Port 8000)         |
+------------------+             +-----------------+   +----------+----------+
                                                                  |
                                              (AsyncPG / SQLAlchemy & Redis)
                                                                  v
                                                     [PostgreSQL & Redis DB]
```

## Security Model

1. **Frontend Isolation**: Browser never stores backend database passwords, Redis URLs, or LLM keys.
2. **Internal Service Authentication**: The FastAPI AI service requires an `X-Internal-Secret` header for protected routes.
3. **Defense in Depth**: Helmet security headers, rate limiting (500 req/15min default), strict CORS whitelisting, and Zod environment validation.
