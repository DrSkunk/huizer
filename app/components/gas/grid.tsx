export function Grid() {
  const width = 100
  const height = 50

  // Calculate angle
  const angle = Math.atan2(height, width) * (180 / Math.PI)

  return (
    <div className="relative h-[200mm] w-[200mm]">
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
            {/* Diagonal line from bottom-left to top-right (60-degree) */}
            <path
              d={`M 0 ${height} L ${width} 0`}
              stroke="currentcolor"
              strokeWidth="1"
            />

            {/* Diagonal line from top-left to bottom-right (-60-degree) */}
            <path
              d={`M 0 0 L ${width} ${height}`}
              stroke="currentcolor"
              strokeWidth="1"
            />

            {/* Vertical line in the middle of the grid */}
            <path
              d={`M ${width / 2} 0 L ${width / 2} ${height}`}
              stroke="currentcolor"
              strokeWidth="1"
            />

            {/* Vertical line on the edge of the grid */}
            <path d={`M 0 0 L 0 ${height}`} stroke="currentcolor" strokeWidth="1" />
          </pattern>
          {/* A marker to be used as an arrowhead */}
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
      </svg>
    </div>
  )
}
