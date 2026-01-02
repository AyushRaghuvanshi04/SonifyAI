# Firebase Deployment Guide for SonifyAI

This guide explains how to deploy SonifyAI to Firebase Hosting with Cloud Run.

## Prerequisites

1. **Firebase CLI installed** (already installed ✓)
   ```bash
   npm install -g firebase-tools
   ```

2. **Google Cloud Account** with billing enabled
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable billing (Firebase requires billing for Cloud Run)

3. **Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Note your project ID

## Setup Steps

### 1. Login to Firebase

```bash
firebase login
```

This will open a browser window for authentication.

### 2. Initialize Firebase Project

```bash
firebase init
```

When prompted:
- **Select features**: Choose "Hosting" and "Run"
- **Select a Firebase project**: Choose your project (or create a new one)
- **Public directory**: Enter `out` (we'll use Cloud Run, but this is required)
- **Single-page app**: No
- **Set up automatic builds**: No (we'll deploy manually)

### 3. Update Firebase Configuration

Edit `.firebaserc` and replace `your-firebase-project-id` with your actual Firebase project ID.

### 4. Enable Required APIs

Enable the following APIs in Google Cloud Console:

```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Cloud Build API
gcloud services enable cloudbuild.googleapis.com

# Enable Container Registry API
gcloud services enable containerregistry.googleapis.com
```

Or enable them via the [Google Cloud Console](https://console.cloud.google.com/apis/library):
- Cloud Run Admin API
- Cloud Build API
- Container Registry API

### 5. Set Environment Variables

Set environment variables in Google Cloud Run:

```bash
# Set your environment variables
gcloud run services update nextjs-server \
  --update-env-vars NEXTAUTH_URL=https://your-project-id.web.app \
  --update-env-vars NEXTAUTH_SECRET=your-secret-key \
  --update-env-vars SPOTIFY_CLIENT_ID=your-spotify-client-id \
  --update-env-vars SPOTIFY_CLIENT_SECRET=your-spotify-client-secret \
  --update-env-vars GEMINI_API_KEY=your-gemini-api-key \
  --region=us-central1
```

Or set them via the [Cloud Run Console](https://console.cloud.google.com/run):
1. Go to Cloud Run
2. Select your service
3. Click "Edit & Deploy New Revision"
4. Go to "Variables & Secrets" tab
5. Add environment variables

### 6. Build and Deploy

#### Option A: Using Cloud Build (Recommended)

```bash
# Submit build to Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Deploy to Firebase Hosting (this connects Hosting to Cloud Run)
firebase deploy --only hosting
```

#### Option B: Manual Deployment

```bash
# Build Docker image locally (optional, for testing)
docker build -t nextjs-server .

# Push to Container Registry
docker tag nextjs-server gcr.io/YOUR_PROJECT_ID/nextjs-server
docker push gcr.io/YOUR_PROJECT_ID/nextjs-server

# Deploy to Cloud Run
gcloud run deploy nextjs-server \
  --image gcr.io/YOUR_PROJECT_ID/nextjs-server \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### 7. Update Spotify OAuth Redirect URI

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Edit your app
3. Add redirect URI: `https://YOUR_PROJECT_ID.web.app/api/auth/callback/spotify`
4. Also add: `https://YOUR_PROJECT_ID.firebaseapp.com/api/auth/callback/spotify`

### 8. Verify Deployment

Your app will be available at:
- `https://YOUR_PROJECT_ID.web.app`
- `https://YOUR_PROJECT_ID.firebaseapp.com`

## Updating Environment Variables

To update environment variables after deployment:

```bash
gcloud run services update nextjs-server \
  --update-env-vars KEY=value \
  --region=us-central1
```

Or use the Cloud Run Console.

## Updating the Application

To deploy updates:

```bash
# Rebuild and deploy
gcloud builds submit --config cloudbuild.yaml

# Or manually
docker build -t gcr.io/YOUR_PROJECT_ID/nextjs-server .
docker push gcr.io/YOUR_PROJECT_ID/nextjs-server
gcloud run deploy nextjs-server --image gcr.io/YOUR_PROJECT_ID/nextjs-server --region us-central1
```

## Monitoring and Logs

View logs:

```bash
gcloud run services logs read nextjs-server --region us-central1
```

Or view in the [Cloud Run Console](https://console.cloud.google.com/run).

## Cost Considerations

- **Cloud Run**: Pay per request and compute time
- **Firebase Hosting**: Free tier available (10 GB storage, 360 MB/day transfer)
- **Cloud Build**: Free tier available (120 build-minutes/day)

Estimated costs for low traffic: **$0-10/month**

## Troubleshooting

### Build Fails

1. Check that all environment variables are set
2. Verify Dockerfile is correct
3. Check Cloud Build logs in the Console

### Service Won't Start

1. Check Cloud Run logs
2. Verify environment variables are set correctly
3. Ensure port 3000 is exposed in Dockerfile

### API Routes Not Working

1. Verify Firebase Hosting rewrites are configured correctly
2. Check that Cloud Run service is accessible
3. Verify CORS settings if needed

### Authentication Issues

1. Verify `NEXTAUTH_URL` matches your Firebase Hosting URL
2. Check Spotify redirect URIs include your Firebase domain
3. Ensure `NEXTAUTH_SECRET` is set correctly

## Alternative: Static Export (Not Recommended)

If you want to deploy as a static site (API routes won't work):

```bash
# In next.config.ts, remove output: 'standalone'
# Add output: 'export'

# Build static export
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

**Note**: This will disable API routes and SSR. Not recommended for this app.

## Support

For issues:
1. Check [Firebase Documentation](https://firebase.google.com/docs/hosting)
2. Check [Cloud Run Documentation](https://cloud.google.com/run/docs)
3. Review logs in Cloud Run Console

