# Preview Deployment Setup Guide

This document explains how to set up preview deployments for pull requests using GitHub Pages.

## Prerequisites

- Repository with GitHub Actions enabled
- GitHub Pages enabled in repository settings

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Select "gh-pages" branch and "/ (root)" folder
5. Click "Save"

### 2. Repository Permissions

The workflows require specific permissions that are automatically granted when using GitHub Actions with GitHub Pages.

## How It Works

### For Pull Requests

When a PR is opened or updated:
1. GitHub Actions builds the React app with a custom PUBLIC_URL for the PR
2. Deploys it to a subdirectory on GitHub Pages: `https://frubesss.github.io/github-agent-test/pr-{number}/`
3. Comments on the PR with the preview URL
4. Updates the comment when new commits are pushed

### When PR is Closed

1. GitHub Actions automatically removes the PR subdirectory from gh-pages
2. Updates the PR comment to indicate cleanup

## Troubleshooting

### Common Issues

1. **"Pages not enabled"**
   - Ensure GitHub Pages is enabled in repository settings
   - Check that gh-pages branch exists

2. **"Permission denied"**
   - The workflow automatically has the required permissions for GitHub Pages

3. **"Build failures"**
   - Check the Actions tab for detailed error logs
   - Ensure package.json scripts are working locally

### Testing the Setup

You can test the setup by:
1. Creating a test PR
2. Checking the Actions tab for workflow execution
3. Verifying the preview URL in PR comments
4. Checking that subdirectories are created in the gh-pages branch

## URL Structure

- **Production**: `https://frubesss.github.io/github-agent-test/`
- **PR Previews**: `https://frubesss.github.io/github-agent-test/pr-{number}/`

## Security Notes

- Preview deployments are publicly accessible at predictable URLs
- Each PR gets its own isolated subdirectory
- Deployments are automatically cleaned up when PRs are closed
- No external secrets or tokens required