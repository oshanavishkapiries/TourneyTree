import { Stage, Layer, Line } from "react-konva";
import { useKonvaColors } from "./hooks/useKonvaColors";
import { KonvaCard } from "./components/KonvaCard";

const App = () => {
  const colors = useKonvaColors();

  const Tournament_Details: any = {
    "Round-01": [
      { seed: "1 vs 2", player1: "Kasun Perera", player2: "Oshan Avishka" },
      { seed: "3 vs 4", player1: "Jane Smith", player2: "Alex Johnson" },
      { seed: "5 vs 6", player1: "John Doe", player2: "Jane Doe" },
      { seed: "7 vs 8", player1: "John Doe peta", player2: "Jane Doe" },
      { seed: "1 vs 2", player1: "Kasun Perera", player2: "Oshan Avishka" },
      { seed: "3 vs 4", player1: "Jane Smith", player2: "Alex Johnson" },
      { seed: "5 vs 6", player1: "John Doe", player2: "Jane Doe" },
      { seed: "7 vs 8", player1: "John Doe peta", player2: "Jane Doe" },
    ],
    "Round-02": [
      { seed: "1 vs 4", player1: "Kasun Perera", player2: "Alex Johnson" },
      { seed: "5 vs 7", player1: "John Doe", player2: "John Doe peta" },
      { seed: "1 vs 4", player1: "Kasun Perera", player2: "Alex Johnson" },
      { seed: "5 vs 7", player1: "John Doe", player2: "John Doe peta" },
    ],
    "Round-03": [
      { seed: "1 vs 7", player1: "Kasun Perera", player2: "John Doe" },
      { seed: "1 vs 7", player1: "Kasun Perera", player2: "John Doe" },
    ],
    "Round-04": [
      { seed: "1 vs 7", player1: "Kasun Perera", player2: "John Doe" },
    ],
  };

  const cardWidth = 300;
  const cardHeight = 100;
  const roundSpacing = 400;
  const matchSpacing = 160;
  const startX = 40;
  const startY = 40;

  const calculateTreePositions = () => {
    const rounds = Object.keys(Tournament_Details);
    const positions: any[] = [];
    const roundY: number[][] = [];

    rounds.forEach((roundKey, r) => {
      const matches = Tournament_Details[roundKey];
      const x = startX + r * roundSpacing;
      roundY[r] = [];

      matches.forEach((match: number, i: number) => {
        let y;

        if (r === 0) {
          y = startY + i * matchSpacing;
        } else {
          const y1 = roundY[r - 1][i * 2];
          const y2 = roundY[r - 1][i * 2 + 1];
          if (y1 === undefined || y2 === undefined) {
            y = startY + i * matchSpacing * 2;
          } else {
            y = (y1 + y2) / 2;
          }
        }

        roundY[r][i] = y;

        positions.push({
          x,
          y,
          roundIndex: r,
          matchIndex: i,
          match,
        });
      });
    });

    return positions;
  };

  const calculateConnectingLines = (positions: any[]) => {
    const groups: any = {};
    positions.forEach((p) => {
      if (!groups[p.roundIndex]) groups[p.roundIndex] = [];
      groups[p.roundIndex].push(p);
    });

    const totalRounds = Object.keys(groups).length;
    const lines: number[][] = [];

    for (let r = 0; r < totalRounds - 1; r++) {
      const curr = groups[r];
      const next = groups[r + 1];

      next.forEach((n: any, i: number) => {
        const c1 = curr[i * 2];
        const c2 = curr[i * 2 + 1];
        if (!c1 || !c2) return;

        const x1 = c1.x + cardWidth;
        const x2 = c2.x + cardWidth;
        const xMid = x1 + (n.x - x1) / 2;

        const y1 = c1.y + cardHeight / 2;
        const y2 = c2.y + cardHeight / 2;
        const yNext = n.y + cardHeight / 2;

        lines.push([x1, y1, xMid, y1, xMid, yNext, n.x, yNext]);

        lines.push([x2, y2, xMid, y2, xMid, yNext]);
      });
    }

    return lines;
  };

  const tree = calculateTreePositions();
  const lines = calculateConnectingLines(tree);

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
