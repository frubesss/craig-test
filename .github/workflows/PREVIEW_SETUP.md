# Preview Deployment Setup Guide

This document explains how to set up preview deployments for pull requests using Surge.sh.

## Prerequisites

- Repository with GitHub Actions enabled
- Surge.sh account

## Setup Steps

### 1. Create Surge.sh Account

1. Visit [surge.sh](https://surge.sh/)
2. Sign up for a free account

### 2. Generate Surge Token

You need to generate a token for the GitHub Actions to authenticate with Surge.sh:

```bash
# Install Surge CLI locally
npm install -g surge

# Login and generate token
surge login
surge token
```

Copy the token that's displayed.

### 3. Add Repository Secret

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `SURGE_TOKEN`
5. Value: Paste the token from step 2
6. Click "Add secret"

## How It Works

### For Pull Requests

When a PR is opened or updated:
1. GitHub Actions builds the React app
2. Deploys it to a unique Surge.sh URL: `https://pr-{number}-craig-test.surge.sh`
3. Comments on the PR with the preview URL
4. Updates the comment when new commits are pushed

### When PR is Closed

1. GitHub Actions automatically tears down the preview deployment
2. Updates the PR comment to indicate cleanup

## Troubleshooting

### Common Issues

1. **"surge command not found"**
   - The workflow automatically installs surge globally

2. **"Authentication failed"**
   - Check that `SURGE_TOKEN` secret is correctly set
   - Regenerate token if needed: `surge token`

3. **"Domain already exists"**
   - This shouldn't happen with PR numbers, but if it does, the workflow will overwrite

### Testing the Setup

You can test the setup by:
1. Creating a test PR
2. Checking the Actions tab for workflow execution
3. Verifying the preview URL in PR comments

## Security Notes

- Surge tokens have limited scope (only deployment permissions)
- Preview deployments are publicly accessible but have unique, hard-to-guess URLs
- Deployments are automatically cleaned up when PRs are closed