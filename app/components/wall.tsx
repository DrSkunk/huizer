import type { Wall as WallType } from '~/domain/house'
import { defaults } from '~/domain/house'
import { useMemo, useState } from 'react'
import * as THREE from 'three'

export function Wall({ wall }: { wall: WallType }) {
  const { start, end, thickness } = wall

  const [hovered, setHovered] = useState(false)

  const wallProps = useMemo(() => {
    const length = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2)
    const angle = Math.atan2(end.y - start.y, end.x - start.x)
    // for 3D
    // const position = new THREE.Vector3(
    //   (start.x + end.x) / 2,
    //   (start.y + end.y) / 2,
    //   thickness / 2,
    // )

    return { length, angle }
  }, [start, end, thickness])

  // return svg
  return (
    <g transform={`translate(${start.x},${start.y})`}>
      <line
        x1={0}
        y1={0}
        x2={end.x - start.x}
        y2={end.y - start.y}
        stroke="white"
        strokeWidth={thickness}
      />
      {wall.doors.map((door) => (
        <rect
          key={`door-${door.position}-${door.width}-${door.height}`}
          x={door.position}
          y={-thickness / 2}
          width={door.width ?? defaults.door.width}
          height={thickness}
          fill="brown"
        />
      ))}
      {wall.windows.map((window) => (
        <rect
          key={`window-${window.position.x}-${window.position.y}-${window.width}-${window.height}`}
          x={window.position.x}
          y={-thickness / 2}
          width={window.width ?? defaults.window.width}
          height={thickness}
          fill="blue"
        />
      ))}
    </g>
  )
  // return (
  //   <group>
  //     <mesh
  //       position={wallProps.position}
  //       rotation={[0, 0, wallProps.angle]}
  //       onPointerOver={() => setHovered(true)}
  //       onPointerOut={() => setHovered(false)}
  //     >
  //       <boxGeometry args={[wallProps.length, thickness, thickness]} />
  //       <meshStandardMaterial color={hovered ? 'orange' : 'white'} />
  //     </mesh>
  //   </group>
  // )
}
