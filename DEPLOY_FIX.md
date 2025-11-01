# Fix for Vercel Deployment Error

The error you're seeing is because the `usb` package (used by hardware wallets like Ledger) requires native compilation which doesn't work on Vercel.

## Solution Applied ✅

I've created two files to fix this:

1. **`.npmrc`** - Tells npm to skip optional dependencies
2. **`vercel.json`** - Configures Vercel to use the correct install command

## What to Do Now:

### Option 1: Redeploy on Vercel (Recommended)

1. Go back to your Vercel dashboard
2. The files are already pushed to GitHub, so Vercel should auto-detect the changes
3. Or manually trigger a new deployment:
   - Go to your project in Vercel
   - Click "Deployments" tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger auto-deploy

### Option 2: Configure Vercel Environment Variables

In your Vercel project settings, add this environment variable:

- **Key**: `NPM_CONFIG_OPTIONAL`
- **Value**: `false`

This ensures optional dependencies (like `usb`) are skipped during install.

### Option 3: Use Netlify Instead

Netlify sometimes handles these dependencies better. Follow the DEPLOY.md guide for Netlify setup.

## Files Created:

- `.npmrc` - npm configuration
- `vercel.json` - Vercel deployment configuration

These are already in your repository and will be used on the next deployment!

## Next Steps:

1. Commit and push these new files (if not already done)
2. Wait for Vercel to auto-redeploy, or trigger a manual redeploy
3. Your site should deploy successfully!

The error should be fixed now. If you still see issues, let me know!

