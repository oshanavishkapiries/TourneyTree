import { CSSProperties } from 'react';

// Core data types
export interface Match {
  seed: string;
  player1: string;
  player2: string;
}

export interface TournamentData {
  [roundKey: string]: Match[];
}

// Layout configuration
export interface LayoutConfig {
  cardWidth: number;
  cardHeight: number;
  roundSpacing: number;
  matchSpacing: number;
  startX: number;
  startY: number;
}

// Color theming
export interface ColorTheme {
  background: string;
  border: string;
  text: string;
  highlight: string;
  winner?: string;
  loser?: string;
}

// Component props
export interface TourneyTreeProps {
  data: TournamentData;
  config?: Partial<LayoutConfig>;
  colors?: Partial<ColorTheme>;
  enableZoom?: boolean;
  enablePanning?: boolean;
  enablePathHighlight?: boolean;
  showZoomControls?: boolean;
  onCardClick?: (match: Match, roundIndex: number, matchIndex: number) => void;
  onCardHover?: (match: Match | null, roundIndex?: number, matchIndex?: number) => void;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

// Internal types
export interface CardPosition {
  x: number;
  y: number;
  match: Match;
  roundIndex: number;
  matchIndex: number;
}

export interface StagePosition {
  x: number;
  y: number;
}

export interface StageSize {
  width: number;
  height: number;
}

export interface PathHighlight {
  cardIndices: number[];
  lineIndices: number[];
}