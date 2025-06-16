# Backend Server

This is the backend server for the application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Start the server:
- Development mode: `npm run dev`
- Production mode: `npm start`

## API Endpoints

- `GET /`: Welcome message
- `GET /api/status`: Server status
- `POST /api/data`: Example endpoint for receiving data

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production) 