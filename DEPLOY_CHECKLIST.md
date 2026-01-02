# Deployment Checklist

## ❌ Don't run `firebase deploy` yet!

Your Firebase Hosting is configured to route requests to a Cloud Run service called `nextjs-server`, but that service doesn't exist yet.

## ✅ What You Need to Do First

### Step 1: Deploy to Cloud Run (REQUIRED)

Your Next.js app needs to be running on Cloud Run before Firebase Hosting can route to it.

```bash
# 1. Build Docker image
docker build -t gcr.io/sonifyai-e5ebe/nextjs-server .

# 2. Push to Container Registry
docker push gcr.io/sonifyai-e5ebe/nextjs-server

# 3. Deploy to Cloud Run
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

### Step 2: Set Environment Variables (REQUIRED)

After Cloud Run is deployed, set your environment variables:

```bash
gcloud run services update nextjs-server \
  --update-env-vars NEXTAUTH_URL=https://sonifyai-e5ebe.web.app,NEXTAUTH_SECRET=your-secret-key,SPOTIFY_CLIENT_ID=your-id,SPOTIFY_CLIENT_SECRET=your-secret,GEMINI_API_KEY=your-key,NODE_ENV=production \
  --region us-central1 \
  --project sonifyai-e5ebe
```

**Replace with your actual values:**
- `your-secret-key` - Your NEXTAUTH_SECRET (you already have this in .env.local)
- `your-id` - Your Spotify Client ID
- `your-secret` - Your Spotify Client Secret  
- `your-key` - Your Gemini API Key

### Step 3: THEN Deploy Firebase Hosting (After Cloud Run exists)

Once Cloud Run service is deployed, then you can run:

```bash
firebase deploy --only hosting
```

Or deploy everything:

```bash
firebase deploy
```

## Quick Check: Is Cloud Run Service Deployed?

Check if the service exists:

```bash
gcloud run services list --project=sonifyai-e5ebe --region=us-central1
```

If you see `nextjs-server` in the list, you can proceed. If not, you need to deploy it first.

## Prerequisites Check

Before deploying, make sure you have:

- ✅ Docker installed and running
- ✅ Google Cloud SDK installed (`gcloud`)
- ✅ Logged into Google Cloud: `gcloud auth login`
- ✅ Billing enabled (for Cloud Run)
- ✅ APIs enabled:
  ```bash
  gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com --project=sonifyai-e5ebe
  ```

## Alternative: Use the Deployment Script

You can also use the provided script:

```bash
./deploy-firebase.sh
```

But make sure to update environment variables in the script first, or set them manually after deployment.

## Summary

**Order of operations:**
1. ✅ Deploy to Cloud Run first
2. ✅ Set environment variables
3. ✅ THEN deploy Firebase Hosting

**Don't skip steps 1-2 or your app won't work!**

