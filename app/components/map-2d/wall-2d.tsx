import type { Panel, Wall } from "~/domain/layout";
import { defaults } from "~/domain/layout";
import { Panel2D } from "./panel-2d";
import { useMemo } from "react";
import { Door2d } from "./door-2d";
import { Group, Line } from "react-konva";
import { Window2D } from "./window-2d";

export function Wall2D({ wall }: { wall: Wall }) {
  const { start, end, thickness } = wall;

  const wallAngle = useMemo(
    () => (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI,
    [start, end],
  );

  return (
    <Group x={start.x} y={start.y}>
      <Line
        points={[0, 0, end.x - start.x, end.y - start.y]}
        stroke="#ccc"
        strokeWidth={thickness}
        lineCap="round"
        onMouseEnter={(e) => e.target.stroke("#9ca3af")}
        onMouseLeave={(e) => e.target.stroke("#ccc")}
      />
      <Group rotation={wallAngle}>
        {wall.doors.map((door) => (
          <Door2d
            key={`door-${door.position}-${door.width}-${door.height}`}
            door={door}
            wallThickness={thickness}
          />
        ))}
        {wall.windows.map((window) => (
          <Window2D
            key={`window-${window.position.x}-${window.position.z}-${window.width}-${window.height}`}
            window={window}
            wallThickness={thickness}
          />
        ))}
        <Panels panels={wall.panels} wallThickness={thickness} />
      </Group>
    </Group>
  );
}

function Panels({
  panels,
  wallThickness,
}: {
  panels: Panel[];
  wallThickness: number;
}) {
  return (
    <>
      {panels.map((panel) => (
        <Panel2D
          key={`${panel.position.x}-${panel.side}`}
          panel={panel}
          wallThickness={wallThickness}
        />
      ))}
    </>
  );
}
