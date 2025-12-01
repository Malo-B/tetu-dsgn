# Backend Deployment Guide

## Option 1: Vercel (Serverless) ⚡

### Prerequisites
1. You need a PostgreSQL database (Vercel doesn't support SQLite in production)
2. Get a free PostgreSQL database from:
   - **Neon** (https://neon.tech) - Recommended, generous free tier
   - **Supabase** (https://supabase.com)
   - **Railway** (https://railway.app)

### Steps to Deploy on Vercel

1. **Set up PostgreSQL Database**
   ```bash
   # Sign up at https://neon.tech
   # Create a new project
   # Copy the connection string (looks like: postgresql://user:password@host/database)
   ```

2. **Install Vercel CLI** (optional, or use Vercel dashboard)
   ```bash
   npm i -g vercel
   ```

3. **Deploy from the server directory**
   ```bash
   cd server
   vercel
   ```

4. **Configure Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Example: `postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/neondb`

5. **Run Prisma Migrations**
   ```bash
   # After deployment, run migrations
   npx prisma migrate deploy
   npx prisma db seed
   ```

6. **Update Frontend API URL**
   - In `src/api/client.ts`, update baseURL to your Vercel URL
   - Example: `https://your-backend.vercel.app/api`

---

## Option 2: Railway (Easier for Express) 🚂

Railway is better suited for traditional Express apps and includes a free PostgreSQL database.

### Steps to Deploy on Railway

1. **Sign up at Railway** (https://railway.app)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `tetu-dsgn` repository

3. **Configure Service**
   - Root directory: `server`
   - Build command: `npm install && npx prisma generate`
   - Start command: `npm start`

4. **Add PostgreSQL Database**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will automatically set `DATABASE_URL` environment variable

5. **Run Migrations**
   - In Railway dashboard, go to your service
   - Open "Settings" → "Variables"
   - Add a deployment trigger or use Railway CLI:
   ```bash
   railway run npx prisma migrate deploy
   railway run npx prisma db seed
   ```

6. **Get Your Backend URL**
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Update `src/api/client.ts` with this URL

---

## Option 3: Render (Also Good for Express) 🎨

### Steps to Deploy on Render

1. **Sign up at Render** (https://render.com)

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Root directory: `server`
   - Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
   - Start command: `npm start`

3. **Add PostgreSQL Database**
   - Click "New" → "PostgreSQL"
   - Copy the "Internal Database URL"

4. **Set Environment Variables**
   - In your web service settings
   - Add `DATABASE_URL` with the PostgreSQL URL

5. **Deploy**
   - Render will automatically deploy
   - Get your URL: `https://your-app.onrender.com`

---

## Recommended Approach

For your project, I recommend **Railway** because:
- ✅ Free tier includes PostgreSQL database
- ✅ Works perfectly with Express apps
- ✅ Automatic deployments from GitHub
- ✅ Easy environment variable management
- ✅ Simple migration running

**Vercel** is great but requires more setup for Express apps and you need to manage the database separately.

---

## After Deployment

1. **Update Frontend API URL**
   ```typescript
   // src/api/client.ts
   export const client = axios.create({
       baseURL: 'https://your-backend-url.com/api', // Update this
       headers: {
           'Content-Type': 'application/json'
       }
   });
   ```

2. **Test Your API**
   - Visit `https://your-backend-url.com/api/products`
   - Should return your products

3. **Deploy Frontend to Vercel**
   ```bash
   # From root directory
   vercel
   ```

Need help with any of these steps? Let me know!
