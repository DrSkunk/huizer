import type { Layout } from '~/domain/layout'
import { Wall2D } from './wall-2d'
import { useMemo } from 'react'

export function Map2d({ layout }: { layout: Layout }) {
  const viewBox = useMemo(() => {
    // offset with 50cm to make sure the walls are visible
    const offset = 50

    // get the minimum and maximum x and y values of the walls of all floors, considering both start and end points
    const allPoints = layout.floors.flatMap((floor) =>
      floor.walls.flatMap((wall) => [wall.start, wall.end]),
    )

    const minX = Math.min(...allPoints.map((point) => point.x)) - offset
    const minY = Math.min(...allPoints.map((point) => point.y)) - offset
    const maxX = Math.max(...allPoints.map((point) => point.x)) + 2 * offset
    const maxY = Math.max(...allPoints.map((point) => point.y)) + 2 * offset

    return `${minX} ${minY} ${maxX} ${maxY}`
  }, [layout])

  return (
    <svg
      width="100%"
      height="100%"
      role="img"
      aria-label="Huizer"
      className="bg-gray-200"
      viewBox={viewBox}
    >
      {layout.floors[0].walls.map((wall) => (
        <Wall2D
          key={`${wall.start.x}-${wall.start.y}-${wall.end.x}-${wall.end.y}`}
          wall={wall}
        />
      ))}
      1
    </svg>
  )
}
