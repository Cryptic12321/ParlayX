# Vercel Deployment Fix Instructions

## The Issue
Vercel is still trying to use `npm ci` which fails because of package-lock.json sync issues.

## Solution: Add Environment Variable in Vercel Dashboard

Since Vercel might not always respect vercel.json immediately, we need to set environment variables directly in Vercel:

### Steps:
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your **ParlayX** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables (for Production, Preview, and Development):

   **Variable 1:**
   - Key: `NPM_CONFIG_OMIT`
   - Value: `optional`
   
   **Variable 2:**
   - Key: `NPM_CONFIG_LEGACY_PEER_DEPS`
   - Value: `true`

5. Click **"Save"** for each variable
6. Go back to **Deployments** tab
7. Click **"Redeploy"** on the latest deployment
8. Or push a new commit to trigger auto-deploy

## Alternative: Use .npmrc (Already Done ✅)

The `.npmrc` file has been updated and should work. But if Vercel still has issues, use the environment variables above.

## Why This Works
- `NPM_CONFIG_OMIT=optional` tells npm to skip optional dependencies (like `usb`)
- This prevents the native compilation errors
- Your web wallets (Phantom, Solflare) will still work fine

