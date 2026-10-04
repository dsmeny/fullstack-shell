# fullstack-shell

React 19 + Vite + Tailwind v4 (root) · Express 5 + Turso/libSQL (`server/`)

## Run
    npm run install:all   # first time only
    npm run dev           # server on :3001, client on :5173

The client calls `/api/*` and Vite forwards it to Express (see `vite.config.js`).

## Database
The server only connects to Turso — it won't start without credentials.
Copy `server/.env.example` to `server/.env` and fill in:

    turso db create my-db
    turso db show my-db --url      # -> TURSO_DATABASE_URL
    turso db tokens create my-db   # -> TURSO_AUTH_TOKEN
# fullstack-shell
