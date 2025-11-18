import { useCallback } from 'react';
import { StagePosition } from '../types';

interface UseStageControlsReturn {
  handleDragStart: (e: any) => void;
  handleDragEnd: (e: any) => void;
  handleTouchMove: (e: any) => void;
}

export const useStageControls = (
  setStagePosition: (pos: StagePosition) => void
): UseStageControlsReturn => {
  const handleDragStart = useCallback(() => {
    // Stage drag started
  }, []);

  const handleDragEnd = useCallback((e: any) => {
    const stage = e.target;
    setStagePosition({
      x: stage.x(),
      y: stage.y(),
    });
  }, [setStagePosition]);

  const handleTouchMove = useCallback((e: any) => {
    e.evt.preventDefault();
  }, []);

  return {
    handleDragStart,
    handleDragEnd,
    handleTouchMove,
  };
};