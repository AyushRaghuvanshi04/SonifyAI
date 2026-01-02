# Firebase Hosting Setup Guide

Your Firebase project is already configured: **sonifyai-e5ebe**

## Quick Setup Steps

### 1. Initialize Firebase Hosting (if needed)

Run this command and follow the prompts:

```bash
firebase init hosting
```

When prompted:
- **Select Firebase features**: Choose "Hosting: Configure files for Firebase Hosting"
- **Select a default Firebase project**: Choose `sonifyai-e5ebe` (or use existing)
- **What do you want to use as your public directory?**: Enter `out` (we use Cloud Run for the app)
- **Configure as a single-page app?**: No
- **Set up automatic builds and deploys with GitHub?**: No (for now)

### 2. Verify Configuration

Your `firebase.json` is already configured for Cloud Run integration:
- All requests are rewritten to your Cloud Run service `nextjs-server`
- This allows your Next.js API routes and SSR to work

### 3. Enable Required APIs

Make sure these Google Cloud APIs are enabled:

```bash
gcloud services enable run.googleapis.com --project=sonifyai-e5ebe
gcloud services enable cloudbuild.googleapis.com --project=sonifyai-e5ebe
gcloud services enable containerregistry.googleapis.com --project=sonifyai-e5ebe
```

Or enable them via [Google Cloud Console](https://console.cloud.google.com/apis/library?project=sonifyai-e5ebe):
- Cloud Run Admin API
- Cloud Build API
- Container Registry API

### 4. Build and Deploy to Cloud Run

First, deploy your Next.js app to Cloud Run:

```bash
# Build the Docker image
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
  --memory 1Gi \
  --cpu 1 \
  --max-instances 10 \
  --project sonifyai-e5ebe
```

### 5. Set Environment Variables

Set your environment variables in Cloud Run:

```bash
gcloud run services update nextjs-server \
  --update-env-vars NEXTAUTH_URL=https://sonifyai-e5ebe.web.app \
  --update-env-vars NEXTAUTH_SECRET=your-secret-key \
  --update-env-vars SPOTIFY_CLIENT_ID=your-spotify-client-id \
  --update-env-vars SPOTIFY_CLIENT_SECRET=your-spotify-client-secret \
  --update-env-vars GEMINI_API_KEY=your-gemini-api-key \
  --update-env-vars NODE_ENV=production \
  --region us-central1 \
  --project sonifyai-e5ebe
```

### 6. Deploy to Firebase Hosting

Once Cloud Run is deployed, deploy Firebase Hosting:

```bash
firebase deploy --only hosting
```

Your app will be available at:
- https://sonifyai-e5ebe.web.app
- https://sonifyai-e5ebe.firebaseapp.com

### 7. Update Spotify OAuth Redirect URIs

In your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard):
1. Edit your app
2. Add redirect URIs:
   - `https://sonifyai-e5ebe.web.app/api/auth/callback/spotify`
   - `https://sonifyai-e5ebe.firebaseapp.com/api/auth/callback/spotify`

## Using the Deployment Script

You can also use the provided deployment script:

```bash
./deploy-firebase.sh
```

Make sure to update environment variables in the script or set them in Cloud Run first.

## Current Configuration

- **Firebase Project**: sonifyai-e5ebe
- **Hosting**: Configured to rewrite to Cloud Run service `nextjs-server`
- **Next.js Config**: Using `output: 'standalone'` for optimal Docker builds
- **Region**: us-central1

## Troubleshooting

### If Hosting Initialization Fails

Your `firebase.json` is already set up correctly. You can skip initialization if it causes issues.

### If Cloud Run Deployment Fails

1. Make sure you're logged in: `gcloud auth login`
2. Verify billing is enabled for the project
3. Check that APIs are enabled
4. Verify Docker is installed and running

### If Environment Variables Don't Work

Set them via the Cloud Run Console:
1. Go to [Cloud Run Console](https://console.cloud.google.com/run?project=sonifyai-e5ebe)
2. Click on `nextjs-server` service
3. Click "Edit & Deploy New Revision"
4. Go to "Variables & Secrets" tab
5. Add environment variables

