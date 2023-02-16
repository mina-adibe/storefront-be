/* Replace with your SQL commands */

-- create table users

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
id UUID DEFAULT  uuid_generate_v4() PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
user_name VARCHAR(50) NOT NULL UNIQUE,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
