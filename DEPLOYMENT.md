
# GitHub Pages Deployment Guide

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

Your app will be available at: **https://abner-benjamin.github.io/tandemi/**

## Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository on GitHub (https://github.com/abner-benjamin/tandemi)
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push your changes**: The deployment will automatically trigger when you push to the main branch

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

- Make sure GitHub Pages is enabled in your repository settings with "GitHub Actions" as the source
- Check the Actions tab for any deployment errors
- Ensure your repository is public (GitHub Pages requires public repos for free accounts)

## Repository Details

- Repository: https://github.com/abner-benjamin/tandemi
- Live URL: https://abner-benjamin.github.io/tandemi/
- Base path configured: `/tandemi/`
