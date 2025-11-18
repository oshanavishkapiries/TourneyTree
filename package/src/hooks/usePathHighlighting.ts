import { useState, useCallback } from 'react';
import { CardPosition, PathHighlight } from '../types';

interface UsePathHighlightingReturn {
  highlightedPath: PathHighlight | null;
  highlightPath: (cardIndex: number, tree: CardPosition[]) => void;
  clearHighlight: () => void;
}

export const usePathHighlighting = (): UsePathHighlightingReturn => {
  const [highlightedPath, setHighlightedPath] = useState<PathHighlight | null>(null);

  const highlightPath = useCallback((cardIndex: number, tree: CardPosition[]) => {
    const card = tree[cardIndex];
    if (!card) return;

    const cardIndices: number[] = [cardIndex];
    const lineIndices: number[] = [];

    // Find connected cards in previous rounds
    const findConnectedCards = (currentCard: CardPosition, currentIndex: number) => {
      if (currentCard.roundIndex === 0) return;

      const prevRoundCards = tree.filter(c => c.roundIndex === currentCard.roundIndex - 1);
      const expectedCards = [
        currentCard.matchIndex * 2,
        currentCard.matchIndex * 2 + 1
      ];

      expectedCards.forEach(expectedIndex => {
        const connectedCard = prevRoundCards[expectedIndex];
        if (connectedCard) {
          const connectedIndex = tree.findIndex(c => 
            c.roundIndex === connectedCard.roundIndex && 
            c.matchIndex === connectedCard.matchIndex
          );
          if (connectedIndex !== -1) {
            cardIndices.push(connectedIndex);
            findConnectedCards(connectedCard, connectedIndex);
          }
        }
      });
    };

    findConnectedCards(card, cardIndex);

    setHighlightedPath({
      cardIndices,
      lineIndices,
    });
  }, []);

  const clearHighlight = useCallback(() => {
    setHighlightedPath(null);
  }, []);

  return {
    highlightedPath,
    highlightPath,
    clearHighlight,
  };
};