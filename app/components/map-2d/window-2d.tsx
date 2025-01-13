import type { Window } from "~/domain/layout";
import { Rect } from "react-konva";

export function Window2D({
  window,
  wallThickness,
}: {
  window: Window;
  wallThickness: number;
}) {
  return (
    <Rect
      x={window.position.x}
      y={-wallThickness / 2}
      width={window.width}
      height={wallThickness}
      fill="white"
      stroke="black"
      strokeWidth={1}
    />
  );
}
