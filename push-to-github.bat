@echo off
REM Script to push portfolio to GitHub (Windows)
REM Replace YOUR_USERNAME with your GitHub username

echo 🚀 Pushing portfolio to GitHub...

REM Add remote (replace YOUR_USERNAME with your GitHub username)
set /p GITHUB_USERNAME="Enter your GitHub username: "

git remote add origin https://github.com/%GITHUB_USERNAME%/portfolio.git 2>nul || echo Remote already exists or error occurred

REM Set main branch
git branch -M main

REM Push to GitHub
echo 📤 Pushing to GitHub...
git push -u origin main

echo ✅ Done! Your portfolio is now on GitHub!
echo 🌐 Next step: Deploy to Netlify (see DEPLOYMENT.md)

pause

