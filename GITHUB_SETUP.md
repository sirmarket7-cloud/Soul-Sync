# ⚡ Quick GitHub Setup Guide

## Step 1: Create Repository
```
1. Go to https://github.com/new
2. Repository name: soulsync-website
3. Visibility: Public (for free Pages hosting)
4. ✅ Initialize with README (or skip if uploading existing)
5. Click "Create repository"
```

## Step 2: Upload Files

### Option A: Web Upload (Easiest)
```
1. Open your new repo on GitHub
2. Click "+" → "Upload files"
3. Drag & drop ALL project files
4. Click "Commit changes"
```

### Option B: Command Line
```bash
# Clone your empty repo
git clone https://github.com/YOURUSERNAME/soulsync-website.git
cd soulsync-website

# Copy all project files here
# Then push
git add .
git commit -m "Initial: Soul Sync website"
git push origin main
```

### Option C: GitHub Codespaces
```bash
# In Codespaces:
# 1. Upload files to the workspace
# 2. In terminal:
git add .
git commit -m "Initial: Soul Sync website"
git push origin main
```

## Step 3: Enable GitHub Pages
```
1. Go to Settings → Pages (in your repo)
2. Source: Deploy from a branch
3. Branch: main → / (root)
4. Click "Save"
5. Wait 1-2 minutes
6. Your site: https://YOURUSERNAME.github.io/soulsync-website
```

## Step 4: Verify
```
✅ Open https://YOURUSERNAME.github.io/soulsync-website
✅ Check language switch (EN | عربي)
✅ Check all pages: /privacy.html, /terms.html, /help.html
✅ Check mobile responsiveness
```

## 🔄 Auto Deploy
GitHub Actions is already configured!
- Every push to `main` → auto deploy
- Check progress: Actions tab in your repo
