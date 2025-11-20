"use client";
import { useRef, useEffect } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { useKonvaColors } from "./hooks/useKonvaColors";
import { useStageSize } from "./hooks/useStageSize";
import { useStageZoom } from "./hooks/useStageZoom";
import { useStageControls } from "./hooks/useStageControls";
import { usePathHighlighting } from "./utils/pathHighlighting";
import { KonvaCard } from "./components/KonvaCard";
import { ZoomControls } from "./components/ZoomControls";
import { sampleTournamentData } from "./utils/tournamentData";
import {
  defaultLayoutConfig,
  calculateTreePositions,
  calculateConnectingLines,
} from "./utils/tournamentLayout";

const App = () => {
  const colors = useKonvaColors();
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom hooks for stage management
  const stageSize = useStageSize(containerRef);
  const {
    stageScale,
    stagePosition,
    setStagePosition,
    handleWheel,
    zoomIn,
    zoomOut,
    resetZoom,
    fitToScreen,
  } = useStageZoom();
  const { handleDragStart, handleDragEnd, handleTouchMove } =
    useStageControls(setStagePosition);
  const { highlightedPath, highlightPath, clearHighlight } =
    usePathHighlighting();

  // Calculate tournament layout
  const tree = calculateTreePositions(
    sampleTournamentData,
    defaultLayoutConfig
  );
  const lines = calculateConnectingLines(tree, defaultLayoutConfig);

  // Auto-fit on mount
  useEffect(() => {
    if (tree.length > 0 && stageSize.width > 0 && stageSize.height > 0) {
      // Calculate tree dimensions
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

      tree.forEach(node => {
        minX = Math.min(minX, node.x);
        maxX = Math.max(maxX, node.x + defaultLayoutConfig.cardWidth);
        minY = Math.min(minY, node.y);
        maxY = Math.max(maxY, node.y + defaultLayoutConfig.cardHeight);
      });

      const treeWidth = maxX - minX;
      const treeHeight = maxY - minY;

      fitToScreen(
        stageSize.width,
        stageSize.height,
        treeWidth,
        treeHeight,
        50 // padding
      );
    }
  }, [stageSize.width, stageSize.height, tree.length]); // Dependencies for auto-fit

  // Path highlighting handlers
  const handleCardMouseEnter = (cardIndex: number) => {
    highlightPath(cardIndex, tree);
  };

  const handleCardMouseLeave = () => {
    clearHighlight();
  };

  const handleViewClick = (matchData: {
    seed: string;
    player1: string;
    player2: string;
  }) => {
    console.log("Tournament Match Data:", matchData);
  };

  return (
    <div
      ref={containerRef}
      className="main-box"
      style={{
        width: "90vw",
        height: "90vh",
        overflow: "hidden",
        cursor: "grab",
      }}
    >
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stagePosition.x}
        y={stagePosition.y}
        onWheel={handleWheel}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTouchMove={handleTouchMove}
        draggable
      >
        <Layer>
          {lines.map((pts, i) => (
            <Line key={i} points={pts} stroke={colors.border} strokeWidth={3} />
          ))}

          {/* Round Headers */}
          {Object.keys(sampleTournamentData).map((roundKey, i) => (
            <Text
              key={roundKey}
              x={defaultLayoutConfig.startX + i * defaultLayoutConfig.roundSpacing}
              y={defaultLayoutConfig.startY - 50}
              text={roundKey}
              fontSize={20}
              fontFamily="Arial, sans-serif"
              fontStyle="bold"
              fill={colors.foreground}
              width={defaultLayoutConfig.cardWidth}
              align="center"
            />
          ))}

          {tree.map((p, i) => (
            <KonvaCard
              key={i}
              x={p.x}
              y={p.y}
              colors={colors}
              {...p.match}
              matchNumber={i + 1}
              cardIndex={i}
              isHighlighted={highlightedPath?.cardIndices.includes(i) || false}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              onViewClick={handleViewClick}
            />
          ))}
        </Layer>
      </Stage>

      <ZoomControls
        stageScale={stageScale}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetZoom={resetZoom}
      />
    </div>
  );
};

export default App;
