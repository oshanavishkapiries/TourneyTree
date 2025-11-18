import { Stage, Layer, Arc } from "react-konva";

const App = () => {
  return (
    <div className="main-box">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Arc
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            innerRadius={40}
            outerRadius={70}
            angle={60}
            fill="yellow"
            stroke="black"
            strokeWidth={4}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
