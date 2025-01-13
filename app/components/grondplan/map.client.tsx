import Konva from "konva";
import { useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";

interface GridLayerProps {
  width: number;
  height: number;
  cellSize: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

const GridLayer = ({
  width,
  height,
  cellSize,
  scale,
  offsetX,
  offsetY,
}: GridLayerProps) => {
  const verticalLines = [];
  const horizontalLines = [];

  // Calculate visible grid lines based on current scale and offset
  const adjustedCellSize = cellSize * scale;

  const startX = Math.floor(offsetX / adjustedCellSize) * adjustedCellSize;
  const startY = Math.floor(offsetY / adjustedCellSize) * adjustedCellSize;

  // Generate vertical lines
  for (let x = startX; x < offsetX + width / scale; x += adjustedCellSize) {
    verticalLines.push(
      <Line
        key={`v-line-${x}`}
        points={[x, offsetY, x, offsetY + height / scale]}
        stroke="#ddd"
        strokeWidth={1 / scale}
      />,
    );
  }

  // Generate horizontal lines
  for (let y = startY; y < offsetY + height / scale; y += adjustedCellSize) {
    horizontalLines.push(
      <Line
        key={`h-line-${y}`}
        points={[offsetX, y, offsetX + width / scale, y]}
        stroke="#ddd"
        strokeWidth={1 / scale}
      />,
    );
  }

  return (
    <Layer>
      {verticalLines}
      {horizontalLines}
    </Layer>
  );
};

export const Map = () => {
  const [stageState, setStageState] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  const stageRef = useRef<Konva.Stage>(null);

  const handleWheel = (e: {
    evt: { preventDefault: () => void; deltaY: number };
  }) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const scaleBy = 1.1; // Zoom sensitivity
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    // Restrict zoom levels
    const minScale = 0.3;
    const maxScale = 10;
    if (newScale < minScale || newScale > maxScale) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newX = pointer.x - mousePointTo.x * newScale;
    const newY = pointer.y - mousePointTo.y * newScale;

    setStageState({
      scale: newScale,
      x: newX,
      y: newY,
    });
  };

  const handleDragMove = (e: {
    target: { x: () => number; y: () => number };
  }) => {
    setStageState({
      ...stageState,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
      onWheel={handleWheel}
      onDragMove={handleDragMove}
      ref={stageRef}
      scaleX={stageState.scale}
      scaleY={stageState.scale}
      x={stageState.x}
      y={stageState.y}
    >
      <GridLayer
        width={window.innerWidth}
        height={window.innerHeight}
        cellSize={50}
        scale={stageState.scale}
        offsetX={-stageState.x / stageState.scale}
        offsetY={-stageState.y / stageState.scale}
      />
    </Stage>
  );
};
