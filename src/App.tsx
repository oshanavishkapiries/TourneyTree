import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import { useKonvaColors } from "./hooks/useKonvaColors";
import { KonvaCard } from "./components/KonvaCard";
import { sampleTournamentData } from "./utils/tournamentData";
import {
  defaultLayoutConfig,
  calculateTreePositions,
  calculateConnectingLines,
} from "./utils/tournamentLayout";

const App = () => {
  const colors = useKonvaColors();
  const containerRef = useRef<HTMLDivElement>(null);

  // Stage dimensions
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });

  // Zoom and pan state
  const [stageScale, setStageScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });

  // Update stage size when container resizes
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Zoom functionality
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

  // Drag functionality for desktop and mobile
  const handleDragStart = (e: any) => {
    e.target.getStage().container().style.cursor = "grabbing";
  };

  const handleDragEnd = (e: any) => {
    e.target.getStage().container().style.cursor = "grab";
    setStagePosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  // Touch drag for mobile
  const handleTouchMove = (e: any) => {
    e.evt.preventDefault();
  };

  const tree = calculateTreePositions(
    sampleTournamentData,
    defaultLayoutConfig
  );
  const lines = calculateConnectingLines(tree, defaultLayoutConfig);

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
            <KonvaCard key={i} x={p.x} y={p.y} colors={colors} {...p.match} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
