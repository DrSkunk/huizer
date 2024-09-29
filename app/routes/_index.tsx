import type { MetaFunction } from '@remix-run/node'
import { Orientation, PanelItemType, Side, type House } from '~/domain/house'
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
            end: { x: 800, y: 800 },
            thickness: 30,
            doors: [
              // {
              //   position: 10,
              // },
            ],
            windows: [
              // {
              //   position: { x: 500, z: 0 },
              //   width: 200,
              //   height: 100,
              // },
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
                  },
                  {
                    ID: '2',
                    type: PanelItemType.OUTLET,
                  },
                ],
              },
              {
                position: { x: 500, y: 0 },
                orientation: Orientation.VERTICAL,
                side: Side.RIGHT,
                items: [
                  {
                    ID: '2',
                    type: PanelItemType.OUTLET,
                  },
                  {
                    ID: '3',
                    type: PanelItemType.OUTLET,
                  },
                ],
              },
            ],
          },
          {
            start: { x: 800, y: 0 },
            end: { x: 800, y: 800 },
            thickness: 30,
            doors: [],
            windows: [],
            panels: [],
          },
          {
            start: { x: 800, y: 800 },
            end: { x: 0, y: 800 },
            thickness: 30,
            doors: [],
            windows: [],
            panels: [],
          },
          {
            start: { x: 0, y: 800 },
            end: { x: 0, y: 0 },
            thickness: 30,
            doors: [],
            windows: [],
            panels: [],
          },
        ],
      },
    ],
  }

  return (
    <div className="h-screen w-screen">
      <Map2d house={house} />
    </div>
  )
}
