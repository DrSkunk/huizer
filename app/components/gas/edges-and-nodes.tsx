import { useMemo } from 'react'
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
      return { x: -15, y: 0 }
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
  const baseAngle = useMemo(
    () => Math.atan2(height, width) * (180 / Math.PI),
    [height, width],
  )

  const { nodeCoordinates, edgeCoordinates } = useMemo(() => {
    const startX = startCoordinates.x
    const startY = startCoordinates.y

    let lastX = startX
    let lastY = startY

    const nodeCoordinates: {
      node: Node
      x: number
      y: number
      angle: number
      labelOffset: {
        x: number
        y: number
      }
    }[] = []

    // first node uses the starting coordinates
    nodeCoordinates.push({
      node: nodes[edgeList[0].from],
      x: lastX,
      y: lastY,
      angle: 0,
      labelOffset: {
        x: 0,
        y: 0,
      },
    })

    const edgeCoordinates: {
      from: Edge
      to: Edge
      x1: number
      y1: number
      x2: number
      y2: number
    }[] = []

    for (const [index, edge] of edgeList.entries()) {
      let x = lastX
      let y = lastY
      let angle = 0
      const nextEdge = edgeList?.[index + 1]

      let labelOffset = calculateLabelOffset(edge, nextEdge)

      if (edge.direction === Direction.LEFT) {
        x -= width
        y -= height
        angle = baseAngle
      } else if (edge.direction === Direction.RIGHT) {
        x += width
        y += height
        angle = baseAngle
      } else if (edge.direction === Direction.UP) {
        y -= height * 2
      } else if (edge.direction === Direction.DOWN) {
        y += height * 2
      } else if (edge.direction === Direction.FRONT) {
        x -= width
        y += height
        angle = -baseAngle
      } else if (edge.direction === Direction.BEHIND) {
        x += width
        y += height
        angle = -baseAngle
      }

      // Store the coordinates for the current node
      nodeCoordinates.push({
        node: nodes[edge.to],
        x,
        y,
        angle,
        labelOffset,
      })

      // Edges are only drawn when the distance is nonzero
      // but nodes are still shown when there is a label
      if (edge.distance > 0) {
        const coords = {
          from: edge,
          to: edge,
          x1: lastX,
          y1: lastY,
          x2: x,
          y2: y,
        }

        edgeCoordinates.push(coords)
      }

      // Move the lastX, lastY for the next iteration
      lastX = x
      lastY = y
    }

    return { nodeCoordinates, edgeCoordinates }
  }, [width, height, edgeList, nodes, startCoordinates, baseAngle])

  return (
    <>
      {edgeCoordinates.map((coordinates) => (
        <g key={`${coordinates.from.toString()}-${coordinates.to.toString()}`}>
          <line
            x1={coordinates.x1}
            y1={coordinates.y1}
            x2={coordinates.x2}
            y2={coordinates.y2}
            stroke="black"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
      ))}
      {nodeCoordinates.map((coordinates) => (
        <NodeElement
          key={coordinates.node.label + coordinates.node.type}
          coordinates={coordinates}
        />
      ))}
    </>
  )
}
