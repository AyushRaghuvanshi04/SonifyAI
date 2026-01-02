# Why You Can't Deploy Yet

## ❌ Don't Run `firebase deploy` Now

Your Firebase Hosting is configured to route requests to a Cloud Run service called `nextjs-server`, but:

1. **The Cloud Run service doesn't exist yet** - Firebase Hosting will fail because it can't find the service to route to
2. **You need Docker** - Required to build the container image for Cloud Run
3. **You need Google Cloud SDK** - Required to deploy to Cloud Run

## What Your Setup Needs

Your `firebase.json` shows:
```json
"rewrites": [
  {
    "source": "**",
    "run": {
      "serviceId": "nextjs-server",  // ← This service must exist first!
      "region": "us-central1"
    }
  }
]
```

Firebase Hosting will try to route all requests to `nextjs-server`, but that service needs to be deployed to Cloud Run first.

## Prerequisites You Need

### 1. Install Docker
```bash
# macOS: Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop
```

### 2. Install Google Cloud SDK
```bash
# macOS: 
brew install --cask google-cloud-sdk

# Or download from:
# https://cloud.google.com/sdk/docs/install
```

### 3. Authenticate
```bash
gcloud auth login
gcloud config set project sonifyai-e5ebe
```

### 4. Enable APIs
```bash
gcloud services enable run.googleapis.com \
  cloudbuild.googleapis.com \
  containerregistry.googleapis.com \
  --project=sonifyai-e5ebe
```

## What Happens If You Deploy Now?

If you run `firebase deploy --only hosting` now:
- ✅ Firestore rules/indexes will deploy (if you want)
- ✅ Functions will deploy (if you want)
- ❌ Hosting will fail because Cloud Run service doesn't exist
- ❌ Your site won't work

## The Correct Order

1. **Deploy to Cloud Run first** (creates the `nextjs-server` service)
2. **Set environment variables** in Cloud Run
3. **THEN deploy Firebase Hosting** (can now route to the existing service)

## Alternative: Static Export (Not Recommended)

If you want to deploy quickly without Cloud Run:
- Change `next.config.ts` to use `output: 'export'`
- Build: `npm run build`
- Deploy: `firebase deploy --only hosting`

**But this disables API routes and SSR** - not good for your app!

## Recommendation

Set up Docker and Google Cloud SDK, then follow the deployment steps. See `DEPLOY_CHECKLIST.md` for the full process.

