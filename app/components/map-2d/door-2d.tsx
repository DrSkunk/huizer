import type { Door } from '~/domain/house'
import { defaults } from '~/domain/house'

export function Door2d({ door, wallThickness }: { door: Door; wallThickness: number }) {
  return (
    <g>
      <rect
        x={door.position}
        y={-wallThickness / 2}
        width={door.width ?? defaults.door.width}
        height={wallThickness}
        fill="brown"
      />
    </g>
  )
}
