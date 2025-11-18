import React from 'react';
import { TourneyTree, defaultColorTheme } from '../src/index';

const sampleTournamentData = {
  "Round-01": [
    { seed: "1 vs 2", player1: "Kasun Perera", player2: "Oshan Avishka" },
    { seed: "3 vs 4", player1: "Jane Smith", player2: "Alex Johnson" },
    { seed: "5 vs 6", player1: "John Doe", player2: "Jane Doe" },
    { seed: "7 vs 8", player1: "Bob Smith", player2: "Alice Brown" },
  ],
  "Round-02": [
    { seed: "1 vs 4", player1: "Kasun Perera", player2: "Alex Johnson" },
    { seed: "5 vs 7", player1: "John Doe", player2: "Bob Smith" },
  ],
  "Round-03": [
    { seed: "1 vs 7", player1: "Kasun Perera", player2: "Bob Smith" },
  ],
};

export const ExampleUsage: React.FC = () => {
  const handleCardClick = (match: any, roundIndex: number, matchIndex: number) => {
    console.log('Card clicked:', { match, roundIndex, matchIndex });
    alert(`Clicked: ${match.player1} vs ${match.player2}`);
  };

  const handleCardHover = (match: any, roundIndex?: number, matchIndex?: number) => {
    if (match) {
      console.log('Hovering over:', match);
    }
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      padding: '20px', 
      boxSizing: 'border-box' 
    }}>
      <h1>Tournament Bracket Example</h1>
      <div style={{ 
        width: '100%', 
        height: 'calc(100vh - 100px)', 
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <TourneyTree
          data={sampleTournamentData}
          colors={defaultColorTheme}
          enableZoom={true}
          enablePanning={true}
          enablePathHighlight={true}
          showZoomControls={true}
          onCardClick={handleCardClick}
          onCardHover={handleCardHover}
        />
      </div>
    </div>
  );
};

export default ExampleUsage;