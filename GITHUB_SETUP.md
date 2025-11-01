# Publishing ParlayX to GitHub

Follow these steps to publish your ParlayX website on GitHub:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it `parlayx` (or any name you prefer)
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Prepare Your Local Repository

Your repository is already initialized. Now let's add and commit your files:

```bash
# Add all files (except those in .gitignore)
git add .

# Commit your changes
git commit -m "Initial commit: ParlayX crypto sports betting platform"
```

## Step 3: Connect to GitHub and Push

Replace `YOUR_USERNAME` with your GitHub username:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/parlayx.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** GitHub might ask for authentication. You can:
- Use a Personal Access Token (recommended)
- Or use GitHub CLI: `gh auth login`

## Step 4: Enable GitHub Pages (Optional - Host for Free!)

If you want to host your website for free on GitHub Pages:

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** (in the left sidebar)
4. Under "Source", select **GitHub Actions**
5. Go to the **Actions** tab
6. Create a new workflow or use the one below

### Create GitHub Pages Workflow

Create `.github/workflows/deploy.yml`:

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

### Add API Key as Secret (if using real API)

1. Go to repository **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Name: `VITE_ODDS_API_KEY`
4. Value: Your actual API key
5. Click **Add secret**

Your site will be available at: `https://YOUR_USERNAME.github.io/parlayx/`

## Alternative: Deploy to Vercel/Netlify

### Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable: `VITE_ODDS_API_KEY`
6. Click "Deploy"

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Click "Add new site" > "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add environment variable: `VITE_ODDS_API_KEY`
8. Click "Deploy site"

## Troubleshooting

**Git push fails?**
- Make sure you're authenticated: `git config --global user.name "Your Name"` and `git config --global user.email "your.email@example.com"`
- Use a Personal Access Token instead of password

**Files too large?**
- Make sure `.gitignore` is working: `git status` should not show `node_modules`
- Large files might need Git LFS

**Need to update later?**
```bash
git add .
git commit -m "Your update message"
git push
```

