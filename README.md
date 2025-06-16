# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c7d2ba55-abc8-44b8-a2b8-170dad9dea47

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c7d2ba55-abc8-44b8-a2b8-170dad9dea47) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c7d2ba55-abc8-44b8-a2b8-170dad9dea47) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Full Stack Application

This is a full-stack application with a React frontend and Node.js backend, configured for deployment on Render.

## Project Structure

```
.
├── backend/           # Node.js backend
│   ├── index.js      # Main server file
│   ├── package.json  # Backend dependencies
│   └── .env          # Backend environment variables
├── src/              # React frontend source
├── dist/             # Built frontend files
├── render.yaml       # Render deployment configuration
└── package.json      # Frontend dependencies
```

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
npm install
npm run dev
```

## Deployment to Render

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Deploy on Render:
   - Go to [render.com](https://render.com)
   - Create a new account or sign in
   - Click "New +" and select "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` configuration
   - Click "Apply" to deploy both services

## Environment Variables

### Backend (.env)
```
PORT=3000
NODE_ENV=production
```

### Frontend
The frontend will automatically use the backend URL from the Render environment.

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/status` - Server status
- `POST /api/data` - Example data endpoint

## Monitoring

- Backend logs are available in the Render dashboard
- The backend includes a health check endpoint for monitoring
- PM2 is configured for process management

## Security

- Helmet.js is configured for security headers
- CORS is configured for production and development
- Environment variables are properly managed
