"use client";
import { useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
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

  // Path highlighting handlers
  const handleCardMouseEnter = (cardIndex: number) => {
    highlightPath(cardIndex, tree);
  };

  const handleCardMouseLeave = () => {
    clearHighlight();
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

          {tree.map((p, i) => (
            <KonvaCard
              key={i}
              x={p.x}
              y={p.y}
              colors={colors}
              {...p.match}
              cardIndex={i}
              isHighlighted={highlightedPath?.cardIndices.includes(i) || false}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
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
