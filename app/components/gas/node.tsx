export function Node({
  coordinates,
  node,
}: {
  coordinates: {
    nodeIndex: number
    x: number
    y: number
    labelOffset: {
      x: number
      y: number
    }
  }
  node: {
    type: string
    label: string
  }
}) {
  const { x, y, labelOffset } = coordinates
  const { label, type } = node
  return (
    <g transform={`translate(${x + labelOffset.x * 10},${y + labelOffset.y * 10})`}>
      <rect
        x="-10"
        y="-10"
        width="20"
        height="20"
        fill="white"
        stroke="black"
        strokeWidth={1}
      />
      <text textAnchor="middle" y={5}>
        {label}
      </text>
    </g>
  )
}
