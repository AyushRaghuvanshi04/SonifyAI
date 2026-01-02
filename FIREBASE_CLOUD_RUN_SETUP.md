# Firebase Hosting + Cloud Run Setup Guide

## ✅ Configuration Restored

I've restored your configuration to use Cloud Run, which is required for API routes to work.

## The Reality: API Routes Need a Server

**You cannot have API routes with static export.** API routes require a Node.js server to run.

For Firebase Hosting, you have two options:

### Option 1: Cloud Run (Current Setup) ✅

Your app is now configured to:
- Build as standalone Next.js app
- Deploy to Cloud Run (provides the server)
- Use Firebase Hosting to route to Cloud Run

**Prerequisites:**
1. Docker installed
2. Google Cloud SDK installed
3. Billing enabled on Firebase project

### Option 2: Use Vercel (Easier Alternative)

Vercel handles everything automatically:
- No Docker needed
- No Cloud SDK needed
- Just connect GitHub and deploy
- Free tier available

## Current Status

Your configuration is restored:
- ✅ `next.config.ts`: `output: 'standalone'` (for Cloud Run)
- ✅ `firebase.json`: Configured with Cloud Run rewrites
- ⚠️ **API routes need to be restored** (they were deleted)

## Next Steps

Since API routes were deleted, you have two options:

1. **Restore from git** (if you have version control):
   ```bash
   git checkout src/app/api
   ```

2. **Recreate API routes** (I can help recreate them)

3. **Switch to Vercel** (easiest option - no API route restoration needed if you have git history)

Which would you like to do?

