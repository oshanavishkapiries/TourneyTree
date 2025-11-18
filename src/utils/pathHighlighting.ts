import { useState } from "react";
import type { CardPosition } from "./tournamentLayout";

export interface PathHighlight {
  cardIndices: number[];
  lineIndices: number[];
}

/**
 * Calculates which cards and lines should be highlighted for a given tournament path
 * @param cardIndex - Index of the hovered card
 * @param positions - Array of all card positions
 * @returns Object containing indices of cards and lines to highlight
 */
export const calculateHighlightPath = (
  cardIndex: number,
  positions: CardPosition[]
): PathHighlight => {
  const hoveredCard = positions[cardIndex];
  if (!hoveredCard) return { cardIndices: [], lineIndices: [] };

  const cardIndices: number[] = [cardIndex];
  const lineIndices: number[] = [];

  // Trace path forward to the final round
  let currentRound = hoveredCard.roundIndex;
  let currentMatchIndex = hoveredCard.matchIndex;
  const maxRound = Math.max(...positions.map((p) => p.roundIndex));

  while (currentRound < maxRound) {
    const nextRound = currentRound + 1;
    const nextMatchIndex = Math.floor(currentMatchIndex / 2);

    // Find the card in the next round
    const nextCardIndex = positions.findIndex(
      (p) => p.roundIndex === nextRound && p.matchIndex === nextMatchIndex
    );

    if (nextCardIndex !== -1) {
      cardIndices.push(nextCardIndex);

      // Calculate line index for this connection
      // Lines are created in order: for each match in next round, 2 lines are added
      // Line structure: [line from match 2i, line from match 2i+1] for each next round match

      // Count total lines created before this round's connections
      let lineIndexOffset = 0;
      for (let r = 0; r < currentRound; r++) {
        const nextRoundMatchCount = positions.filter(
          (p) => p.roundIndex === r + 1
        ).length;
        // Each match in the next round gets 2 incoming lines
        lineIndexOffset += nextRoundMatchCount * 2;
      }

      // Within current round's connections:
      // nextMatchIndex tells us which "pair" of lines we're looking at
      // currentMatchIndex % 2 tells us if we're the first (0) or second (1) line of that pair
      const lineIndex =
        lineIndexOffset + nextMatchIndex * 2 + (currentMatchIndex % 2);

      lineIndices.push(lineIndex);
    }

    currentRound = nextRound;
    currentMatchIndex = nextMatchIndex;
  }

  return { cardIndices, lineIndices };
};

/**
 * Hook for managing path highlighting state
 */
export const usePathHighlighting = () => {
  const [highlightedPath, setHighlightedPath] = useState<PathHighlight | null>(
    null
  );

  const highlightPath = (cardIndex: number, positions: CardPosition[]) => {
    const path = calculateHighlightPath(cardIndex, positions);
    setHighlightedPath(path);
  };

  const clearHighlight = () => {
    setHighlightedPath(null);
  };

  return {
    highlightedPath,
    highlightPath,
    clearHighlight,
  };
};
