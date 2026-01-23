# Publishing Guide for shadcn-big-calendar

This guide explains how to publish the shadcn-big-calendar package to npm.

## Prerequisites

1. You need an npm account. Create one at [npmjs.com](https://www.npmjs.com/signup) if you don't have one.
2. Login to npm from your terminal:
   ```bash
   npm login
   ```

## Pre-publish Checklist

1. **Update version number** in `package.json`:
   - Follow [semantic versioning](https://semver.org/)
   - MAJOR.MINOR.PATCH (e.g., 1.0.0, 1.1.0, 1.0.1)

2. **Update package metadata** in `package.json`:
   - Update `author` field with your name and email
   - Verify `repository` URL is correct
   - Update `homepage` URL if needed

3. **Test the build**:
   ```bash
   npm run build:lib
   ```

4. **Verify the build output**:
   ```bash
   ls -la dist/
   ```

   You should see:
   - `index.js` (CommonJS)
   - `index.mjs` (ESM)
   - `index.d.ts` (TypeScript definitions)
   - `styles/shadcn-big-calendar.css`

5. **Test the package locally** (optional but recommended):
   ```bash
   npm pack
   ```

   This creates a `.tgz` file you can test in another project:
   ```bash
   npm install /path/to/shadcn-big-calendar-1.0.0.tgz
   ```

## Publishing Steps

### First Time Publishing

1. **Make the package public** (if it's currently private):
   - Remove `"private": true` from `package.json` (already done)

2. **Choose a unique package name**:
   - Check if the name is available: `npm view shadcn-big-calendar`
   - If taken, consider alternatives like:
     - `@your-username/shadcn-big-calendar`
     - `shadcn-ui-big-calendar`
     - `react-shadcn-calendar`

3. **Update package name in `package.json`** if needed

4. **Publish to npm**:
   ```bash
   npm publish
   ```

   Or if using a scoped package:
   ```bash
   npm publish --access public
   ```

### Updating an Existing Package

1. **Increment the version**:
   ```bash
   npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
   npm version minor  # for new features (1.0.0 -> 1.1.0)
   npm version major  # for breaking changes (1.0.0 -> 2.0.0)
   ```

2. **Publish the update**:
   ```bash
   npm publish
   ```

3. **Tag the release** (recommended):
   ```bash
   git tag v1.0.0
   git push --tags
   ```

## Post-publish Steps

1. **Verify the package** on npm:
   - Visit: `https://www.npmjs.com/package/shadcn-big-calendar`
   - Check that all files are included
   - Verify the README displays correctly

2. **Test installation**:
   ```bash
   npm install shadcn-big-calendar
   ```

3. **Create a GitHub release**:
   - Go to your repository's "Releases" page
   - Create a new release with the version tag
   - Add release notes describing changes

4. **Update documentation**:
   - Create a `CHANGELOG.md` to track versions
   - Update README with latest version examples

## Package Structure

The published package will include:

```
shadcn-big-calendar/
├── dist/
│   ├── index.js          # CommonJS build
│   ├── index.mjs         # ESM build
│   ├── index.d.ts        # TypeScript definitions
│   └── styles/
│       └── shadcn-big-calendar.css
├── package.json
├── README.md (from README.npm.md)
└── LICENSE
```

## Important Notes

### CSS Import Instructions for Users

Users will need to import the CSS in their projects:

```tsx
import "shadcn-big-calendar/styles";
// or
import "shadcn-big-calendar/dist/styles/shadcn-big-calendar.css";
```

Additionally, they need React Big Calendar's drag-and-drop styles:

```tsx
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
```

### Peer Dependencies

The package lists these as peer dependencies, meaning users must install them:

- `react` (^18.0.0)
- `react-dom` (^18.0.0)
- `react-big-calendar` (^1.13.0)
- `clsx` (^2.0.0)
- `tailwind-merge` (^2.0.0)

Optional peer dependencies:
- `moment` or `date-fns` (for localizer)
- `react-hook-form`, `@hookform/resolvers`, `zod` (if using EventForm)

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear the dist folder:
   ```bash
   rm -rf dist/
   ```

2. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Run the build again:
   ```bash
   npm run build:lib
   ```

### Publishing Errors

**"Package name already exists"**:
- Choose a different package name or use a scoped package

**"You must be logged in to publish packages"**:
- Run `npm login` and enter your credentials

**"You do not have permission to publish"**:
- Check if you're logged in with the correct account
- For scoped packages, use `--access public`

## Maintenance

### Regular Updates

- Update peer dependencies when new versions of React, React Big Calendar, etc. are released
- Test compatibility with new versions
- Update the CHANGELOG.md

### Support

- Monitor GitHub issues
- Respond to questions on npm package page
- Keep dependencies up to date for security

## Scripts Reference

```bash
# Build the library
npm run build:lib

# Type check
npm run type-check

# Prepare for publishing (runs automatically before publish)
npm run prepublishOnly

# Version bump
npm version patch|minor|major

# Publish
npm publish
```

## Additional Resources

- [npm Publishing Documentation](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Creating TypeScript Libraries](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
