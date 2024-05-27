-- /sql/createSchema.sql
-- create table if not exists test (
--   id int,
--   description text
-- );

-- insert into test values (1, 'test');
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  browser_language TEXT NOT NULL
);