import type { MetaFunction } from '@remix-run/node'
import type { House } from '~/domain/house'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'

import { Map2d } from '~/components/map-2d'

export const meta: MetaFunction = () => {
  return [
    { title: 'Huizer' },
    { name: 'description', content: 'Huizer? I hardly know her.' },
  ]
}

export default function Index() {
  const house: House = {
    floors: [
      {
        name: 'Ground floor',
        walls: [
          {
            start: { x: 0, y: 0 },
            end: { x: 1300, y: 0 },
            thickness: 30,
            doors: [
              {
                position: 10,
              },
            ],
            windows: [
              {
                position: { x: 500, y: 0 },
                width: 200,
                height: 100,
              },
            ],
          },
          {
            start: { x: 1300, y: 0 },
            end: { x: 1300, y: 1000 },
            thickness: 30,
            doors: [],
            windows: [],
          },
          {
            start: { x: 1300, y: 1000 },
            end: { x: 0, y: 1000 },
            thickness: 30,
            doors: [],
            windows: [],
          },
          {
            start: { x: 0, y: 1000 },
            end: { x: 0, y: 0 },
            thickness: 30,
            doors: [],
            windows: [],
          },
        ],
      },
    ],
  }

  // return <div className="flex h-screen items-center justify-center">hoi</div>
  return (
    <div className="h-screen w-screen">
      <Map2d house={house} />
      {/* <Canvas>
        <color attach="background" args={[0.9, 0.9, 0.9]} />
        <ambientLight intensity={Math.PI / 2} />
        {house.floors[0].walls.map((wall) => (
          <Wall
            key={`${wall.start.x}-${wall.start.y}-${wall.end.x}-${wall.end.y}`}
            wall={wall}
          />
        ))}
        <OrbitControls />
        <Stats />
      </Canvas> */}
    </div>
  )
}
