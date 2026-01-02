# Quick Firebase Deployment Guide

Firebase CLI is already installed and working! ✅

## Current Status

- ✅ Firebase CLI: v14.24.1 (installed)
- ✅ Firebase Project: sonifyai-e5ebe (configured)
- ✅ Firebase Config: `firebase.json` ready
- ✅ Next.js: Configured for standalone output

## Deployment Steps

### Option 1: Deploy to Cloud Run + Firebase Hosting (Recommended)

Since your app has API routes and SSR, you need Cloud Run:

1. **Enable Google Cloud APIs:**
   ```bash
   gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com --project=sonifyai-e5ebe
   ```

2. **Build and deploy using the script:**
   ```bash
   ./deploy-firebase.sh
   ```

3. **Or manually:**
   ```bash
   # Build Docker image
   docker build -t gcr.io/sonifyai-e5ebe/nextjs-server .
   
   # Push to Container Registry
   docker push gcr.io/sonifyai-e5ebe/nextjs-server
   
   # Deploy to Cloud Run
   gcloud run deploy nextjs-server \
     --image gcr.io/sonifyai-e5ebe/nextjs-server \
     --region us-central1 \
     --platform managed \
     --allow-unauthenticated \
     --port 3000 \
     --project sonifyai-e5ebe
   
   # Set environment variables (replace with your actual values)
   gcloud run services update nextjs-server \
     --update-env-vars NEXTAUTH_URL=https://sonifyai-e5ebe.web.app,NEXTAUTH_SECRET=your-secret,SPOTIFY_CLIENT_ID=your-id,SPOTIFY_CLIENT_SECRET=your-secret,GEMINI_API_KEY=your-key \
     --region us-central1 \
     --project sonifyai-e5ebe
   
   # Deploy Firebase Hosting
   firebase deploy --only hosting
   ```

### Option 2: Static Export (API routes won't work)

If you want to test Firebase Hosting quickly (but API routes won't work):

1. Change `next.config.ts` to use `output: 'export'` instead of `output: 'standalone'`
2. Build: `npm run build`
3. Deploy: `firebase deploy --only hosting`

**Note:** This disables API routes and SSR - not recommended for production.

## Troubleshooting

### Permission Errors

If you see permission errors when installing packages globally, you have options:

1. **Use npx** (no install needed):
   ```bash
   npx firebase-tools --version
   ```

2. **Use sudo** (not recommended, but works):
   ```bash
   sudo npm install -g firebase-tools
   ```

3. **Use nvm** (recommended for Node version management):
   ```bash
   # Install nvm, then global packages go to user directory
   ```

### Firebase CLI Already Installed

✅ You already have Firebase CLI installed at `/usr/local/bin/firebase`
✅ Version: 14.24.1
✅ You don't need to install it again!

## Next Steps

1. Make sure Docker is installed (for Cloud Run deployment)
2. Make sure you're logged into Google Cloud: `gcloud auth login`
3. Set your environment variables in Cloud Run
4. Deploy!

## Helpful Commands

```bash
# Check Firebase CLI version
firebase --version

# List Firebase projects
firebase projects:list

# Check current project
firebase use

# View Firebase hosting config
cat firebase.json

# Deploy only hosting
firebase deploy --only hosting

# View deployment logs
firebase hosting:channel:list
```

