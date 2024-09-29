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
    let translate = `${position.x},0`

    return `translate(${translate})`
  }, [position])

  const sidePositioning = useMemo(() => {
    let translate = ''
    if (panel.side === Side.LEFT) {
      translate = `translate(0,${-wallThickness})`
    } else if (panel.side === Side.RIGHT) {
      translate = `translate(0,${wallThickness})`
    }
    return translate
  }, [panel.side, wallThickness])

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
