-- DevFlow AI PostgreSQL Initializer
-- Enables required database extensions

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Verification notice
DO $$
BEGIN
    RAISE NOTICE 'DevFlow AI: pgvector and uuid-ossp extensions activated successfully.';
END $$;
