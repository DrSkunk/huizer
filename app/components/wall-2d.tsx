import type { Panel, PositionXY, Wall } from '~/domain/house'
import { defaults } from '~/domain/house'
import { Panel2D } from './panel-2d'
import { useMemo } from 'react'
import { Door2d } from './door-2d'

export function Wall2D({ wall }: { wall: Wall }) {
  const { start, end, thickness } = wall

  const wallAngle = useMemo(
    () => (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI,
    [start, end],
  )

  return (
    <g transform={`translate(${start.x},${start.y})`}>
      <line
        x1={0}
        y1={0}
        x2={end.x - start.x}
        y2={end.y - start.y}
        stroke="currentcolor"
        strokeWidth={thickness}
        strokeLinecap="round"
        // hover stroke gray
        className="text-white hover:text-gray-400"
      />
      <g transform={`rotate(${wallAngle})`}>
        {wall.doors.map((door) => (
          <Door2d
            key={`door-${door.position}-${door.width}-${door.height}`}
            door={door}
            wallThickness={thickness}
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
        <Panels panels={wall.panels} wallThickness={thickness} />
      </g>
    </g>
  )
}

function Panels({
  panels,
  wallThickness,
}: {
  panels: Panel[]
  wallThickness: number
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
  )
}
