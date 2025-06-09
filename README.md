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

- All REST endpoints are defined in `server/routes.ts` and served from `/api`.
- Data is loaded from `server/storage.ts` into an in-memory `MemStorage` class when the server starts and is **not persisted** between restarts.
- The server always runs on port **5000**.

### API Reference

The table below lists every available endpoint. All routes return JSON.

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `GET`  | `/api/topics` | List all topics |
| `GET`  | `/api/topics/:id` | Get a single topic by id |
| `GET`  | `/api/videos` | List all videos |
| `GET`  | `/api/videos/featured` | Get featured videos |
| `GET`  | `/api/videos/category/:category` | Videos filtered by category |
| `GET`  | `/api/videos/topic/:topicId` | Videos for a topic |
| `GET`  | `/api/games` | List all games |
| `GET`  | `/api/games/category/:category` | Games filtered by category |
| `GET`  | `/api/games/topic/:topicId` | Games for a topic |
| `GET`  | `/api/experiments` | List all experiments |
| `GET`  | `/api/experiments/category/:category` | Experiments filtered by category |
| `GET`  | `/api/quizzes` | List all quizzes |
| `GET`  | `/api/quizzes/featured` | Get the featured quiz |
| `GET`  | `/api/fun-facts` | List all fun facts |
| `GET`  | `/api/fun-facts/featured` | Get the featured fun fact |

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
   - Open <http://localhost:5000> in your browser. The Express API and React client run together. Environment variables are set with **cross-env** so the command works on Windows, macOS and Linux.
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

## Deploying the Express API

To serve data in production you need to run the compiled Express server on a host that supports Node.js (Replit, Render, Vercel and similar services all work). The build step creates the server bundle in `dist/index.js` and the static client in `dist/public`.

1. Build the project if you have not already:
   ```bash
   npm run build
   ```
2. Copy the `dist` folder to your server and run:
   ```bash
   npm start
   ```
   The server listens on **port 5000** and serves both the API and the prebuilt React files.
   If your client is hosted on a different domain (for example GitHub Pages), set the
   `CORS_ORIGIN` environment variable to that domain so cross‑origin requests work
   when using cookies.

### Deploying to Render

1. Push your code to GitHub.
2. Log in to [Render](https://render.com) and create a **New Web Service** from your repository.
3. Set the **Build Command** to `npm run build` and the **Start Command** to `npm start`.
4. Add environment variables under the **Environment** section:
   - `CORS_ORIGIN` – domain where the frontend is hosted (e.g. `https://yourname.github.io`).
   - `DATABASE_URL` – if you use a Postgres database.
5. Click **Create Web Service** and wait for the build to finish. Render will provide a URL like `https://your-service.onrender.com`.
6. Use that URL for the frontend's `VITE_API_BASE_URL` when building the client.

## Deploying the Client to GitHub Pages

GitHub Pages can host only static files, so you can deploy the **frontend** there. The API must be hosted separately (for example on Render, Vercel or any other Node hosting provider) if you want the dynamic data to work.

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

After the branch is published, GitHub Pages will serve the static client. Set the `VITE_API_BASE_URL` environment variable in the frontend build to the URL where the Express server is hosted so API requests resolve correctly.

### Fixing Routing on GitHub Pages

When deploying to GitHub Pages you may see a blank page or 404 errors after refreshing. Two fixes are required:

1. **Base path** – `vite.config.ts` sets the `base` option to `/how-things-work/` when `NODE_ENV` is `production`. `App.tsx` wraps the routes in `WouterRouter` using `import.meta.env.BASE_URL` so links resolve correctly.
2. **404 redirect** – A custom `client/public/404.html` file redirects unknown routes back to the site's base path so the SPA router can take over.

With these changes the React router works correctly from any page on GitHub Pages.

## Switching Between Local and Remote APIs

The frontend reads the base URL for all API requests from the environment variable `VITE_API_BASE_URL`.

* **Local development** – leave `VITE_API_BASE_URL` empty to use the Express API running on `localhost:5000`.
* **Remote API** – set `VITE_API_BASE_URL` to the URL of your deployed backend (for example `https://your-service.onrender.com`). When you run `npm run build` the value will be embedded into the bundled client.

Create a `.env` file (or configure environment variables on your hosting provider) with the desired value:

```bash
VITE_API_BASE_URL=https://your-service.onrender.com
```

This toggle lets you switch the data source without changing code.

## Fixing CORS Errors

When the frontend and backend run on different domains you must allow cross-origin requests. Set `CORS_ORIGIN` on the server to the domain of your frontend:

```bash
CORS_ORIGIN=https://yourname.github.io
```

Multiple origins can be specified by comma separating them. Restart the server after changing this value.

