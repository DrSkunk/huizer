import type { MetaFunction } from '@remix-run/node'
import { useOutletContext } from '@remix-run/react'
import { LoadFile } from '~/components/load-file'
import { Map2d } from '~/components/map-2d/map-2d'
import { SaveFile } from '~/components/save-file'
import type { House } from '~/domain/house'

export const meta: MetaFunction = () => {
  return [
    { title: 'Huizer' },
    { name: 'description', content: 'Huizer? I hardly know her.' },
  ]
}

export default function Index() {
  const [house] = useOutletContext() as [
    House,
    React.Dispatch<React.SetStateAction<House>>,
  ]

  if (house === null) {
    return <div>Loading...</div>
  }

  console.log('house', house)

  return (
    <div className="h-screen w-screen">
      <div className="flex gap-4">
        <LoadFile />
        <SaveFile />
      </div>
      <Map2d house={house} />
    </div>
  )
}
