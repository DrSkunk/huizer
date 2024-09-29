import type { Panel, PositionXY, Wall } from '~/domain/house'
import { defaults } from '~/domain/house'
import { Panel2D } from './panel-2d'
import { useMemo } from 'react'

export function Wall2D({ wall }: { wall: Wall }) {
  const { start, end, thickness } = wall

  return (
    <g transform={`translate(${start.x},${start.y})`}>
      <line
        x1={0}
        y1={0}
        x2={end.x - start.x}
        y2={end.y - start.y}
        stroke="white"
        strokeWidth={thickness}
      />
      {wall.doors.map((door) => (
        <rect
          key={`door-${door.position}-${door.width}-${door.height}`}
          x={door.position}
          y={-thickness / 2}
          width={door.width ?? defaults.door.width}
          height={thickness}
          fill="brown"
        />
      ))}
      {wall.windows.map((window) => (
        <rect
          key={`window-${window.position.x}-${window.position.z}-${window.width}-${window.height}`}
          x={window.position.x}
          y={-thickness / 2}
          width={window.width ?? defaults.window.width}
          height={thickness}
          fill="blue"
        />
      ))}
      <Panels
        panels={wall.panels}
        wallStart={start}
        wallEnd={end}
        wallThickness={thickness}
      />
    </g>
  )
}

function Panels({
  panels,
  wallStart,
  wallEnd,
  wallThickness,
}: {
  panels: Panel[]
  wallStart: PositionXY
  wallEnd: PositionXY
  wallThickness: number
}) {
  // offset is based on the angle and thickness of the wall
  const wallAngle = useMemo(
    () => (Math.atan2(wallEnd.y - wallStart.y, wallEnd.x - wallStart.x) * 180) / Math.PI,
    [wallStart, wallEnd],
  )
  console.log(wallAngle)
  return (
    <>
      {panels.map((panel) => (
        <Panel2D
          key={panel.position.x}
          panel={panel}
          wallAngle={wallAngle}
          wallThickness={wallThickness}
        />
      ))}
    </>
  )
}
