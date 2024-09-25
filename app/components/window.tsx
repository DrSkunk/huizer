import type { Window as WindowType } from '~/domain/house'
import { useMemo, useState } from 'react'

export function Window({ window }: { window: WindowType }) {
  const { position, width, height } = window

  // const [hovered, setHovered] = useState(false)

  // return rectangle
  return (
    <rect
      x={position.x}
      y={0}
      width={width}
      height={10}
      fill="white"
      stroke="black"
      strokeWidth={1}
    />
  )
}
