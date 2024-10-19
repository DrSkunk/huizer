import { Side, type Panel } from '~/domain/house'
import { PanelItem2D } from './panel-item-2d'
import { useMemo } from 'react'

export function Panel2D({
  panel,
  wallThickness,
}: {
  panel: Panel
  wallThickness: number
}) {
  const { position, items } = panel

  const sidePositioning = useMemo(() => {
    switch (panel.side) {
      case Side.LEFT:
        return `translate(0,${-wallThickness / 2}) rotate(-90)`
      case Side.RIGHT:
        return `translate(0,${wallThickness / 2}) rotate(90)`
    }
  }, [panel.side, wallThickness])

  return (
    <g transform={`translate(${position.x})`}>
      <g transform={sidePositioning}>
        <g className="text-black">
          {items.map((item, index) => (
            <g key={item.ID} transform={`translate(0,${index * 30})`}>
              <PanelItem2D panelItem={item} />
            </g>
          ))}
        </g>
      </g>
    </g>
  )
}
