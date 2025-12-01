# Prisma Accelerate Migration Guide

## What I've Done:
1. ✅ Updated `schema.prisma` to use PostgreSQL instead of SQLite
2. ✅ Configured Prisma Accelerate connection pooling
3. ✅ Created `.env.example` template

## What You Need to Do:

### Step 1: Get Your Direct Database URL

You need **TWO** URLs from Vercel/Prisma:

1. **DATABASE_URL** (Prisma Accelerate - for your app) - ✅ You already have this
2. **DIRECT_URL** (Direct PostgreSQL - for migrations) - ❌ You need to get this

#### To get your DIRECT_URL:

1. Go to your Vercel project dashboard
2. Navigate to **Storage** → **Postgres** (or wherever you created your database)
3. Look for the connection string that starts with `postgresql://` (NOT `prisma+postgres://`)
4. It should look like: `postgresql://username:password@hostname:5432/database?sslmode=require`

### Step 2: Create `.env` File

Create a file `server/.env` with both URLs:

```bash
# For runtime queries (Prisma Accelerate with connection pooling)
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19IaEhjeVV4QVA5VVVITlhjUUVjX0MiLCJhcGlfa2V5IjoiMDFLQkJLVDVYNFBHVk1SOFg3UENaRFNZS0MiLCJ0ZW5hbnRfaWQiOiIxZDczMGI5MDIzMmU5ZDU5Yjc3NTE3ODQ3MDQ4MWE4MjgyODg4MjkyODMyYTExNTM3OTZlYTM1ODhiNWUzZGM2IiwiaW50ZXJuYWxfc2VjcmV0IjoiOTgwOTc2OGUtZTE0Yy00N2VlLWE4ODktZDhiYmQ5Y2ZkOTRjIn0.O5tGVfSrFlVcGxCm3HcBlyRUaExNcsWbpGLrU3XaxRk"

# For migrations (Direct PostgreSQL connection)
DIRECT_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:5432/YOUR_DATABASE?sslmode=require"
```

**IMPORTANT**: Replace the `DIRECT_URL` with your actual PostgreSQL connection string from Vercel!

### Step 3: Run Migrations

Once you have both URLs in your `.env` file:

```bash
cd server

# Generate Prisma Client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init_postgres

# Seed the database
npx prisma db seed
```

### Step 4: Test Your Connection

```bash
# Start your server
npm run dev

# Test the API
curl http://localhost:3001/api/products
```

## Troubleshooting

### If you can't find the DIRECT_URL:

1. **Option A**: Check Vercel Dashboard
   - Go to your project → Storage → Database
   - Look for "Connection String" or "Postgres URL"

2. **Option B**: Create a new Postgres database in Vercel
   - Go to Storage → Create Database → Postgres
   - Copy the connection string

3. **Option C**: Use Neon.tech
   - Sign up at https://neon.tech
   - Create a new project
   - Copy the connection string

### Common Issues:

- **"Can't reach database server"**: Check your DIRECT_URL is correct
- **"Invalid API key"**: Your DATABASE_URL (Accelerate) might be wrong
- **"Table doesn't exist"**: Run migrations with `npx prisma migrate dev`

## Next Steps After Migration:

1. Update Vercel environment variables with both URLs
2. Deploy your backend to Vercel
3. Your app will use Prisma Accelerate for better performance!

---

**Need help?** Let me know if you need assistance finding your DIRECT_URL!
