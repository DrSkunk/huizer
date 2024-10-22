import { Node } from './node'

export function Grid() {
  const width = 100
  const height = 50

  // Calculate angle
  const angle = Math.atan2(height, width) * (180 / Math.PI)

  const nodes = [
    { type: 'meter', label: '' }, // 0 (No label)
    { type: 'measure', label: 'A' }, // 1 - A
    { type: 'junction', label: 'B' }, // 2 - B
    { type: 'junction', label: 'C' }, // 3 - C
    { type: 'wall', label: 'D' }, // 4 - D
    { type: 'junction', label: 'E' }, // 5 - E
    { type: 'junction', label: 'F' }, // 6 - F
    { type: 'junction', label: 'G' }, // 7 - G
    { type: 'junction', label: 'H' }, // 8 - H
    { type: 'valve', label: 'I' }, // 9 - I
    { type: 'boiler', label: '' }, // 10 (No label)
  ]

  const edgeList = [
    { from: 0, to: 1, distance: 0, direction: 'left' }, // 0 to A
    { from: 1, to: 2, distance: 50, direction: 'left' }, // A to B
    { from: 2, to: 3, distance: 40, direction: 'up' }, // B to C
    { from: 3, to: 4, distance: 190, direction: 'left' }, // C to D
    { from: 4, to: 5, distance: 450, direction: 'left' }, // D to E
    { from: 5, to: 6, distance: 310, direction: 'front' }, // E to F
    { from: 6, to: 7, distance: 180, direction: 'down' }, // F to G
    { from: 7, to: 8, distance: 30, direction: 'front' }, // G to H
    { from: 8, to: 9, distance: 50, direction: 'up' }, // H to I
    { from: 9, to: 10, distance: 0, direction: 'up' }, // I to boiler
  ]

  const startX = 7 * width // Starting x-coordinate
  const startY = 10 * height // Starting y-coordinate

  let lastX = startX
  let lastY = startY

  // Prepare an array to store coordinates for all the nodes
  const nodeCoordinates: {
    nodeIndex: number
    x: number
    y: number
    labelOffset: {
      x: number
      y: number
    }
  }[] = []

  function calculateLabelOffset(edge, previousEdge) {
    if (!previousEdge) {
      return {
        x: 0,
        y: 0,
      }
    }

    // Handle direction pairs and adjust offset accordingly
    if (previousEdge.direction === 'left') {
      if (edge.direction === 'left') {
        return { x: 0, y: 0 }
      }
      if (edge.direction === 'right') {
        return { x: -1, y: 0 }
      }
      if (edge.direction === 'up') {
        return { x: 0, y: -1 }
      }
      if (edge.direction === 'down') {
        return { x: 0, y: 1 }
      }
      if (edge.direction === 'front') {
        return { x: -1, y: -1 }
      }
      if (edge.direction === 'behind') {
        return { x: 1, y: 1 }
      }
    }
    if (previousEdge.direction === 'right') {
      if (edge.direction === 'left') {
        return { x: 1, y: 0 }
      }
      if (edge.direction === 'right') {
        return { x: 0, y: 0 }
      }
      if (edge.direction === 'up') {
        return { x: 0, y: -1 }
      }
      if (edge.direction === 'down') {
        return { x: 0, y: 1 }
      }
      if (edge.direction === 'front') {
        return { x: 1, y: -1 }
      }
      if (edge.direction === 'behind') {
        return { x: -1, y: 1 }
      }
    }
    if (previousEdge.direction === 'up') {
      if (edge.direction === 'left') {
        return { x: -1, y: 0 }
      }
      if (edge.direction === 'right') {
        return { x: 1, y: 0 }
      }
      if (edge.direction === 'up') {
        return { x: 0, y: 0 }
      }
      if (edge.direction === 'down') {
        return { x: 0, y: 1 }
      }
      if (edge.direction === 'front') {
        return { x: 0, y: -1 }
      }
      if (edge.direction === 'behind') {
        return { x: 0, y: 1 }
      }
    }
    if (previousEdge.direction === 'down') {
      if (edge.direction === 'left') {
        return { x: -1, y: 0 }
      }
      if (edge.direction === 'right') {
        return { x: 1, y: 0 }
      }
      if (edge.direction === 'up') {
        return { x: 0, y: -1 }
      }
      if (edge.direction === 'down') {
        return { x: 0, y: 0 }
      }
      if (edge.direction === 'front') {
        return { x: 0, y: 1 }
      }
      if (edge.direction === 'behind') {
        return { x: 0, y: -1 }
      }
    }
    if (previousEdge.direction === 'front') {
      if (edge.direction === 'left') {
        return { x: -1, y: -1 }
      }
      if (edge.direction === 'right') {
        return { x: 1, y: -1 }
      }
      if (edge.direction === 'up') {
        return { x: 0, y: -1 }
      }
      if (edge.direction === 'down') {
        return { x: 0, y: 1 }
      }
      if (edge.direction === 'front') {
        return { x: 0, y: 0 }
      }
      if (edge.direction === 'behind') {
        return { x: 0, y: 2 }
      }
    }
    if (previousEdge.direction === 'behind') {
      if (edge.direction === 'left') {
        return { x: 1, y: 1 }
      }
      if (edge.direction === 'right') {
        return { x: -1, y: 1 }
      }
      if (edge.direction === 'up') {
        return { x: 0, y: -1 }
      }
      if (edge.direction === 'down') {
        return { x: 0, y: 1 }
      }
      if (edge.direction === 'front') {
        return { x: 0, y: -2 }
      }
      if (edge.direction === 'behind') {
        return { x: 0, y: 0 }
      }
    }

    return {
      x: 0,
      y: 0,
    }
  }

  const filteredEdges = edgeList.filter((edge) => edge.distance > 0)

  // Calculate coordinates for drawing edges and labeling nodes
  const coordinates = filteredEdges.map((edge, index) => {
    let x = lastX
    let y = lastY

    const previousEdge = filteredEdges?.[index - 1]

    let labelOffset = calculateLabelOffset(edge, previousEdge)
    // Calculate the labelOffset intelligently, making sure it does not interfere with previous and next edge placed

    if (edge.direction === 'left') {
      x -= width
      y -= height
    } else if (edge.direction === 'right') {
      x += width
      y += height
    } else if (edge.direction === 'up') {
      y -= height * 2
    } else if (edge.direction === 'down') {
      y += height * 2
    } else if (edge.direction === 'front') {
      x -= width
      y += height
    } else if (edge.direction === 'back') {
      x += width
      y += height
    }

    // Store the coordinates for the current node
    nodeCoordinates.push({
      nodeIndex: edge.to,
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
    <div
      className="relative"
      style={{
        width: width * 8,
        height: height * 16,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="isometric-grid absolute h-full w-full bg-white"
      >
        <title>Isometric Grid</title>
        <defs>
          <pattern
            id="grid"
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            className="text-gray-600"
          >
            <path
              d={`M 0 ${height} L ${width} 0`}
              stroke="currentcolor"
              strokeWidth="1"
            />
            <path
              d={`M 0 0 L ${width} ${height}`}
              stroke="currentcolor"
              strokeWidth="1"
            />
            <path
              d={`M ${width / 2} 0 L ${width / 2} ${height}`}
              stroke="currentcolor"
              strokeWidth="1"
            />
            <path d={`M 0 0 L 0 ${height}`} stroke="currentcolor" strokeWidth="1" />
          </pattern>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill="white" />
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Legend */}
        <g>
          <rect
            x={0}
            y={0}
            width={width}
            height={height * 2}
            fill="white"
            stroke="black"
            strokeWidth="1"
          />

          {/* top to bottom line */}
          <line
            x1={width / 2}
            y1={0}
            x2={width / 2}
            y2={height * 2}
            stroke="black"
            strokeWidth="2"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text x={width / 2 + 5} y={10} textAnchor="start" fontSize=".6em">
            boven
          </text>
          <text x={width / 2 - 5} y={height * 2 - 5} textAnchor="end" fontSize=".6em">
            onder
          </text>
          {/* diagonal line top left to bottom right */}
          <line
            x1={0}
            y1={height / 2}
            x2={width}
            y2={height * 1.5}
            stroke="black"
            strokeWidth="2"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <g transform={`translate(${width - 10},${height * 1.5 + 10})`}>
            <text textAnchor="end" fontSize=".6em" transform={`rotate(${angle})`}>
              rechts
            </text>
          </g>
          <g transform={`translate(${5},${height / 2 - 5})`}>
            <text textAnchor="start" fontSize=".6em" transform={`rotate(${angle})`}>
              links
            </text>
          </g>
          {/* diagonal line top right to bottom left */}
          <line
            x1={width}
            y1={height / 2}
            x2={0}
            y2={height * 1.5}
            stroke="black"
            strokeWidth="2"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <g transform={`translate(${10},${height * 1.5 - 10})`}>
            <text textAnchor="start" fontSize=".6em" transform={`rotate(-${angle})`}>
              voor
            </text>
          </g>
          <g transform={`translate(${width - 5},${height / 2 + 15})`}>
            <text textAnchor="end" fontSize=".6em" transform={`rotate(-${angle})`}>
              achter
            </text>
          </g>
        </g>

        {/* Draw all edges on the grid */}
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

        {/* Label each node at its ending position */}
        {nodeCoordinates.map((coordinates, index) => {
          // const nodeLabel = nodes[coordinates.nodeIndex].label

          return (
            <Node
              key={`node-${index}`}
              coordinates={coordinates}
              node={nodes[coordinates.nodeIndex]}
            />
          )
        })}
        {/* {nodeCoordinates.map((node, index) => {
          const nodeLabel = nodes[node.nodeIndex].label

          return (
            nodeLabel && (
              <text
                key={index}
                x={node.x + 10} // Adjust island position slightly
                y={node.y - 10} // Adjust to position above the node
                fontSize="12"
                fill="black"
                fontWeight="bold"
              >
                {nodeLabel}
              </text>
            )
          )
        })} */}
      </svg>
    </div>
  )
}
