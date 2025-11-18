import { useState, useCallback } from 'react';
import { StagePosition } from '../types';

interface UseStageZoomReturn {
  stageScale: number;
  stagePosition: StagePosition;
  setStagePosition: (pos: StagePosition) => void;
  handleWheel: (e: any) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

export const useStageZoom = (
  initialScale = 1,
  minScale = 0.1,
  maxScale = 3,
  zoomStep = 0.1
): UseStageZoomReturn => {
  const [stageScale, setStageScale] = useState(initialScale);
  const [stagePosition, setStagePosition] = useState<StagePosition>({ x: 0, y: 0 });

  const handleWheel = useCallback((e: any) => {
    e.evt.preventDefault();
    
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale = Math.max(
      minScale,
      Math.min(maxScale, oldScale + direction * zoomStep)
    );

    setStageScale(newScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    setStagePosition(newPos);
  }, [minScale, maxScale, zoomStep]);

  const zoomIn = useCallback(() => {
    setStageScale(prev => Math.min(maxScale, prev + zoomStep));
  }, [maxScale, zoomStep]);

  const zoomOut = useCallback(() => {
    setStageScale(prev => Math.max(minScale, prev - zoomStep));
  }, [minScale, zoomStep]);

  const resetZoom = useCallback(() => {
    setStageScale(initialScale);
    setStagePosition({ x: 0, y: 0 });
  }, [initialScale]);

  return {
    stageScale,
    stagePosition,
    setStagePosition,
    handleWheel,
    zoomIn,
    zoomOut,
    resetZoom,
  };
};