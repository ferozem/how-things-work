# How Things Work

This project is a small educational web application built with a **Node/Express** backend and a **React** frontend. It demonstrates how to serve dynamic content using Vite in development and a compiled bundle in production.

## Architecture Overview

```
client (React) ---> Express API (server) ---> in-memory storage (MemStorage)
```

- **Server** (`/server`)
  - Sets up Express with logging middleware and registers REST API routes.
  - Uses a simple `MemStorage` class that preloads topics, videos, games, experiments, quizzes and fun facts into memory.
  - In development, Vite provides hot module replacement. When built for production, static files are served from `dist/public`.
- **Client** (`/client`)
  - A React application using Wouter for routing and React Query for data fetching.
  - Pages include `Home`, `Games`, `Videos`, `Experiments`, `Topic`, `Parent Zone` and a `NotFound` page.
  - Components like `TopicCard`, `VideoCard`, `GameCard` and `ExperimentCard` display data fetched from the API.

## Backend Details

- API endpoints are defined in `server/routes.ts`. Examples:
  - `GET /api/topics` – list topics
  - `GET /api/videos/featured` – featured videos
  - `GET /api/games` – list games
  - `GET /api/quizzes/featured` – featured quiz
  - `GET /api/fun-facts/featured` – daily fun fact
- All data comes from `server/storage.ts` which implements the `MemStorage` class. Data is loaded when the server starts and is **not persisted** between restarts.
- The server always runs on port **5000**.

## Frontend Details

- The entry point is `client/src/main.tsx` which mounts the React application.
- Routing is defined in `client/src/App.tsx` using the `Switch`/`Route` components from Wouter.
- Each page fetches data using React Query. For example, the home page queries `/api/topics`, `/api/videos/featured`, `/api/games`, etc.
- Tailwind CSS provides styling. Shared types are defined in `shared/schema.ts` and imported by both server and client.

## Getting Started Locally

1. **Clone the repository**
   ```bash
   git clone <this-repo-url>
   cd how-things-work
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm run dev
   ```
   - Open <http://localhost:5000> in your browser. The Express API and React client run together.
4. **Run TypeScript check (optional)**
   ```bash
   npm run check
   ```
5. **Build for production**
   ```bash
   npm run build
   ```
   - This compiles the client to `dist/public` and bundles the server into `dist`.
6. **Start in production mode**
   ```bash
   npm start
   ```
   - The compiled server will serve the built client from `dist/public` on port 5000.

## Deploying the Client to GitHub Pages

GitHub Pages can host only static files, so you can deploy the **frontend** there. The API would need to be hosted separately.

1. Build the project:
   ```bash
   npm run build
   ```
2. Create a `gh-pages` branch (if it does not already exist) and copy the contents of `dist/public` to the root of that branch.
3. Commit and push the `gh-pages` branch:
   ```bash
   git add .
   git commit -m "Deploy"
   git push origin gh-pages
   ```
4. In your GitHub repository settings, enable GitHub Pages and select the `gh-pages` branch as the source.

After the branch is published, GitHub Pages will serve the static client. Remember that API requests will need to target a separately hosted server or be replaced with static data for the pages to function.

