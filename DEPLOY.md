# How to Deploy ParlayX Website

Your code is now on GitHub at: **https://github.com/Cryptic12321/ParlayX**

## Option 1: Deploy with Vercel (Easiest & Recommended) ⚡

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Sign up/login with your **GitHub account** (one-click authentication)
4. Once logged in, click **"Add New..."** → **"Project"**
5. Find and **import** your `ParlayX` repository
6. Vercel will auto-detect it's a Vite project
7. **Environment Variables**: Click "Environment Variables" and add:
   - Key: `VITE_ODDS_API_KEY`
   - Value: Your API key (if you have one)
8. Click **"Deploy"**
9. Wait 2-3 minutes for deployment
10. Your site will be live at: `https://parlayx.vercel.app` (or similar)

✅ **Done!** Your website is now live on the internet!

---

## Option 2: Deploy with Netlify 🚀

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"** → Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"Deploy with GitHub"**
5. Select your `ParlayX` repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Click **"Show advanced"** → **"New variable"**
   - Key: `VITE_ODDS_API_KEY`
   - Value: Your API key
8. Click **"Deploy site"**
9. Your site will be live at: `https://random-name.netlify.app`

---

## Option 3: GitHub Pages (Free but requires setup)

1. Go to your repository: https://github.com/Cryptic12321/ParlayX
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under "Source", select **"GitHub Actions"**
5. Go to the **"Actions"** tab
6. Create `.github/workflows/deploy.yml` file (see below)

### Create GitHub Actions Workflow

1. In your repository, click **"Add file"** → **"Create new file"**
2. Name it: `.github/workflows/deploy.yml`
3. Paste this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_ODDS_API_KEY: ${{ secrets.VITE_ODDS_API_KEY }}
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
          
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. Click **"Commit new file"**
5. Go back to **Settings** → **Pages**
6. Your site will be at: `https://cryptic12321.github.io/ParlayX/`

---

## Quick Links

- **Your Repository**: https://github.com/Cryptic12321/ParlayX
- **View Code**: Just refresh the repository page - you should see all your files

## After Deployment

Your website will be accessible to anyone on the internet! Share the URL with friends.

**Tip**: Vercel is the fastest and easiest option - it takes less than 5 minutes! 🚀

