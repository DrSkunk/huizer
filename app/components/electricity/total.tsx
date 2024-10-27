import type { ElectricalComponent, Electricity, Fuse } from '~/domain/electricity'

const LABEL_TOP_HEIGHT = 30
const PHASE_LABEL_HEIGHT = 20
const DESCRIPTION_HEIGHT = 20
const VERTICAL_SPACING = 20
const CELL_WIDTH = 50
const CELL_HEIGHT = 80

const ROW_HEIGHT =
  LABEL_TOP_HEIGHT + CELL_HEIGHT + PHASE_LABEL_HEIGHT + DESCRIPTION_HEIGHT

export function Total({ electricity }: { electricity: Electricity }) {
  const { configuration, rows } = electricity
  if (!configuration || !rows || rows.length === 0) {
    return (
      <div className="text-red-500">
        Error: Invalid or missing data for the Electrical Panel
      </div>
    )
  }

  const svgWidth = configuration.modulesPerRow * CELL_WIDTH
  const svgHeight = rows.length * ROW_HEIGHT + (rows.length - 1) * VERTICAL_SPACING

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="mx-auto"
    >
      <title>Electrical Panel</title>
      <rect width={svgWidth} height={svgHeight} fill="#F3F4F6" />
      {rows.map((row, indexRow) => (
        <g
          key={indexRow}
          transform={`translate(0,${indexRow * ROW_HEIGHT + indexRow * VERTICAL_SPACING})`}
        >
          <Components row={row} indexRow={indexRow} />
        </g>
      ))}
    </svg>
  )
}

function Components({
  row,
}: {
  row: ElectricalComponent[]
}) {
  const offsets = row.map((_, indexComponent) => {
    return row
      .slice(0, indexComponent)
      .reduce((acc, component) => acc + component.width * CELL_WIDTH, 0)
  })

  return (
    <>
      {row.map((component, indexComponent) => (
        <g key={indexComponent} transform={`translate(${offsets[indexComponent]},0)`}>
          <Component component={component} />
        </g>
      ))}
      {row.length < 18 && (
        <g transform={`translate(${offsets.at(-1) + row.at(-1).width * CELL_WIDTH})`}>
          <Blank width={18 - row.length} />
        </g>
      )}
    </>
  )
}

function Blank({ width }: { width: number }) {
  return (
    <rect
      transform={`translate(0,${LABEL_TOP_HEIGHT})`}
      width={CELL_WIDTH * width}
      height={CELL_HEIGHT}
      fill="white"
      stroke="black"
      strokeWidth={1}
    />
  )
}

function Component({ component }: { component: ElectricalComponent }) {
  const child = {
    fuse: <FuseComponent fuse={component as Fuse} />,
    differential: <DifferentialComponent component={component} />,
  }

  return (
    <g>
      <CenterText
        x={0}
        y={0}
        width={CELL_WIDTH * component.width}
        height={LABEL_TOP_HEIGHT}
      >
        {component.group}
      </CenterText>
      <g transform={`translate(0,${LABEL_TOP_HEIGHT})`}>
        <rect
          stroke="black"
          strokeWidth={3}
          fill="white"
          width={CELL_WIDTH * component.width}
          height={CELL_HEIGHT}
        />
        {child[component.type]}
      </g>
      <g transform={`translate(0,${LABEL_TOP_HEIGHT + CELL_HEIGHT})`}>
        {component.phase.map((phase, indexPhase) => (
          <CenterText
            x={CELL_WIDTH * indexPhase}
            y={0}
            width={CELL_WIDTH}
            height={PHASE_LABEL_HEIGHT}
            key={indexPhase}
            fill="white"
            stroke="black"
            strokeWidth={1}
          >
            {phase}
          </CenterText>
        ))}
      </g>
      {/* Description below */}
      <CenterText
        x={0}
        y={LABEL_TOP_HEIGHT + CELL_HEIGHT + PHASE_LABEL_HEIGHT}
        width={CELL_WIDTH * component.width}
        height={DESCRIPTION_HEIGHT}
        fontSize={10}
      >
        {component.description}
      </CenterText>
    </g>
  )
}

function FuseComponent({ fuse }: { fuse: Fuse }) {
  const { width, rating } = fuse

  return (
    <g>
      {new Array(width).fill(null).map((_, index) => (
        <g key={index} transform={`translate(${index * CELL_WIDTH},0)`}>
          <rect
            stroke="black"
            strokeWidth={1}
            fill="white"
            width={CELL_WIDTH}
            height={CELL_HEIGHT}
          />
          <circle
            cx={CELL_WIDTH / 2}
            cy={10}
            r={5}
            stroke="black"
            fill="none"
            strokeWidth={1}
          />
          <CenterText
            x={10}
            y={20}
            width={CELL_WIDTH - 20}
            height={CELL_HEIGHT - 40}
            fontSize={10}
            fill="none"
            stroke="black"
            strokeWidth={1}
          >
            {rating}A
          </CenterText>
          <circle
            cx={CELL_WIDTH / 2}
            cy={CELL_HEIGHT - 10}
            r={5}
            stroke="black"
            fill="none"
            strokeWidth={1}
          />
        </g>
      ))}
    </g>
  )
}

function DifferentialComponent({ component }: { component: ElectricalComponent }) {
  return (
    <g>
      <CenterText width={CELL_WIDTH * component.width} height={CELL_HEIGHT}>
        {component.rating}mA
      </CenterText>
    </g>
  )
}

function CenterText({
  x = 0,
  y = 0,
  width,
  height,
  fill = 'none',
  stroke = 'none',
  strokeWidth = 0,
  fontSize = 15,
  children,
}: {
  x?: number
  y?: number
  width: number
  height: number
  fill?: string
  stroke?: string
  strokeWidth?: number
  fontSize?: number
  children: React.ReactNode
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        dominant-baseline="middle"
        text-anchor="middle"
        fontSize={fontSize}
      >
        {children}
      </text>
    </g>
  )
}
