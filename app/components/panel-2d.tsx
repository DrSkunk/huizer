import { Side, type Panel } from '~/domain/house'
import { PanelItem2D } from './panel-item-2d'
import { useMemo } from 'react'

export function Panel2D({
  panel,
  offset,
}: {
  panel: Panel
  offset: { left: { x: number; y: number }; right: { x: number; y: number } }
}) {
  const { position, orientation, items } = panel

  const transform = useMemo(() => {
    if (panel.side === Side.LEFT) {
      return `translate(${position.x + offset.left.x},${position.y + offset.left.y})`
    }
    return `translate(${position.x + offset.right.x},${position.y + offset.right.y})`
  }, [position, offset, panel.side])

  return (
    <g transform={transform}>
      {items.map((item) => (
        <PanelItem2D key={item.ID} panelItem={item} />
      ))}
    </g>
  )
}
