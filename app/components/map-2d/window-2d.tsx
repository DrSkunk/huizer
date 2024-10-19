import type { Window } from '~/domain/house'

export function Window2D({ window }: { window: Window }) {
  const { position, width } = window

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
