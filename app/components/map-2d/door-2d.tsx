import type { Door } from '~/domain/layout'
import { defaults } from '~/domain/layout'

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
