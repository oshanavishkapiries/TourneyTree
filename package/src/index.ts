// Main component
export { TourneyTree } from './components/TourneyTree';

// Sub components (for advanced usage)
export { TournamentCard } from './components/TournamentCard';
export { ZoomControls } from './components/ZoomControls';

// Hooks (for custom implementations)
export { useStageZoom } from './hooks/useStageZoom';
export { useStageSize } from './hooks/useStageSize';
export { useStageControls } from './hooks/useStageControls';
export { usePathHighlighting } from './hooks/usePathHighlighting';

// Utilities
export { 
  calculateTreePositions, 
  calculateConnectingLines, 
  mergeLayoutConfig 
} from './utils/layout';

// Types
export type {
  TourneyTreeProps,
  Match,
  TournamentData,
  LayoutConfig,
  ColorTheme,
  CardPosition,
  StagePosition,
  StageSize,
  PathHighlight,
} from './types';

// Configurations and themes
export {
  defaultLayoutConfig,
  defaultColorTheme,
  darkColorTheme,
  themes,
} from './config';

export type { ThemeName } from './config';

// Default export
export { TourneyTree as default } from './components/TourneyTree';