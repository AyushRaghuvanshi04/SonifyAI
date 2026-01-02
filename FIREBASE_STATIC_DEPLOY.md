# Firebase Static Deployment Guide

Your app is now configured for static export to Firebase Hosting.

## Quick Deploy

```bash
# 1. Build the static site
npm run build

# 2. Deploy to Firebase Hosting
firebase deploy --only hosting
```

That's it! Your app will be live at:
- https://sonifyai-e5ebe.web.app
- https://sonifyai-e5ebe.firebaseapp.com

## What Changed

1. **next.config.ts**: Changed from `output: 'standalone'` to `output: 'export'`
2. **firebase.json**: Removed Cloud Run rewrites, using simple static hosting
3. **Images**: Set to `unoptimized: true` for static export compatibility

## Limitations

⚠️ **Important**: This static export means API routes won't work. See `STATIC_DEPLOYMENT_WARNING.md` for details.

## Build Output

The build will create an `out/` directory with all static files. Firebase Hosting will serve these files.

## Environment Variables

Since this is a static export, environment variables need to be:
- Set at build time (baked into the build)
- Or accessed client-side only (exposed in the code)

**Note**: Sensitive API keys should NOT be exposed client-side!

## Redeploy After Changes

```bash
npm run build
firebase deploy --only hosting
```

## Custom Domain (Optional)

1. Go to Firebase Console → Hosting
2. Add custom domain
3. Follow DNS configuration instructions

