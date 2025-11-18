import { useState, useEffect, RefObject } from 'react';
import { StageSize } from '../types';

export const useStageSize = (
  containerRef: RefObject<HTMLElement>,
  width?: number,
  height?: number
): StageSize => {
  const [stageSize, setStageSize] = useState<StageSize>({
    width: width || 800,
    height: height || 600,
  });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setStageSize({
          width: width || rect.width,
          height: height || rect.height,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [containerRef, width, height]);

  return stageSize;
};