import React, { useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { TourneyTreeProps } from '../types';
import { defaultLayoutConfig, defaultColorTheme } from '../config';
import { calculateTreePositions, calculateConnectingLines, mergeLayoutConfig } from '../utils/layout';
import { useStageSize } from '../hooks/useStageSize';
import { useStageZoom } from '../hooks/useStageZoom';
import { useStageControls } from '../hooks/useStageControls';
import { usePathHighlighting } from '../hooks/usePathHighlighting';
import { TournamentCard } from './TournamentCard';
import { ZoomControls } from './ZoomControls';

export const TourneyTree: React.FC<TourneyTreeProps> = ({
  data,
  config: partialConfig,
  colors: partialColors,
  enableZoom = true,
  enablePanning = true,
  enablePathHighlight = true,
  showZoomControls = true,
  onCardClick,
  onCardHover,
  width,
  height,
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Merge configurations with defaults
  const config = mergeLayoutConfig(partialConfig, defaultLayoutConfig);
  const colors = { ...defaultColorTheme, ...partialColors };

  // Custom hooks for stage management
  const stageSize = useStageSize(containerRef, width, height);
  const {
    stageScale,
    stagePosition,
    setStagePosition,
    handleWheel,
    zoomIn,
    zoomOut,
    resetZoom,
  } = useStageZoom();
  
  const { handleDragStart, handleDragEnd, handleTouchMove } =
    useStageControls(setStagePosition);
  
  const { highlightedPath, highlightPath, clearHighlight } =
    usePathHighlighting();

  // Calculate tournament layout
  const tree = calculateTreePositions(data, config);
  const lines = calculateConnectingLines(tree, config);

  // Event handlers
  const handleCardMouseEnter = (cardIndex: number) => {
    if (enablePathHighlight) {
      highlightPath(cardIndex, tree);
    }
    
    if (onCardHover) {
      const card = tree[cardIndex];
      if (card) {
        onCardHover(card.match, card.roundIndex, card.matchIndex);
      }
    }
  };

  const handleCardMouseLeave = () => {
    if (enablePathHighlight) {
      clearHighlight();
    }
    
    if (onCardHover) {
      onCardHover(null);
    }
  };

  const handleCardClick = (match: any, roundIndex: number, matchIndex: number) => {
    if (onCardClick) {
      onCardClick(match, roundIndex, matchIndex);
    }
  };

  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || '400px',
    overflow: 'hidden',
    cursor: enablePanning ? 'grab' : 'default',
    position: 'relative',
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyle}
    >
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stagePosition.x}
        y={stagePosition.y}
        onWheel={enableZoom ? handleWheel : undefined}
        onDragStart={enablePanning ? handleDragStart : undefined}
        onDragEnd={enablePanning ? handleDragEnd : undefined}
        onTouchMove={enablePanning ? handleTouchMove : undefined}
        draggable={enablePanning}
      >
        <Layer>
          {/* Connection Lines */}
          {lines.map((pts, i) => (
            <Line 
              key={i} 
              points={pts} 
              stroke={colors.border} 
              strokeWidth={2}
              opacity={
                highlightedPath?.lineIndices.includes(i) ? 1 : 
                highlightedPath ? 0.3 : 1
              }
            />
          ))}

          {/* Tournament Cards */}
          {tree.map((position, i) => (
            <TournamentCard
              key={i}
              x={position.x}
              y={position.y}
              match={position.match}
              colors={colors}
              width={config.cardWidth}
              height={config.cardHeight}
              cardIndex={i}
              roundIndex={position.roundIndex}
              matchIndex={position.matchIndex}
              isHighlighted={highlightedPath?.cardIndices.includes(i) || false}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              onClick={handleCardClick}
            />
          ))}
        </Layer>
      </Stage>

      {/* Zoom Controls */}
      {showZoomControls && enableZoom && (
        <ZoomControls
          stageScale={stageScale}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetZoom={resetZoom}
        />
      )}
    </div>
  );
};