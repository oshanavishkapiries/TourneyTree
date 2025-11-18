# Build Instructions for @osh2002/tourneytree

## Prerequisites

Make sure you have Node.js and npm installed.

## Step 1: Install Dependencies

Navigate to the package directory and run:

```bash
cd package
npm install
```

## Step 2: Build the Package

Run the build command:

```bash
npm run build
```

This will:

- Compile TypeScript to JavaScript
- Generate type declarations (.d.ts files)
- Create both CommonJS and ES Module builds
- Output everything to the `dist/` directory

## Step 3: Test the Package Locally

You can test the package locally by linking it:

```bash
npm link
```

Then in another project:

```bash
npm link @osh2002/tourneytree
```

## Expected Build Output

After a successful build, you should see:

- `dist/index.js` - CommonJS build
- `dist/index.esm.js` - ES Module build
- `dist/index.d.ts` - TypeScript declarations
- `dist/*.map` - Source maps

## Package Structure Validation

### Files Created:

✅ package.json - Package configuration
✅ tsconfig.json - TypeScript configuration  
✅ rollup.config.js - Build configuration
✅ src/index.ts - Main entry point
✅ src/types.ts - TypeScript definitions
✅ src/config.ts - Default configurations
✅ src/components/ - React components
✅ src/hooks/ - Custom React hooks
✅ src/utils/ - Utility functions
✅ example/ - Usage examples
✅ README.md - Documentation

### Component Structure:

- TourneyTree (main component)
- TournamentCard (individual match card)
- ZoomControls (zoom UI controls)

### Hooks:

- useStageZoom (zoom functionality)
- useStageSize (responsive sizing)
- useStageControls (pan/drag controls)
- usePathHighlighting (tournament path highlighting)

### Utilities:

- Layout calculation functions
- Tournament tree positioning
- Configuration merging

## Usage After Build

```jsx
import { TourneyTree } from "@osh2002/tourneytree";

const tournamentData = {
  "Round-01": [{ seed: "1 vs 2", player1: "Alice", player2: "Bob" }],
};

<TourneyTree data={tournamentData} />;
```

## Publishing to NPM

After successful build:

```bash
npm login
npm publish
```

## Troubleshooting

If you encounter build errors, check:

1. All dependencies are installed
2. TypeScript version compatibility
3. Node.js version (recommend 16+)
4. No syntax errors in source files

The package is configured to:

- Bundle all dependencies (React, Konva, etc.)
- Support both React and Next.js
- Export TypeScript definitions
- Provide both CommonJS and ES Module builds
