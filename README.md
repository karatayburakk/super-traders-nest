# EvaExchange - Trading Application

The EvaExchange application is an arbitrarily trading game designed to educate users on the terminology used in the trading of shares. 
Users can register shares, update prices, and perform trading operations (BUY/SELL) on shares.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)

## Introduction

The EvaExchange application provides a platform for users to learn and engage in the trading of shares.
Users can register shares, update prices, and perform BUY/SELL transactions on registered shares. The application ensures that all trading rules and validations are adhered to.

- There is a Postman collection with all the endpoints and example usage available in the /postman folder.
- For usage of Postman, create environment with url (localhost:3000) and jwt variables, jwt will be set automatically with signup and signin

## Features

- User registration with time zone support -> {{url}}/auth/signup POST
- User signs the application with time zone preserved -> {{url}}/auth/signin POST
- User sees account info with total coins owned -> {{url}}/users/info GET
- System healtch can be checked -> {{url}}/health GET
- Create a portfolio -> {{url}}/portfolios POST
- Get user portfolios -> {{url}}/portfolios GET
- Update a portfolio -> {{url}}/portfolios/:id PATCH
- Delete a portfolio -> {{url}}/portfolios/:id DELETE
- Get all shares -> {{url}}/shares GET
- Create a share -> {{url}}/shares POST
- Update a share -> {{url}}/shares/:id PATCH
- Delete a share -> {{url}}/shares/:id DELETE
- Buy shares -> {{url}}/trades/buy POST
- Sell shares -> {{url}}/trades/sell POST
- Check system health -> {{url}}/health GET

## Technologies

- Node.js
- NestJS
- Prisma ORM
- PostgreSQL
- Docker (for containerization)
- TypeScript
- bcryptjs (for password hashing)

## Installation

### Prerequisites

- Docker installed (the application and database are fully containerized and can be used with Docker)
- For local usage: PostgreSQL (or your choice of database) set up, Node.js and yarn installed
- For the application running as expected, database must be seeded, please follow steps accordingly.

### Steps

1. Set up environment variables. Create a `.env` file in the root directory and add the following (There is a template file .env.template):

- DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"
- SECRET_KEY="your_jwt_secret"

2. Production Environment With Migrations And Seeds, Run the following command:

```sh
START_MODE=migrate docker-compose up
```

- This command starts a PostgreSQL database container, migrates and seeds the database, then starts the application.

3. Production Environment, If Database migration and seed is completed already, you can run the following command:

```sh
START_MODE=prod docker-compose up
```

- This command starts a PostgresSQL database container, then starts the application

4. Development Environment, Run the following command for Development mode, all the changes in src folder will restart the application automatically.

```sh
docker-compose up
```

- This command starts a PostgresSQL database container (without migration and seed), then starts the application.

5. For Local Development, Run following commands:

- Database should be up on and running

- For Database Migration:

```sh
yarn migrate
```

- For Database seed:

```sh
yarn seed
```

- For Application running in development mode:

```sh
yarn start:dev
```
