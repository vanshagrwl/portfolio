# Deployment Instructions

## GitHub Repository Setup

Since GitHub CLI is not available, follow these steps to create and push to your repository:

### Step 1: Create Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `portfolio`
5. Choose **Public** visibility
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### Step 2: Connect and Push

After creating the repository, GitHub will show you commands. Run these in your terminal from the `project` directory:

```bash
cd project
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Netlify Deployment

### Option 1: Deploy via GitHub (Recommended)

1. Go to [Netlify](https://app.netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your `portfolio` repository
4. Netlify will automatically detect the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"
6. Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd project
netlify deploy --prod
```

### Option 3: Drag and Drop

1. Build your project:
   ```bash
   cd project
   npm run build
   ```

2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder
4. Your site will be live!

## Post-Deployment

After deployment, verify:
- ✅ Profile photo loads correctly
- ✅ Resume download works
- ✅ All animations are smooth
- ✅ Projects display correctly
- ✅ Certificates expand/stack feature works
- ✅ Mobile responsiveness

## Custom Domain (Optional)

1. In Netlify dashboard, go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Environment Variables

Currently, no environment variables are needed. If you add any in the future:
1. Go to Site settings → Environment variables
2. Add your variables
3. Redeploy the site

