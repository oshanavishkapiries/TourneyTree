# How to Publish @osh2002/tourneytree to NPM

## Step-by-Step Publishing Guide

### Prerequisites

1. **Node.js and npm installed** (check with `node --version` and `npm --version`)
2. **NPM account** - Create one at [npmjs.com](https://www.npmjs.com) if you don't have one
3. **Package built and tested** - Make sure your package builds successfully

### Step 1: Create NPM Account (if you don't have one)

```bash
# Visit https://www.npmjs.com/signup
# Choose a username (this will be your organization name for scoped packages)
```

### Step 2: Login to NPM

```bash
cd package
npm login
```

You'll be prompted to enter:

- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### Step 3: Verify Your Login

```bash
npm whoami
# Should display your NPM username
```

### Step 4: Build Your Package

```bash
# Make sure you're in the package directory
cd package

# Install dependencies
npm install

# Build the package
npm run build
```

### Step 5: Test the Package Locally (Optional but Recommended)

```bash
# Link the package locally
npm link

# Test in another project
cd /path/to/test-project
npm link @osh2002/tourneytree

# Use the package in your test project to verify it works
```

### Step 6: Publish to NPM

```bash
cd package

# First publication
npm publish

# For scoped packages (like @osh2002/tourneytree), make sure it's public
npm publish --access public
```

### Step 7: Verify Publication

1. Check on NPM website: `https://www.npmjs.com/package/@osh2002/tourneytree`
2. Install in a test project: `npm install @osh2002/tourneytree`

## Important Notes

### Package Name Requirements

- Your package name `@osh2002/tourneytree` is a **scoped package**
- The scope `@oshan` must match your NPM username or organization
- If your NPM username is different, you need to either:
  1. Change the package name in `package.json` to match your username
  2. Create an NPM organization named "oshan"

### Version Management

- First publication will be version `1.0.0`
- For updates, increment version in `package.json` then republish
- Use semantic versioning: `major.minor.patch`

### Scoped Package Access

```bash
# For scoped packages, explicitly set public access
npm publish --access public
```

## Common Issues & Solutions

### Issue: Package name conflict

```bash
# Error: Package name already exists
# Solution: Change package name in package.json
{
  "name": "@yourusername/tourneytree"
}
```

### Issue: Authentication problems

```bash
# Solution: Re-login
npm logout
npm login
```

### Issue: Scoped package appears private

```bash
# Solution: Publish with public access
npm publish --access public
```

### Issue: Build files missing

```bash
# Make sure build completed successfully
npm run build
# Verify dist/ folder exists with built files
```

## Alternative: Using NPX for One-time Setup

```bash
# Alternative login method
npx npm-cli-login
```

## Package.json Verification

Before publishing, ensure your `package.json` has:

```json
{
  "name": "@osh2002/tourneytree",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md", "package.json"],
  "publishConfig": {
    "access": "public"
  }
}
```

## Post-Publication Steps

### 1. Test Installation

```bash
# In a new project
npm install @osh2002/tourneytree

# Test import
import { TourneyTree } from '@osh2002/tourneytree';
```

### 2. Update Documentation

- Update README with installation instructions
- Add NPM badge: `[![npm version](https://badge.fury.io/js/@oshan%2Ftourneytree.svg)](https://badge.fury.io/js/@oshan%2Ftourneytree)`

### 3. Version Updates

```bash
# For future updates
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Then republish
npm publish
```

## Security Best Practices

1. **Enable 2FA**: `npm profile enable-2fa auth-and-writes`
2. **Check package contents**: `npm pack` (creates tarball to inspect)
3. **Review before publishing**: `npm publish --dry-run`

## Quick Commands Summary

```bash
cd package
npm login
npm install
npm run build
npm publish --access public
```

After successful publication, your package will be available at:

- **NPM Registry**: `https://www.npmjs.com/package/@osh2002/tourneytree`
- **Installation**: `npm install @osh2002/tourneytree`
- **CDN**: `https://unpkg.com/@osh2002/tourneytree`

🚀 **Your package will be live and ready for developers to use!**
