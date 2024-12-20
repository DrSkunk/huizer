import { Direction, NodeType } from '~/domain/gas'
import { EdgesAndNodes } from './edges-and-nodes'
import { Grid } from './grid'
import { Legend } from './legend'

export function Total() {
  const width = 100
  const height = 50

  const nodes = [
    { type: NodeType.METER, label: '' }, // 0 (No label)
    { type: NodeType.MEASURE, label: 'A' }, // 1 - A
    { type: NodeType.JUNCTION, label: 'B' }, // 2 - B
    { type: NodeType.JUNCTION, label: 'C' }, // 3 - C
    { type: NodeType.WALL, label: 'D' }, // 4 - D
    { type: NodeType.JUNCTION, label: 'E' }, // 5 - E
    { type: NodeType.JUNCTION, label: 'F' }, // 6 - F
    { type: NodeType.JUNCTION, label: 'G' }, // 7 - G
    { type: NodeType.JUNCTION, label: 'H' }, // 8 - H
    { type: NodeType.VALVE, label: 'I' }, // 9 - I
    { type: NodeType.BOILER, label: '' }, // 10 (No label)
  ]

  const edgeList = [
    { from: 0, to: 1, distance: 0, direction: Direction.LEFT }, // 0 to A
    { from: 1, to: 2, distance: 50, direction: Direction.LEFT }, // A to B
    { from: 2, to: 3, distance: 40, direction: Direction.UP }, // B to C
    { from: 3, to: 4, distance: 190, direction: Direction.LEFT }, // C to D
    { from: 4, to: 5, distance: 450, direction: Direction.LEFT }, // D to E
    { from: 5, to: 6, distance: 310, direction: Direction.FRONT }, // E to F
    { from: 6, to: 7, distance: 180, direction: Direction.DOWN }, // F to G
    { from: 7, to: 8, distance: 30, direction: Direction.FRONT }, // G to H
    { from: 8, to: 9, distance: 50, direction: Direction.UP }, // H to I
    { from: 9, to: 10, distance: 0, direction: Direction.UP }, // I to boiler
  ]

  const nodesManifest = nodes
    .filter(
      (node) =>
        node.type === NodeType.MEASURE ||
        node.type === NodeType.WALL ||
        node.type === NodeType.VALVE,
    )
    .map((node) => {
      if (node.type === NodeType.MEASURE) {
        return `${node.label}: Meetnippel staal 1"`
      }
      if (node.type === NodeType.WALL) {
        return `${node.label}: Muur 18cm`
      }
      if (node.type === NodeType.VALVE) {
        return `${node.label}: Gaskraan 3/4"`
      }
    })

  const edgesManifest = edgeList
    .filter((edge) => edge.distance > 0)
    .map((edge) => {
      const from = nodes[edge.from]
      const to = nodes[edge.to]
      // make 450 resolve to 4,5m and 50 to 0.5m
      const distance = edge.distance / 100

      return `${from.label}${to.label}: ${distance}m PLT DN25 Gasflexibel`
    })

  const startCoordinates = {
    x: 7 * width,
    y: 10 * height,
  }

  return (
    <div
      className="relative"
      style={{
        width: width * 8,
        height: height * 16,
      }}
    >
      <div className="absolute top-0 right-0 z-10 flex flex-col border bg-white px-2 py-1 font-mono">
        {nodesManifest.map((node) => (
          <div key={node} className="text-xs">
            {node}
          </div>
        ))}
        {edgesManifest.map((connection) => (
          <div key={connection} className="text-xs">
            {connection}
          </div>
        ))}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="isometric-grid absolute h-full w-full bg-white"
      >
        <title>Isometric Grid</title>
        <Grid width={width} height={height} />

        <Legend width={width} height={height} />

        <EdgesAndNodes
          width={width}
          height={height}
          edgeList={edgeList}
          nodes={nodes}
          startCoordinates={startCoordinates}
        />
      </svg>
    </div>
  )
}
