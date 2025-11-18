import { Stage, Layer, Line } from "react-konva";
import { useKonvaColors } from "./hooks/useKonvaColors";
import { KonvaCard } from "./components/KonvaCard";
import { sampleTournamentData } from "./utils/tournamentData";
import { 
  defaultLayoutConfig, 
  calculateTreePositions, 
  calculateConnectingLines 
} from "./utils/tournamentLayout";

const App = () => {
  const colors = useKonvaColors();

  const tree = calculateTreePositions(sampleTournamentData, defaultLayoutConfig);
  const lines = calculateConnectingLines(tree, defaultLayoutConfig);

  return (
    <div className="main-box">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {lines.map((pts, i) => (
            <Line key={i} points={pts} stroke={colors.border} strokeWidth={2} />
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
