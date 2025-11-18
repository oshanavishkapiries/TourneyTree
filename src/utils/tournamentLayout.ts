export interface Match {
  seed: string;
  player1: string;
  player2: string;
}

export interface TournamentData {
  [roundKey: string]: Match[];
}

export interface CardPosition {
  x: number;
  y: number;
  match: Match;
  roundIndex: number;
  matchIndex: number;
}

export interface LayoutConfig {
  cardWidth: number;
  cardHeight: number;
  roundSpacing: number;
  cardSpacing: number;
  startX: number;
  startY: number;
}

/**
 * Calculates positions for all tournament cards in a tree structure
 * @param tournamentData - The tournament data object
 * @param config - Layout configuration
 * @returns Array of card positions
 */
export const calculateTreePositions = (
  tournamentData: TournamentData,
  config: LayoutConfig
): CardPosition[] => {
  const rounds = Object.keys(tournamentData);
  const positions: CardPosition[] = [];

  rounds.forEach((roundKey, roundIndex) => {
    const matches = tournamentData[roundKey];
    const roundX = config.startX + (roundIndex * config.roundSpacing);
    
    // Calculate starting Y position with offset for each round
    const baseY = config.startY + (roundIndex * 100);
    
    matches.forEach((match, matchIndex) => {
      let cardY;
      
      if (roundIndex === 0) {
        // First round: evenly spaced
        cardY = baseY + (matchIndex * config.cardSpacing);
      } else {
        // Subsequent rounds: position between previous round matches
        const spacing = Math.pow(2, roundIndex) * config.cardSpacing;
        cardY = baseY + (matchIndex * spacing) + (spacing / 2);
      }

      positions.push({
        x: roundX,
        y: cardY,
        match,
        roundIndex,
        matchIndex
      });
    });
  });

  return positions;
};