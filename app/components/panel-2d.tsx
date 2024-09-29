import { Side, type Panel } from '~/domain/house'
import { PanelItem2D } from './panel-item-2d'
import { useMemo } from 'react'

export function Panel2D({
  panel,
  wallAngle,
  wallThickness,
}: {
  panel: Panel
  wallAngle: number
  wallThickness: number
}) {
  const { position, items } = panel

  const rootPositioning = useMemo(() => {
    // Calculate X and Y based on wall angle and position.x
    const x = position.x * Math.cos((wallAngle * Math.PI) / 180)
    const y = position.x * Math.sin((wallAngle * Math.PI) / 180)
    return `translate(${x},${y})`
  }, [position.x, wallAngle])

  const sidePositioning = useMemo(() => {
    let dx = 0
    let dy = 0
    if (panel.side === Side.LEFT) {
      dx = wallThickness * Math.sin((wallAngle * Math.PI) / 180)
      dy = -wallThickness * Math.cos((wallAngle * Math.PI) / 180)
    } else if (panel.side === Side.RIGHT) {
      dx = -wallThickness * Math.sin((wallAngle * Math.PI) / 180)
      dy = wallThickness * Math.cos((wallAngle * Math.PI) / 180)
    }
    return `translate(${dx},${dy})`
  }, [panel.side, wallThickness, wallAngle])

  const sideRotation = useMemo(() => {
    // use wall angle to determine the rotation
    let rotate = 0
    if (panel.side === Side.LEFT) {
      rotate = wallAngle - 90
    } else if (panel.side === Side.RIGHT) {
      rotate = wallAngle + 90
    }
    return `rotate(${rotate})`
  }, [panel.side, wallAngle])

  return (
    <g transform={rootPositioning}>
      <g transform={sidePositioning}>
        <g className="text-black" transform={sideRotation}>
          {items.map((item, index) => (
            <g key={item.ID} transform={`translate(${index * 20},0)`}>
              <PanelItem2D panelItem={item} />
            </g>
          ))}
        </g>
      </g>
    </g>
  )
}
