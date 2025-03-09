# LearnMate

A web application built with AdonisJS framework providing user authentication and management.

## Features

- User authentication system (register, login, logout)
- Role-based access control
- Token-based authentication
- API endpoints for user management

## Tech Stack

- [AdonisJS](https://adonisjs.com/) - The full-stack Node.js framework
- TypeScript for type-safe code
- Lucid ORM for database operations
- Vite for frontend asset bundling
- Edge template engine for views

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Database (configured in `config/database.ts`)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/learnmate.git
cd learnmate
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables by copying the example file

```bash
cp .env.example .env
```

4. Run database migrations

```bash
node ace migration:run
```

5. Start the development server

```bash
node ace serve --watch
```

## Project Structure

- `/app` - Application code
  - `/controllers` - HTTP controllers
  - `/middleware` - HTTP middleware
  - `/models` - Database models
  - `/validators` - Data validation rules
- `/config` - Application configuration
- `/database` - Migrations and seeds
- `/resources` - Frontend assets
- `/start` - Application bootstrapping

## API Endpoints

### Authentication

- `POST /register` - Register a new user
- `POST /login` - Login user and get access token
- `POST /logout` - Logout user and invalidate token
- `GET /me` - Get current user information

## License

[MIT](LICENSE)
