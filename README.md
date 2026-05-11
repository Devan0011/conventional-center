# Aether Grand Convention Center

A polished convention center website with a Vite frontend and an Express backend backed only by Supabase.

## Features

### Frontend
- Premium convention center landing experience with animated sections and venue highlights.
- Smooth scrolling, sliders, counters, proposal requests, local review UI, and admin dashboard.
- Built with HTML, CSS, vanilla JavaScript, Vite, GSAP, Lenis, AOS, and Swiper.

### Backend
- Express API for auth, venues, bookings, and RFP submissions.
- Supabase Postgres database for all persistent data.
- JWT authentication with bcrypt password hashing.

## Tech Stack

- Frontend: HTML5, CSS3, vanilla JS, Vite, GSAP, Lenis, AOS, Swiper
- Backend: Node.js, Express.js, Supabase
- Deployment: Vercel for frontend, Render for backend

## Database Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run the schema in `backend/supabase/schema.sql`.
4. Copy the project URL and service role key from Supabase project settings.

The schema rebuilds these tables:

- `app_users`
- `venues`
- `bookings`
- `rfps`

The backend uses the service role key, so keep it server-side only. Do not expose it in frontend code.

## Local Setup

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Set these values in `backend/.env`:

```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_super_secret_jwt_key
```

The backend runs on `http://localhost:5000`.

### Frontend

```bash
npm install
copy .env.example .env
npm run dev
```

The frontend runs on `http://localhost:5173`.

Local `/api` requests are proxied to `http://localhost:5000` by Vite. For deployed builds, set `VITE_API_URL` to the deployed backend origin.

## Deployment

### Backend on Render

The repository includes `render.yaml` for the backend service. Add these environment variables in Render:

```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_super_secret_jwt_key
```

After deploy, verify:

```text
https://your-render-service.onrender.com/api/health
```

The response should include `"database": "supabase"`.

### Frontend on Vercel

Deploy the root project as a Vite app with:

- Build Command: `npm run build`
- Output Directory: `dist`

Configure this Vercel environment variable before building:

```env
VITE_API_URL=https://your-render-service.onrender.com
```

The public site and `/admin` dashboard both use `VITE_API_URL` in production.

## Deployment Checklist

- Run `backend/supabase/schema.sql` in the Supabase SQL editor.
- Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `JWT_SECRET` on Render.
- Set `VITE_API_URL` on Vercel to the Render backend origin.
- Visit `/api/health` on Render and confirm `"database": "supabase"`.
- Deploy Vercel after `VITE_API_URL` is set so the API URL is baked into the frontend bundle.

## Project Structure

```text
/
|-- backend/
|   |-- lib/                  # Supabase client and API serializers
|   |-- routes/               # API endpoints
|   |-- supabase/schema.sql   # Supabase database rebuild script
|   |-- server.js             # Express entry point
|   `-- package.json
|-- index.html
|-- admin.html
|-- style.css
|-- main.js
|-- vercel.json
|-- render.yaml
`-- package.json
```
