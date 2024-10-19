import { useState, useEffect } from 'react'
import { Orientation, PanelItemType, Side, type House } from '~/domain/house'

export function useLocalStorage() {
  const [house, setHouse] = useState<null | House>(null)

  useEffect(() => {
    const storedHouse = localStorage.getItem('house')
    if (storedHouse) {
      setHouse(JSON.parse(storedHouse))
    } else {
      setHouse({
        floors: [
          {
            name: 'Ground floor',
            walls: [
              {
                start: { x: 0, y: 0 },
                end: { x: 1000, y: 0 },
                thickness: 30,
                doors: [
                  {
                    position: 100,
                    width: 100,
                  },
                ],
                windows: [
                  {
                    position: { x: 220, z: 0 },
                    height: 220,
                    width: 120,
                  },
                  {
                    position: { x: 527, z: 0 },
                    height: 220,
                    width: 270,
                  },
                ],
                panels: [
                  {
                    position: { x: 400, y: 0 },
                    orientation: Orientation.VERTICAL,
                    side: Side.RIGHT,
                    items: [
                      {
                        ID: '1',
                        type: PanelItemType.OUTLET,
                        amount: 5,
                      },
                      {
                        ID: '2',
                        type: PanelItemType.OUTLET,
                        amount: 2,
                      },
                    ],
                  },
                ],
              },
              {
                start: { x: 1000, y: 0 },
                end: { x: 1000, y: 1000 },
                thickness: 30,
                doors: [],
                windows: [],
                panels: [],
              },
              {
                start: { x: 1000, y: 1000 },
                end: { x: 0, y: 1000 },
                thickness: 30,
                doors: [],
                windows: [],
                panels: [],
              },
              {
                start: { x: 0, y: 1000 },
                end: { x: 0, y: 0 },
                thickness: 30,
                doors: [],
                windows: [],
                panels: [],
              },
              {
                start: { x: 500, y: 0 },
                end: { x: 600, y: 1000 },
                thickness: 9,
                doors: [
                  {
                    position: 100,
                  },
                ],
                windows: [
                  {
                    position: { x: 220, z: 0 },
                    height: 220,
                    width: 120,
                  },
                  {
                    position: { x: 527, z: 0 },
                    height: 220,
                    width: 270,
                  },
                ],
                panels: [
                  {
                    position: { x: 500, y: 0 },
                    orientation: Orientation.VERTICAL,
                    side: Side.LEFT,
                    items: [
                      {
                        ID: '1',
                        type: PanelItemType.OUTLET,
                        amount: 5,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      })
    }
  }, [])

  useEffect(() => {
    if (house) {
      localStorage.setItem('house', JSON.stringify(house))
    }
  }, [house])

  return { house, setHouse }
}
