# Deployment Guide - Gym Flow Front

## Overview
This project is configured for deployment on both **Netlify** and **Render**.

## Deployment Configurations

### Netlify Configuration (`netlify.toml`)
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 20
- **Routing:** All routes redirect to `/index.html` for client-side routing
- **Caching:** 
  - Static assets: 1 hour cache
  - index.html: No cache (must-revalidate)

### Render Configuration (`render.yaml`)
- **Build Command:** `npm install && npm run build`
- **Static Publish Path:** `dist`
- **Service Type:** Static site
- **Routing:** Client-side routing support
- **Headers:** Cache control configuration

## Deployment Steps

### Deploying to Netlify

1. **Connect Repository:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your GitHub/GitLab/Bitbucket repository
   - Authorize Netlify to access your repo

2. **Configure Build Settings:**
   - Build command: `npm run build` (auto-detected)
   - Publish directory: `dist` (auto-detected from netlify.toml)
   - Click "Deploy site"

3. **Environment Variables:**
   - Go to Site settings → Build & deploy → Environment
   - Add any required environment variables (if needed)

### Deploying to Render

1. **Create render.yaml Configuration:**
   - The `render.yaml` file is already in your repository

2. **Connect Repository:**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Deployment:**
   - Render will auto-detect `render.yaml`
   - Service name: `gym-flow-front`
   - Build command and static publish path will be auto-configured
   - Click "Create Web Service"

4. **Environment Variables (if needed):**
   - Go to Service settings → Environment
   - Add any required environment variables

## Environment Variables

If your API backend URL varies between environments, configure it:

1. Create a `.env.local` file locally (not committed):
   ```
   VITE_API_URL=http://your-api-url/api
   ```

2. Update your API calls to use:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
   ```

3. In deployment platforms, set the `VITE_API_URL` environment variable

## Build Output

- **Build Directory:** `dist/`
- **Base Path:** `/gym-flow/` (configured in vite.config.js)
- **Source Maps:** Disabled in production

## Client-Side Routing

Both platforms are configured to handle client-side routing by:
- Redirecting all routes to `index.html`
- React Router handles navigation client-side
- Status code 200 for all redirects (not 301/302)

## Troubleshooting

### 404 Errors on Refresh
- Ensure the redirect rule `/* -> /index.html` with status 200 is applied
- Check that the base path `/gym-flow/` matches your deployment URL structure

### API Connection Issues
- Verify environment variables are set correctly
- Check CORS configuration on your backend
- Ensure backend API URL is accessible from the deployment domain

### Build Failures
- Ensure Node.js version is 20+
- Clear build cache and redeploy
- Check build logs for specific errors

## Local Development

```bash
npm install
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Next Steps

1. Commit `netlify.toml` and `render.yaml` to your repository
2. Push to your main branch
3. Follow the deployment steps above
4. Monitor deployment logs for any issues
