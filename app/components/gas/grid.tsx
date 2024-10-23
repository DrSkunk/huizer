export function Grid({ width, height }: { width: number; height: number }) {
  return (
    <>
      <defs>
        <pattern
          id="grid"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          className="text-gray-600"
        >
          <path d={`M 0 ${height} L ${width} 0`} stroke="currentcolor" strokeWidth="1" />
          <path d={`M 0 0 L ${width} ${height}`} stroke="currentcolor" strokeWidth="1" />
          <path
            d={`M ${width / 2} 0 L ${width / 2} ${height}`}
            stroke="currentcolor"
            strokeWidth="1"
          />
          <path d={`M 0 0 L 0 ${height}`} stroke="currentcolor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="white" />
      <rect width="100%" height="100%" fill="url(#grid)" />
    </>
  )
}
