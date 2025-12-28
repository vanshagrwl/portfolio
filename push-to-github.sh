#!/bin/bash

# Script to push portfolio to GitHub
# Replace YOUR_USERNAME with your GitHub username

echo "🚀 Pushing portfolio to GitHub..."

# Add remote (replace YOUR_USERNAME with your GitHub username)
read -p "Enter your GitHub username: " GITHUB_USERNAME

git remote add origin https://github.com/${GITHUB_USERNAME}/portfolio.git 2>/dev/null || echo "Remote already exists or error occurred"

# Set main branch
git branch -M main

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Your portfolio is now on GitHub!"
echo "🌐 Next step: Deploy to Netlify (see DEPLOYMENT.md)"

