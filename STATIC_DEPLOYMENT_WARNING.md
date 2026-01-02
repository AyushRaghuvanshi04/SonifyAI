# ⚠️ Static Export Deployment - Important Limitations

## What Changed

Your app has been configured for **static export** to Firebase Hosting. This means:

- ✅ Your app can be deployed to Firebase Hosting
- ✅ No Cloud Run needed
- ✅ No Docker needed
- ✅ Simple deployment: `firebase deploy --only hosting`

## ❌ What Will NOT Work

### 1. API Routes (Broken)
These routes will **not work** in static export:
- `/api/generate` - Playlist generation will fail
- `/api/spotify/create-playlist` - Spotify playlist creation will fail
- `/api/auth/[...nextauth]` - NextAuth authentication will fail
- `/api/auth/test-login` - Will not work

### 2. Server-Side Features (Broken)
- ❌ NextAuth authentication (requires server-side sessions)
- ❌ Server-side rendering (SSR)
- ❌ Server-side API calls to Spotify/Gemini
- ❌ Session management

### 3. Features That Break
- ❌ User login/logout
- ❌ Playlist generation
- ❌ Creating playlists on Spotify
- ❌ Any feature that depends on API routes

## What WILL Work

- ✅ Static pages (home page, generate page UI)
- ✅ Client-side React components
- ✅ Static assets (images, CSS, JS)
- ✅ Client-side JavaScript

## How to Deploy

```bash
# 1. Build static export
npm run build

# 2. Deploy to Firebase Hosting
firebase deploy --only hosting
```

Your app will be available at:
- https://sonifyai-e5ebe.web.app
- https://sonifyai-e5ebe.firebaseapp.com

## Expected Behavior

When users try to use features:
- **Generate Playlist**: Will fail (API route doesn't exist)
- **Login with Spotify**: Will fail (NextAuth requires server)
- **Create Playlist on Spotify**: Will fail (API route doesn't exist)

## If You Need Full Functionality

To restore full functionality, you need to:
1. Change `next.config.ts` back to `output: 'standalone'`
2. Update `firebase.json` to use Cloud Run rewrites
3. Deploy to Cloud Run first
4. Then deploy Firebase Hosting

Or use Vercel (easier alternative that supports all Next.js features).

## Summary

You can now deploy with `firebase deploy --only hosting`, but most of your app's features will not work because they require server-side functionality.

