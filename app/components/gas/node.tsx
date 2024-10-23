import type { Node as NodeType } from '~/domain/gas'

interface NodeProps {
  coordinates: {
    node: NodeType
    x: number
    y: number
    labelOffset: {
      x: number
      y: number
    }
  }
}

export function Node({ coordinates }: NodeProps) {
  const { x, y, labelOffset, node } = coordinates
  const { label, type } = node

  let nodeElement = null

  if (type === 'wall') {
    nodeElement = <line x1={0} y1={-100} x2={0} y2={100} stroke="black" strokeWidth="8" />
  }

  return (
    <g transform={`translate(${x},${y})`}>
      {nodeElement}
      <g transform={`translate(${labelOffset.x},${labelOffset.y})`}>
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
    </g>
  )
}
