# ⚡ Quick Vercel Deployment

## Fastest Path to Deploy

### 1. Push to GitHub (if not already)
```bash
git add .
git commit -m "Ready for Vercel"
git push
```

### 2. Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add environment variables (see below)
4. Click "Deploy"

### 3. Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXTAUTH_URL=https://YOUR-PROJECT.vercel.app
NEXTAUTH_SECRET=gLU+wzHzVCbu6pYqcsTJ1DK4PXU7Ffu2+sxjdln4bmU=
SPOTIFY_CLIENT_ID=your-actual-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-actual-spotify-client-secret
GEMINI_API_KEY=your-actual-gemini-api-key
NODE_ENV=production
```

**Note:** After first deployment, update `NEXTAUTH_URL` with your actual Vercel domain.

### 4. Update Spotify Redirect URI

After deployment, add to Spotify Dashboard:
```
https://YOUR-PROJECT.vercel.app/api/auth/callback/spotify
```

### 5. Done! 🎉

Your app is live! See `VERCEL_DEPLOY.md` for detailed instructions.

