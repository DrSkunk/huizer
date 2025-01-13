import { Side, type Panel } from "~/domain/layout";
import { PanelItem2D } from "./panel-item-2d";
import { useMemo } from "react";
import { Group } from "react-konva";

export function Panel2D({
  panel,
  wallThickness,
}: {
  panel: Panel;
  wallThickness: number;
}) {
  const { position, items } = panel;

  const sideRotation = panel.side === Side.LEFT ? -90 : 90;
  const sideY =
    panel.side === Side.LEFT ? -wallThickness / 2 : wallThickness / 2;

  return (
    <Group x={position.x}>
      <Group y={sideY} rotation={sideRotation}>
        {items.map((item, index) => (
          <Group key={item.ID} y={index * 30}>
            <PanelItem2D panelItem={item} />
          </Group>
        ))}
      </Group>
    </Group>
  );
}
