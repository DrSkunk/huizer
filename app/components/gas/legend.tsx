export function Legend({
  width,
  height,
}: {
  width: number
  height: number
}) {
  const angle = Math.atan2(height, width) * (180 / Math.PI)

  return (
    <>
      <defs>
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
      <g id="legend">
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
    </>
  )
}
