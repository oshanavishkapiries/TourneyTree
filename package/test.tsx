import React from 'react';
import { TourneyTree, defaultColorTheme, type TournamentData } from './src/index';

// Test data
const testTournamentData: TournamentData = {
  "Round-01": [
    { seed: "1 vs 2", player1: "Alice", player2: "Bob" },
    { seed: "3 vs 4", player1: "Charlie", player2: "David" },
  ],
  "Round-02": [
    { seed: "1 vs 3", player1: "Alice", player2: "Charlie" },
  ],
};

// Test component
export const TestComponent: React.FC = () => {
  return React.createElement(
    'div',
    { style: { width: '800px', height: '600px' } },
    React.createElement(TourneyTree, {
      data: testTournamentData,
      colors: defaultColorTheme,
      enableZoom: true,
      enablePanning: true,
      onCardClick: (match, roundIndex, matchIndex) => {
        console.log('Card clicked:', { match, roundIndex, matchIndex });
      }
    })
  );
};

export default TestComponent;