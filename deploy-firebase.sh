#!/bin/bash

# Firebase Deployment Script for SonifyAI
# This script helps deploy SonifyAI to Firebase Hosting with Cloud Run

set -e

echo "🚀 Starting Firebase deployment for SonifyAI..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed. Install it with: npm install -g firebase-tools"
    exit 1
fi

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud SDK is not installed. Install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Get project ID from .firebaserc
PROJECT_ID=$(grep -o '"default": "[^"]*"' .firebaserc | cut -d'"' -f4)

if [ "$PROJECT_ID" = "your-firebase-project-id" ]; then
    echo "❌ Please update .firebaserc with your Firebase project ID"
    exit 1
fi

echo "📦 Project ID: $PROJECT_ID"

# Step 1: Build the application
echo "🔨 Building Next.js application..."
npm run build

# Step 2: Build Docker image
echo "🐳 Building Docker image..."
docker build -t gcr.io/$PROJECT_ID/nextjs-server .

# Step 3: Push to Container Registry
echo "📤 Pushing to Container Registry..."
docker push gcr.io/$PROJECT_ID/nextjs-server

# Step 4: Deploy to Cloud Run
echo "☁️ Deploying to Cloud Run..."
gcloud run deploy nextjs-server \
  --image gcr.io/$PROJECT_ID/nextjs-server \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --memory 1Gi \
  --cpu 1 \
  --max-instances 10

# Step 5: Deploy to Firebase Hosting
echo "🔥 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment complete!"
echo "🌐 Your app is available at: https://$PROJECT_ID.web.app"
echo "🌐 Also available at: https://$PROJECT_ID.firebaseapp.com"

