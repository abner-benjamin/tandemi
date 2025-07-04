
# GitHub Pages Deployment Guide

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Setup Instructions

1. **Update the base path**: Edit `vite.config.ts` and replace `'your-repo-name'` with your actual GitHub repository name:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/your-actual-repo-name/' : '/',
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

3. **Push your changes**: The deployment will automatically trigger when you push to the main branch

## Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The built files will be in the 'dist' folder
# You can then upload these files to any static hosting service
```

## Local Preview

To preview the production build locally:

```bash
npm run build
npm run preview
```

## Troubleshooting

- Make sure the repository name in `vite.config.ts` matches your GitHub repository name exactly
- Ensure GitHub Pages is enabled in your repository settings
- Check the Actions tab for any deployment errors
