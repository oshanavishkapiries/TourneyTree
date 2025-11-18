import { useState } from 'react';

export const useStageZoom = () => {
  const [stageScale, setStageScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.1;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    let newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    // Limit zoom levels
    newScale = Math.max(0.1, Math.min(newScale, 5));

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    setStageScale(newScale);
    setStagePosition(newPos);
  };

  // Programmatic zoom functions
  const zoomIn = () => {
    const newScale = Math.min(stageScale * 1.2, 5);
    setStageScale(newScale);
  };

  const zoomOut = () => {
    const newScale = Math.max(stageScale / 1.2, 0.1);
    setStageScale(newScale);
  };

  const resetZoom = () => {
    setStageScale(1);
    setStagePosition({ x: 0, y: 0 });
  };

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