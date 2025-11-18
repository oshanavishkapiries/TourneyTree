import { LayoutConfig, ColorTheme } from './types';

export const defaultLayoutConfig: LayoutConfig = {
  cardWidth: 300,
  cardHeight: 100,
  roundSpacing: 400,
  matchSpacing: 160,
  startX: 40,
  startY: 40,
};

export const defaultColorTheme: ColorTheme = {
  background: '#ffffff',
  border: '#e2e8f0',
  text: '#1a202c',
  highlight: '#3182ce',
  winner: '#48bb78',
  loser: '#f56565',
};

export const darkColorTheme: ColorTheme = {
  background: '#2d3748',
  border: '#4a5568',
  text: '#f7fafc',
  highlight: '#63b3ed',
  winner: '#68d391',
  loser: '#fc8181',
};

export const themes = {
  light: defaultColorTheme,
  dark: darkColorTheme,
} as const;

export type ThemeName = keyof typeof themes;