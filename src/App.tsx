import './App.css';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants/game';
import { useCanvas } from './cors/main';

function App() {
  useCanvas();
  return (
    <canvas
      id='game-canvas'
      height={CANVAS_HEIGHT}
      width={CANVAS_WIDTH}
    ></canvas>
  );
}

export default App;
