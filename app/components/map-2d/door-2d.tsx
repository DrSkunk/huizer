import type { Door } from "~/domain/layout";
import { defaults } from "~/domain/layout";
import { Group, Rect } from "react-konva";

export function Door2d({
  door,
  wallThickness,
}: {
  door: Door;
  wallThickness: number;
}) {
  return (
    <Group>
      <Rect
        x={door.position}
        y={-wallThickness / 2}
        width={door.width ?? defaults.door.width}
        height={wallThickness}
        fill="brown"
      />
    </Group>
  );
}
