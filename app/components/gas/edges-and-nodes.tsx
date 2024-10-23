import { Direction, type Edge, type Node } from '~/domain/gas'
import { Node as NodeElement } from './node'

interface EdgesProps {
  width: number
  height: number
  edgeList: Edge[]
  nodes: Node[]
  startCoordinates: {
    x: number
    y: number
  }
}

function calculateLabelOffset(edge: Edge, nextEdge: Edge) {
  if (!nextEdge) {
    return {
      x: 0,
      y: 0,
    }
  }

  // Handle direction pairs and adjust offset accordingly
  if (edge.direction === Direction.LEFT) {
    if (nextEdge.direction === Direction.LEFT) {
      return { x: 16, y: -12 }
    }
    if (nextEdge.direction === Direction.RIGHT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.UP) {
      return { x: -15, y: 12 }
    }
    if (nextEdge.direction === Direction.DOWN) {
      return { x: 0, y: 1 }
    }
    if (nextEdge.direction === Direction.FRONT) {
      return { x: 0, y: -15 }
    }
    if (nextEdge.direction === Direction.BEHIND) {
      return { x: 0, y: 0 }
    }
  }
  if (edge.direction === Direction.RIGHT) {
    if (nextEdge.direction === Direction.LEFT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.RIGHT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.UP) {
      return { x: 0, y: -1 }
    }
    if (nextEdge.direction === Direction.DOWN) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.FRONT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.BEHIND) {
      return { x: 0, y: 0 }
    }
  }
  if (edge.direction === Direction.UP) {
    if (nextEdge.direction === Direction.LEFT) {
      return { x: 15, y: -4 }
    }
    if (nextEdge.direction === Direction.RIGHT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.UP) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.DOWN) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.FRONT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.BEHIND) {
      return { x: 0, y: 0 }
    }
  }
  if (edge.direction === Direction.DOWN) {
    if (nextEdge.direction === Direction.LEFT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.RIGHT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.UP) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.DOWN) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.FRONT) {
      return { x: 16, y: 10 }
    }
    if (nextEdge.direction === Direction.BEHIND) {
      return { x: 0, y: 0 }
    }
  }
  if (edge.direction === Direction.FRONT) {
    if (nextEdge.direction === Direction.LEFT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.RIGHT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.UP) {
      return { x: -12, y: 14 }
    }
    if (nextEdge.direction === Direction.DOWN) {
      return { x: -16, y: -5 }
    }
    if (nextEdge.direction === Direction.FRONT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.BEHIND) {
      return { x: 0, y: 0 }
    }
  }
  if (edge.direction === Direction.BEHIND) {
    if (nextEdge.direction === Direction.LEFT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.RIGHT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.UP) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.DOWN) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.FRONT) {
      return { x: 0, y: 0 }
    }
    if (nextEdge.direction === Direction.BEHIND) {
      return { x: 0, y: 0 }
    }
  }

  return {
    x: 0,
    y: 0,
  }
}

export function EdgesAndNodes({
  width,
  height,
  edgeList,
  nodes,
  startCoordinates,
}: EdgesProps) {
  const startX = startCoordinates.x
  const startY = startCoordinates.y

  let lastX = startX
  let lastY = startY

  const filteredEdges = edgeList.filter((edge) => edge.distance > 0)

  const nodeCoordinates: {
    node: Node
    x: number
    y: number
    labelOffset: {
      x: number
      y: number
    }
  }[] = []

  // Calculate coordinates for drawing edges and labeling nodes
  const coordinates = filteredEdges.map((edge, index) => {
    let x = lastX
    let y = lastY

    const nextEdge = filteredEdges?.[index + 1]

    let labelOffset = calculateLabelOffset(edge, nextEdge)

    if (edge.direction === Direction.LEFT) {
      x -= width
      y -= height
    } else if (edge.direction === Direction.RIGHT) {
      x += width
      y += height
    } else if (edge.direction === Direction.UP) {
      y -= height * 2
    } else if (edge.direction === Direction.DOWN) {
      y += height * 2
    } else if (edge.direction === Direction.FRONT) {
      x -= width
      y += height
    } else if (edge.direction === Direction.BEHIND) {
      x += width
      y += height
    }

    // Store the coordinates for the current node
    nodeCoordinates.push({
      node: nodes[edge.to],
      x,
      y,
      labelOffset,
    })

    const coords = {
      from: edge.from,
      to: edge.to,
      x1: lastX,
      y1: lastY,
      x2: x,
      y2: y,
    }

    // Move the lastX, lastY for the next iteration
    lastX = x
    lastY = y

    return coords
  })

  return (
    <>
      {coordinates.map((coordinate, index) => (
        <g key={index}>
          <line
            x1={coordinate.x1}
            y1={coordinate.y1}
            x2={coordinate.x2}
            y2={coordinate.y2}
            stroke="black"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
      ))}
      {nodeCoordinates.map((coordinates, index) => (
        <NodeElement key={`node-${index}`} coordinates={coordinates} />
      ))}
    </>
  )
}
