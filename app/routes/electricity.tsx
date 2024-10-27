import type { MetaFunction } from '@remix-run/node'
import { useOutletContext } from '@remix-run/react'
import { Total } from '~/components/electricity/total'

export const meta: MetaFunction = () => {
  return [
    { title: 'Huizer' },
    { name: 'description', content: 'Huizer? I hardly know her.' },
  ]
}

export default function Index() {
  // const [electricity, setElectricity] = useOutletContext() as [
  //   Electricity,
  //   React.Dispatch<React.SetStateAction<Electricity>>,
  // ]

  const electricity = {
    configuration: {
      rows: 4,
      modulesPerRow: 18,
    },
    rows: [
      [
        {
          type: 'differential',
          phase: ['L3', 'N'],
          rating: 30, // mA
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L3', 'N'],
          rating: 20, //A
          group: 'A',
          description: 'Wasmachine L',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L3', 'N'],
          rating: 20,
          group: 'B',
          description: 'Oude zekering A',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L3', 'N'],
          rating: 20,
          group: 'C',
          description: 'Oude zekering G',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L3', 'N'],
          rating: 20,
          group: 'D',
          description: 'Oude zekering J',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L3', 'N'],
          rating: 16,
          group: 'E',
          description: 'Verlichting kelder N/O',
          width: 2,
        },
      ],
      [
        {
          type: 'differential',
          phase: ['L2', 'N'],
          rating: 30, // mA
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L2', 'N'],
          rating: 20, //A
          group: 'F',
          description: 'Droogkast M',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L2', 'N'],
          rating: 20,
          group: 'G',
          description: 'Oude zekering C',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L2', 'N'],
          rating: 20,
          group: 'H',
          description: 'Oude zekering E',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L2', 'N'],
          rating: 20,
          group: 'I',
          description: 'Oude zekering K',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L1', 'N'],
          rating: 16,
          group: 'J',
          description: 'Stopcontact kelder',
          width: 2,
        },
      ],
      [
        {
          type: 'differential',
          phase: ['L1', 'N'],
          rating: 30, // mA
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L1', 'N'],
          rating: 20, //A
          group: 'K',
          description: 'Vaatwasser I',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L1', 'N'],
          rating: 20,
          group: 'L',
          description: 'Quooker',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L1', 'N'],
          rating: 16,
          group: 'M',
          description: 'Oude zekering F + B',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L1', 'N'],
          rating: 20,
          group: 'N',
          description: 'Oude zekering H',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L1', 'N'],
          rating: 20,
          group: 'O',
          description: "PC's",
          width: 2,
        },
      ],
      [
        {
          type: 'fuse',
          phase: ['L1', 'N'],
          rating: 20,
          group: 'P',
          description: 'Koelkast, microgolf',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L2', 'N'],
          rating: 20,
          group: 'Q',
          description: 'Oven',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L3', 'N'],
          rating: 20,
          group: 'R',
          description: 'CV',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L1', 'N'],
          rating: 20,
          group: 'S',
          description: 'Airco',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L1', 'N'],
          rating: 20,
          group: 'T',
          description: 'Boiler',
          width: 2,
        },
        {
          type: 'fuse',
          phase: ['L1', 'L2', 'L3', 'N'],
          rating: 20,
          group: 'U',
          description: 'Kookvuur',
          width: 4,
        },
        {
          type: 'differential',
          phase: ['L1', 'L2', 'L3', 'N'],
          rating: 300,
          width: 4,
        },
      ],
    ],
  }

  return (
    <div className="">
      <Total electricity={electricity} />
    </div>
  )
}
