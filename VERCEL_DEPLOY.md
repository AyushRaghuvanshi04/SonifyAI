# 🚀 Deploy to Vercel - Quick Guide

Vercel is the easiest way to deploy Next.js apps. Your API routes, SSR, and all features will work automatically!

## Prerequisites

- A Vercel account (free tier is fine)
- Your code pushed to GitHub (recommended) or use Vercel CLI

## Option 1: Deploy via GitHub (Recommended) ⭐

### Step 1: Push to GitHub

If your code isn't already on GitHub:

```bash
# Initialize git if needed
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Click **"Import"**

### Step 3: Configure Environment Variables

In the Vercel project setup page, add these environment variables:

```
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-here
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
GEMINI_API_KEY=your-gemini-api-key
GOOGLE_SEARCH_API_KEY=your-google-search-api-key (optional)
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id (optional)
NODE_ENV=production
```

**Important:** 
- Replace `your-project.vercel.app` with your actual Vercel domain (Vercel will show it after first deployment)
- For `NEXTAUTH_SECRET`, you can generate one with: `openssl rand -base64 32`

### Step 4: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Your app will be live at `https://your-project.vercel.app`!

### Step 5: Update Spotify Redirect URIs

After deployment, update your Spotify app settings:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Open your app
3. Edit settings → Redirect URIs
4. Add: `https://your-project.vercel.app/api/auth/callback/spotify`
5. Save

### Step 6: Update NEXTAUTH_URL (if needed)

After the first deployment, if your domain is different:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXTAUTH_URL` to match your actual domain
3. Redeploy (Settings → Deployments → Redeploy latest)

---

## Option 2: Deploy via CLI

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
# In your project directory
vercel

# For production deployment
vercel --prod
```

### Step 4: Set Environment Variables

```bash
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add SPOTIFY_CLIENT_ID
vercel env add SPOTIFY_CLIENT_SECRET
vercel env add GEMINI_API_KEY
# Add others as needed
```

Then redeploy:
```bash
vercel --prod
```

---

## What Works Automatically ✅

- ✅ API Routes (`/api/generate`, `/api/spotify/create-playlist`, `/api/auth/...`)
- ✅ Server-Side Rendering (SSR)
- ✅ NextAuth authentication
- ✅ Static page generation
- ✅ Image optimization
- ✅ Automatic HTTPS
- ✅ Global CDN

## Next.js Configuration

Your `next.config.ts` is already perfect for Vercel. The `output: 'standalone'` setting works, but Vercel doesn't require it - it will work with or without it.

## After Deployment

1. **Test your app:**
   - Visit your Vercel URL
   - Test playlist generation
   - Test Spotify login
   - Test playlist creation

2. **Monitor:**
   - Check Vercel Dashboard for logs
   - Check deployment status
   - View analytics

3. **Custom Domain (Optional):**
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

## Troubleshooting

### Build Fails
- Check the build logs in Vercel Dashboard
- Ensure all environment variables are set
- Check that `package.json` scripts are correct

### API Routes Not Working
- Verify environment variables are set correctly
- Check that `NEXTAUTH_URL` matches your Vercel domain
- Check deployment logs for errors

### Authentication Issues
- Verify Spotify redirect URI includes your Vercel domain
- Check that `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain exactly

## Cost

- **Free Tier:** 
  - 100GB bandwidth/month
  - Unlimited deployments
  - Perfect for most projects

- **Pro Tier ($20/month):** 
  - More bandwidth
  - Team features
  - Advanced analytics

Your app should work great on the free tier!

