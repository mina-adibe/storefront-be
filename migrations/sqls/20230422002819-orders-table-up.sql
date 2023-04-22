CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);