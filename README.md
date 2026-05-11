# Aether Grand Convention Center

A fully functional, ultra-premium, futuristic convention center platform built with a high-performance MERN-like stack (using HTML/JS/Vite for frontend, Express/Node.js/MongoDB for backend).

## 🚀 Features

### Frontend
- **Ultra-Premium Design**: Frosted glassmorphism UI, dynamic gradients, and neon blue accents.
- **Cinematic 3D Interactions**: Powered by **Three.js** and **GSAP** for floating particles, dynamic lighting, and mouse-follow glow effects.
- **Smooth UX**: Integrated **Lenis Smooth Scroll** and **ScrollTrigger** for high-end scroll animations.
- **Interactive Elements**: Animated counters, countdown timers, Swiper.js carousels, and an AI Concierge Chatbot UI.

### Backend
- **Node.js & Express.js**: Fast, scalable API.
- **MongoDB**: Robust database schemas for Users, Venues, Bookings, and Request for Proposals (RFPs).
- **Security Ready**: Setup for JWT authentication and bcrypt password hashing.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JS, Three.js, GSAP, Swiper.js, Lenis, AOS, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Deployment Ready:** Vercel (Frontend), Render (Backend)

---

## 💻 Setup & Installation

### Option 1: Automated Setup (Windows)
We have provided a convenient setup script for Windows users. Simply double click or run:
```bash
.\setup.bat
```
This will automatically install both frontend and backend dependencies.

### Option 2: Manual Setup

#### 1. Setup Backend
Open a terminal and navigate to the `backend` folder:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/aether_grand
JWT_SECRET=your_super_secret_jwt_key
```
Start the backend server:
```bash
npm run dev
# OR
node server.js
```
The backend will run on `http://localhost:5000`.

#### 2. Setup Frontend
Open a new terminal in the project root folder:
```bash
npm install
```
Start the Vite development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## 🚢 Comprehensive Deployment Guide

This guide will walk you through deploying the Aether Grand platform using Vercel (Frontend) and Render (Backend).

### Step 1: Push Your Code to GitHub
Before deploying, ensure your code is committed and pushed to a GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/aether-grand.git
git push -u origin main
```

### Step 2: Deploying the Backend (Render)
The backend API requires Node.js and a MongoDB connection. We use **Render.com** to host the backend.

1. **Set Up MongoDB Atlas (Database)**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
   - Under "Database Access", create a database user and password.
   - Under "Network Access", allow access from anywhere (`0.0.0.0/0`).
   - Click "Connect", choose "Connect your application", and copy the connection string. Replace `<password>` with your database user password.

2. **Deploy on Render**:
   - The repository includes a `render.yaml` Blueprint file for automated deployment.
   - Log in to [Render](https://render.com/).
   - Click **New** -> **Blueprint**.
   - Connect your GitHub repository containing this project.
   - Render will detect the `render.yaml` file and prompt you for the Environment Variables.
   - Enter your `MONGO_URI` (the connection string from MongoDB Atlas).
   - Enter a secure `JWT_SECRET` (any random string for token generation).
   - Click **Apply** to deploy the backend.
   - Once deployed, Render will provide you with a URL (e.g., `https://aether-grand-backend.onrender.com`). **Save this URL**.

### Step 3: Connect Frontend to Backend
Before deploying the frontend, you need to point it to your new live backend URL.
1. Open `/main.js` (or wherever your API fetch calls will be defined).
2. Ensure API endpoints point to your new Render URL (e.g., `https://aether-grand-backend.onrender.com/api/...`) instead of `http://localhost:5000/api/...`.
3. Commit and push these changes to GitHub.

### Step 4: Deploying the Frontend (Vercel)
The frontend uses Vite and Vanilla JS. We use **Vercel** for blazing-fast edge deployment.

**Option A: Deploy via Vercel Dashboard (Recommended)**
1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Vercel will automatically detect the **Vite** framework.
5. Leave the default settings (Build Command: `npm run build`, Output Directory: `dist`).
6. Click **Deploy**.

**Option B: Deploy via Vercel CLI**
1. Install the Vercel CLI globally: `npm i -g vercel`.
2. Run `vercel` in the project root directory.
3. Follow the prompts to link the project. The included `vercel.json` will automatically configure routing.
4. Run `vercel --prod` to deploy to production.

### Step 5: Post-Deployment Checklist
- [ ] Visit your Vercel frontend URL to ensure the 3D graphics and UI load correctly.
- [ ] Visit your Render backend URL (e.g., `https://aether-grand-backend.onrender.com/api/health`) to confirm the API is returning a successful health check status.
- [ ] Test creating a booking or RFP on the live site to ensure the Frontend successfully communicates with the live Backend and MongoDB database.

## 📁 Directory Structure
```
/
├── backend/                  # Node.js Express Backend
│   ├── models/               # MongoDB Schemas (User, Venue, Booking, RFP)
│   ├── routes/               # API Endpoints
│   ├── server.js             # Express Entry Point
│   └── package.json
├── index.html                # Main Frontend Entry
├── style.css                 # Global CSS & Glassmorphism UI
├── main.js                   # Three.js & Application Logic
├── vercel.json               # Vercel Deployment Config
├── render.yaml               # Render Deployment Config
├── package.json              # Frontend Dependencies (Vite)
└── README.md
```
