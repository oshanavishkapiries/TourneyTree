# 🏆 TourneyTree

**An interactive tournament bracket visualization built with React, Konva, and TypeScript**

![TourneyTree Banner](https://via.placeholder.com/800x200/2563eb/ffffff?text=TourneyTree+-+Interactive+Tournament+Brackets)

## ✨ Features

### 🎯 **Interactive Tournament Visualization**
- **Card-based Layout**: Clean, modern tournament card design
- **Path Highlighting**: Hover over any card to see the complete path to the championship
- **Visual Feedback**: Glowing borders and shadows for highlighted cards

### 🔍 **Advanced Navigation**
- **Zoom Controls**: Zoom in/out with mouse wheel or control buttons
- **Zoom Indicator**: Real-time zoom percentage display with reset functionality
- **Drag & Pan**: Smooth dragging to navigate large tournament trees
- **Mobile Support**: Touch-friendly interactions for mobile devices

### 🎨 **Modern Design**
- **Responsive Layout**: Automatically adapts to container size
- **Dark/Light Theme**: CSS custom properties for easy theming
- **Smooth Animations**: Fluid hover effects and transitions
- **Professional UI**: Clean, tournament-style card design

### ⚡ **Performance & Architecture**
- **Custom Hooks**: Modular React hooks for state management
- **TypeScript**: Full type safety throughout the application
- **Optimized Rendering**: Efficient canvas rendering with React Konva
- **Separated Concerns**: Clean separation between data, layout, and UI logic

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tournamentree.git
cd tournamentree

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── KonvaCard.tsx   # Tournament card component
│   └── ZoomControls.tsx # Zoom control UI
├── hooks/              # Custom React hooks
│   ├── useKonvaColors.ts    # Color theme management
│   ├── useStageControls.ts  # Drag/pan functionality
│   ├── useStageSize.ts      # Stage sizing logic
│   └── useStageZoom.ts      # Zoom functionality
├── utils/              # Utility functions
│   ├── pathHighlighting.ts  # Card highlighting logic
│   ├── tournamentData.ts    # Sample tournament data
│   └── tournamentLayout.ts  # Layout calculation
├── App.tsx             # Main application component
├── index.css           # Global styles and themes
└── main.tsx           # Application entry point
```

## 🎮 Usage

### Basic Tournament Display

```typescript
import { TournamentData } from './utils/tournamentLayout';

const myTournament: TournamentData = {
  "Round-01": [
    { seed: "1 vs 2", player1: "Player A", player2: "Player B" },
    { seed: "3 vs 4", player1: "Player C", player2: "Player D" }
  ],
  "Round-02": [
    { seed: "1 vs 3", player1: "Player A", player2: "Player C" }
  ]
};
```

### Custom Layout Configuration

```typescript
import { LayoutConfig } from './utils/tournamentLayout';

const customLayout: LayoutConfig = {
  cardWidth: 350,
  cardHeight: 120,
  roundSpacing: 450,
  matchSpacing: 180,
  startX: 50,
  startY: 50
};
```

### Customizing Themes

Update CSS custom properties in `src/index.css`:

```css
:root {
  --primary: 225 50% 30%;           /* Primary color */
  --card: 0 0% 100%;                /* Card background */
  --border: 217 50% 80%;            /* Border color */
  --background: 0 0% 100%;          /* App background */
}
```

## 🎛️ Controls

| Action | Desktop | Mobile |
|--------|---------|---------|
| **Zoom In** | Mouse wheel up / `+` button | Pinch out / `+` button |
| **Zoom Out** | Mouse wheel down / `-` button | Pinch in / `-` button |
| **Reset Zoom** | Click zoom percentage | Click zoom percentage |
| **Pan/Drag** | Click and drag | Touch and drag |
| **Card Highlight** | Hover over card | Tap card |

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Features

The project is designed with modularity in mind:

1. **New Tournament Data**: Update `src/utils/tournamentData.ts`
2. **Layout Changes**: Modify `src/utils/tournamentLayout.ts` 
3. **UI Components**: Add to `src/components/`
4. **State Logic**: Create custom hooks in `src/hooks/`

### TypeScript Integration

All components and utilities are fully typed:

```typescript
interface Match {
  seed: string;
  player1: string;
  player2: string;
}

interface CardPosition {
  x: number;
  y: number;
  match: Match;
  roundIndex: number;
  matchIndex: number;
}
```

## 🎯 Key Features Breakdown

### Path Highlighting System
- **Smart Detection**: Automatically calculates tournament progression paths
- **Visual Clarity**: Highlights complete path from any card to championship
- **Performance**: Efficient calculation using round/match relationships

### Zoom & Navigation
- **Smooth Zoom**: Mouse wheel and button controls with limits (10% - 500%)
- **Smart Centering**: Zoom centers around mouse position
- **Reset Function**: One-click return to default view
- **Mobile Optimized**: Touch gestures for mobile devices

### Modular Architecture
- **Separation of Concerns**: Data, layout, and UI are clearly separated
- **Reusable Hooks**: State management through custom React hooks  
- **Type Safety**: Full TypeScript integration for reliable development
- **Easy Customization**: Configurable layouts, themes, and data structures

## 🌟 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+ 
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`) 
5. Open a Pull Request

## 📊 Technology Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **React Konva** - 2D Canvas Rendering
- **CSS Custom Properties** - Theming System
- **ESLint** - Code Quality

---

<div align="center">

**Built with ❤️ for tournament organizers and sports enthusiasts**

[Demo](https://your-demo-link.com) • [Documentation](https://your-docs-link.com) • [Issues](https://github.com/yourusername/tournamentree/issues)

</div>