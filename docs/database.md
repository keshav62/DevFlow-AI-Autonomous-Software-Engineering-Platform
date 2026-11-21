# DevFlow AI – Database Architecture & Schema

## Engine

- **Database**: PostgreSQL 16
- **Extension**: `pgvector` (vector embeddings support for RAG in Phase 3)
- **Extension**: `uuid-ossp` (UUID v4 primary keys)
- **Migration Owner**: Prisma ORM inside `apps/backend`

## Core Models

### 1. User
Represents developers or team members using DevFlow.
- `id` (UUID, Primary Key)
- `clerkId` (String, Unique) - External auth identifier
- `email` (String, Unique)
- `name` (String)
- `avatarUrl` (String, Optional)
- `createdAt` / `updatedAt` (DateTime)

### 2. Organization
Represents workspaces/teams.
- `id` (UUID, Primary Key)
- `name` (String)
- `slug` (String, Unique)
- `createdBy` (UUID, References User.id)
- `createdAt` (DateTime)

### 3. OrganizationMember
Role-based access junction table.
- `id` (UUID, Primary Key)
- `organizationId` (UUID, References Organization.id)
- `userId` (UUID, References User.id)
- `role` (Enum: OWNER, ADMIN, MEMBER, VIEWER)
- `joinedAt` (DateTime)

### 4. Repository
GitHub repositories connected to an organization.
- `id` (UUID, Primary Key)
- `organizationId` (UUID, References Organization.id)
- `githubRepoId` (String)
- `owner` (String)
- `name` (String)
- `fullName` (String, Unique per organization)
- `defaultBranch` (String, Default: "main")
- `installationId` (String, Optional)
- `isPrivate` (Boolean, Default: false)
- `createdAt` (DateTime)

### 5. AgentWorkflow
Execution runs for autonomous engineering workflows.
- `id` (UUID, Primary Key)
- `organizationId` (UUID, References Organization.id)
- `repositoryId` (UUID, References Repository.id, Optional)
- `createdBy` (UUID, References User.id)
- `status` (Enum: PENDING, RUNNING, COMPLETED, FAILED, CANCELLED)
- `currentNode` (String, Optional)
- `retryCount` (Int, Default: 0)
- `createdAt` / `completedAt` (DateTime)
