# Description of the Project

The Storefront Backend is a project for the Udacity Full-Stack Nanodegree program, which showcases how to use Node.js as a backend language, Express for server manipulation, and Postgres as the DBMS.

This project serves as the backend component of the Storefront project, which handles incoming requests and APIs across the Express server that communicates with the Postgres database.

All handlers and models are tested using Jasmine, and the project is written in TypeScript. Prettier and ESLint are used for formatting and linting, and JWT is employed for authentication.

## Table of Contents

- Backend Language: Node.js
- Server Manipulation: Express
- Database Management System: PostgreSQL
- Unit Testing: Jasmine
- Formatting and Linting: Prettier and ESLint
- Authentication: JWT

## run the project

- Clone the repository using the command git clone : https://github.com/mina-adibe/storefront-be.git.
- Navigate to the project directory using the command "cd torefront-be ".
- Install packages using "npm install".
- make copy of env variables (you find it here at the end of this file) into your ".env" after cloning the repo.

## database migration

- in root run using "psql -U postgres".
- In psql run :
  For Development
  CREATE DATABASE store_dev;
  For Testing
  CREATE DATABASE store_test;
- in root run : npm run migrate this will run this script : "db-migrate up".

## scripts

```sh
"dev": "nodemon src/index.ts",
"build": "tsc",
"clean": "rm -rf dist",
"prebuild": "npm run clean",
"start": "npm run clean && npm run build  && node dist/index.js",
"test": " npm run clean && npm run build  && npm run jasmine",
"jasmine": "jasmine",
"migrate": "db-migrate up",
"format": "prettier --write src/**/*.ts",
"lint": "eslint src/**/*.ts",
"lint:fix": "eslint src/**/*.ts --fix",
"debug": " ndb --inspect-brk node src/index.ts",
"commit": "cz"
```

### env var to use:

```sh
PORT = 3000
NODE_ENV = dev
# PostgreSQL conf
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_DB_test=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
BCRYPT_PASS=MYSUPERSECRETPASSWORD
SALT_ROUNDS=10
TOKEN_SECRET=MY-TOKEN-SECRET
```

## License

Distributed under the MIT License. See LICENSE for more information.
