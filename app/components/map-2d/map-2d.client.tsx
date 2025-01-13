import type { Layout } from "~/domain/layout";
import { Wall2D } from "./wall-2d";
import { useMemo, useState } from "react";
import { Stage, Layer, Line } from "react-konva";

const Grid2D = ({
  viewBox,
}: {
  viewBox: { x: number; y: number; width: number; height: number };
}) => {
  const gridSize = 50; // Grid cell size in centimeters
  const lines = [];

  // Vertical lines
  for (
    let x = Math.floor(viewBox.x);
    x <= viewBox.x + viewBox.width;
    x += gridSize
  ) {
    lines.push(
      <Line
        key={`v${x}`}
        points={[x, viewBox.y, x, viewBox.y + viewBox.height]}
        stroke="#ddd"
        strokeWidth={1}
      />,
    );
  }

  // Horizontal lines
  for (
    let y = Math.floor(viewBox.y);
    y <= viewBox.y + viewBox.height;
    y += gridSize
  ) {
    lines.push(
      <Line
        key={`h${y}`}
        points={[viewBox.x, y, viewBox.x + viewBox.width, y]}
        stroke="#ddd"
        strokeWidth={1}
      />,
    );
  }

  return <>{lines}</>;
};

export function Map2d({ layout }: { layout: Layout }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const viewBox = useMemo(() => {
    const offset = 50;
    const allPoints = layout.floors.flatMap((floor) =>
      floor.walls.flatMap((wall) => [wall.start, wall.end]),
    );

    const minX = Math.min(...allPoints.map((point) => point.x)) - offset;
    const minY = Math.min(...allPoints.map((point) => point.y)) - offset;
    const width =
      Math.max(...allPoints.map((point) => point.x)) + 2 * offset - minX;
    const height =
      Math.max(...allPoints.map((point) => point.y)) + 2 * offset - minY;

    return { x: minX, y: minY, width, height };
  }, [layout]);

  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const newScale = e.evt.deltaY > 0 ? scale / scaleBy : scale * scaleBy;
    setScale(newScale);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onWheel={handleWheel}
      draggable
      onDragEnd={(e) => {
        setPosition({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      x={position.x}
      y={position.y}
    >
      <Layer x={-viewBox.x} y={-viewBox.y} scaleX={scale} scaleY={scale}>
        <Grid2D viewBox={viewBox} />
        {layout.floors[0].walls.map((wall) => (
          <Wall2D
            key={`${wall.start.x}-${wall.start.y}-${wall.end.x}-${wall.end.y}`}
            wall={wall}
          />
        ))}
      </Layer>
    </Stage>
  );
}
