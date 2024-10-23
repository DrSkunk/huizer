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

  // TODO: Labeloffset of a node is dependant on incoming and outgoing edge
  // Best to move the calculation of that to here
  const nodeElement = {
    [NodeType.JUNCTION]: <Label label={label} x={labelOffset.x} y={labelOffset.y} />,
    [NodeType.WALL]: <Wall />,
    [NodeType.MEASURE]: <Measure label={label} angle={angle} />,
    [NodeType.BOILER]: <Boiler />,
    [NodeType.METER]: <Meter />,
    [NodeType.VALVE]: <Valve label={label} />,
  }[type]

  if (nodeElement !== null) {
    return <g transform={`translate(${x},${y})`}>{nodeElement}</g>
  }
}

function Meter() {
  return (
    <g>
      <rect
        x={-35}
        y={-15}
        width={70}
        height={30}
        fill="white"
        stroke="black"
        strokeWidth={2}
      />
      <text textAnchor="middle" className="font-mono" fontSize={14} y={5}>
        Teller
      </text>
    </g>
  )
}

function Boiler() {
  return (
    <g>
      <rect
        x={-30}
        y={-20}
        width={60}
        height={40}
        fill="white"
        stroke="black"
        strokeWidth={2}
      />
      <text textAnchor="middle" className="font-mono" fontSize={14} y={5}>
        <tspan x={0} dy="-10">
          Ketel
        </tspan>
        <tspan x={0} dy="20">
          xxkW
        </tspan>
      </text>
    </g>
  )
}

function Valve({ label }: { label: string }) {
  // two triangles with their points pointing to eachother
  return (
    <g transform="translate(-15, -15)">
      <polygon points="0,15 15,0 30,15" fill="white" stroke="black" strokeWidth={3} />
      <polygon points="0,-15 15,0 30,-15" fill="white" stroke="black" strokeWidth={4} />
      <Label label={label} x={-10} y={0} />
    </g>
  )
}

function Wall() {
  return <line x1={0} y1={-100} x2={0} y2={100} stroke="black" strokeWidth="8" />
}

function Measure({ label, angle }: { label: string; angle: number }) {
  return (
    <g>
      <Label label={label} x={10} y={-35} />
      <g transform={`rotate(${angle})`}>
        <rect x={-15} y={-5} width={30} height={10} fill="black" />
        <rect x={-5} y={-10} width={10} height={10} fill="black" />
        <rect x={-10} y={-22} width={20} height={10} fill="black" />
      </g>
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
