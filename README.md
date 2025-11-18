# @osh2002/tourneytree

![](./banner.gif)

A React/Next.js component library for rendering interactive elimination tournament brackets with Konva.js canvas.

## Features

- 🏆 **Tournament Brackets**: Render elimination tournament trees with automatic layout
- 🎨 **Customizable Styling**: Built-in light/dark themes and custom color support
- 🔍 **Zoom & Pan**: Interactive zoom and pan controls
- ✨ **Path Highlighting**: Highlight tournament paths on hover
- 📱 **Responsive**: Works on desktop and mobile devices
- 🎯 **Event Handling**: Click and hover events for custom interactions
- ⚡ **Performance**: Canvas-based rendering with Konva.js
- 📦 **Zero Config**: Works out of the box with sensible defaults

## Installation

```bash
npm install @osh2002/tourneytree
```

## Quick Start

```tsx
import React from "react";
import { TourneyTree } from "@osh2002/tourneytree";

const tournamentData = {
  "Round-01": [
    { seed: "1 vs 2", player1: "Alice", player2: "Bob" },
    { seed: "3 vs 4", player1: "Charlie", player2: "David" },
  ],
  "Round-02": [{ seed: "1 vs 3", player1: "Alice", player2: "Charlie" }],
};

function App() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <TourneyTree data={tournamentData} />
    </div>
  );
}

export default App;
```

## Advanced Usage

### Custom Configuration

```tsx
import {
  TourneyTree,
  defaultLayoutConfig,
  darkColorTheme,
} from "@osh2002/tourneytree";

function CustomTournament() {
  const customConfig = {
    ...defaultLayoutConfig,
    cardWidth: 250,
    cardHeight: 80,
    roundSpacing: 350,
  };

  const handleCardClick = (match, roundIndex, matchIndex) => {
    console.log("Card clicked:", { match, roundIndex, matchIndex });
  };

  const handleCardHover = (match, roundIndex, matchIndex) => {
    if (match) {
      console.log("Hovering over:", match);
    }
  };

  return (
    <TourneyTree
      data={tournamentData}
      config={customConfig}
      colors={darkColorTheme}
      onCardClick={handleCardClick}
      onCardHover={handleCardHover}
      enableZoom={true}
      enablePanning={true}
      enablePathHighlight={true}
      showZoomControls={true}
      width={1200}
      height={800}
    />
  );
}
```

### Custom Styling

```tsx
const customColors = {
  background: "#ffffff",
  border: "#e2e8f0",
  text: "#1a202c",
  highlight: "#3182ce",
  winner: "#48bb78",
  loser: "#f56565",
};

<TourneyTree data={tournamentData} colors={customColors} />;
```

### Using Individual Components

```tsx
import {
  TournamentCard,
  ZoomControls,
  useStageZoom,
} from "@osh2002/tourneytree";

function CustomImplementation() {
  const { stageScale, zoomIn, zoomOut, resetZoom } = useStageZoom();

  return (
    <div>
      {/* Custom zoom controls */}
      <ZoomControls
        stageScale={stageScale}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetZoom={resetZoom}
      />

      {/* Individual tournament card */}
      <Stage>
        <Layer>
          <TournamentCard
            x={100}
            y={100}
            match={{ seed: "1 vs 2", player1: "Alice", player2: "Bob" }}
            colors={defaultColorTheme}
          />
        </Layer>
      </Stage>
    </div>
  );
}
```

## API Reference

### TourneyTree Props

| Prop                  | Type                    | Default               | Description               |
| --------------------- | ----------------------- | --------------------- | ------------------------- |
| `data`                | `TournamentData`        | **Required**          | Tournament data structure |
| `config`              | `Partial<LayoutConfig>` | `defaultLayoutConfig` | Layout configuration      |
| `colors`              | `Partial<ColorTheme>`   | `defaultColorTheme`   | Color theme               |
| `enableZoom`          | `boolean`               | `true`                | Enable zoom functionality |
| `enablePanning`       | `boolean`               | `true`                | Enable pan functionality  |
| `enablePathHighlight` | `boolean`               | `true`                | Enable path highlighting  |
| `showZoomControls`    | `boolean`               | `true`                | Show zoom control buttons |
| `onCardClick`         | `function`              | `undefined`           | Card click handler        |
| `onCardHover`         | `function`              | `undefined`           | Card hover handler        |
| `width`               | `number`                | `undefined`           | Fixed width               |
| `height`              | `number`                | `undefined`           | Fixed height              |
| `className`           | `string`                | `''`                  | CSS class name            |
| `style`               | `CSSProperties`         | `{}`                  | Inline styles             |

### Data Format

```typescript
interface Match {
  seed: string;
  player1: string;
  player2: string;
}

interface TournamentData {
  [roundKey: string]: Match[];
}
```

### Layout Configuration

```typescript
interface LayoutConfig {
  cardWidth: number; // Default: 300
  cardHeight: number; // Default: 100
  roundSpacing: number; // Default: 400
  matchSpacing: number; // Default: 160
  startX: number; // Default: 40
  startY: number; // Default: 40
}
```

### Color Theme

```typescript
interface ColorTheme {
  background: string; // Card background
  border: string; // Card border
  text: string; // Text color
  highlight: string; // Highlight color
  winner?: string; // Winner highlight
  loser?: string; // Loser highlight
}
```

## Built-in Themes

```tsx
import { themes, darkColorTheme, defaultColorTheme } from '@osh2002/tourneytree';

// Use built-in themes
<TourneyTree data={data} colors={themes.dark} />
<TourneyTree data={data} colors={darkColorTheme} />
<TourneyTree data={data} colors={defaultColorTheme} />
```

## Next.js Usage

The package works seamlessly with Next.js:

```tsx
"use client"; // Add this for client components

import { TourneyTree } from "@osh2002/tourneytree";

export default function TournamentPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <TourneyTree data={tournamentData} />
    </div>
  );
}
```

## TypeScript Support

The package is written in TypeScript and includes full type definitions. All types are exported for your use:

```tsx
import type {
  TourneyTreeProps,
  Match,
  TournamentData,
  LayoutConfig,
  ColorTheme,
} from "@osh2002/tourneytree";
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
