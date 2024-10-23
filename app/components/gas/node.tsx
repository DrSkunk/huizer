import { NodeType, type Node as NodeTyping } from '~/domain/gas'

interface NodeProps {
  coordinates: {
    node: NodeTyping
    x: number
    y: number
    angle: number
    labelOffset: {
      x: number
      y: number
    }
  }
}

export function Node({ coordinates }: NodeProps) {
  const { x, y, angle, labelOffset, node } = coordinates
  const { label, type } = node

  const nodeElement = {
    [NodeType.JUNCTION]: <Label label={label} x={labelOffset.x} y={labelOffset.y} />,
    [NodeType.WALL]: <Wall />,
    [NodeType.MEASURE]: <Measure angle={angle} />,
    [NodeType.BOILER]: null,
    [NodeType.METER]: null,
    [NodeType.VALVE]: null,
  }[type]

  if (nodeElement !== null) {
    return <g transform={`translate(${x},${y})`}>{nodeElement}</g>
  }
}

function Wall() {
  return <line x1={0} y1={-100} x2={0} y2={100} stroke="black" strokeWidth="8" />
}

function Measure({ angle }: { angle: number }) {
  return (
    <g transform={`rotate(${angle})`}>
      <rect x={-15} y={-5} width={30} height={10} fill="black" />
      <rect x={-5} y={-10} width={10} height={10} fill="black" />
      <rect x={-10} y={-22} width={20} height={10} fill="black" />
    </g>
  )
}

function Label({ label, x, y }: { label: string; x: number; y: number }) {
  if (label === '') {
    return null
  }

  return (
    <g transform={`translate(${x},${y})`}>
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
