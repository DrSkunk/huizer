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
    let translate = `${position.x},${position.y}`
    let rotation: number

    if (panel.side === Side.LEFT) {
      rotation = wallAngle - 90
    } else {
      rotation = wallAngle + 90
    }
    return `translate(${translate}) rotate(${rotation})`
  }, [position, wallAngle, panel.side])

  return (
    <g transform={rootPositioning}>
      <g transform={`translate(${wallThickness / 2},0)`}>
        {items.map((item, index) => (
          <g key={item.ID} transform={`translate(${index * 15},0)`}>
            <PanelItem2D panelItem={item} />
          </g>
        ))}
      </g>
    </g>
  )
}
