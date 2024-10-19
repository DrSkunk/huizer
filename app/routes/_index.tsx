import type { MetaFunction } from '@remix-run/node'
import { Map2d } from '~/components/map-2d'
import { useLocalStorage } from '~/hooks/useLocalStorage'

export const meta: MetaFunction = () => {
  return [
    { title: 'Huizer' },
    { name: 'description', content: 'Huizer? I hardly know her.' },
  ]
}

export default function Index() {
  const { house } = useLocalStorage()

  if (house === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen w-screen">
      <Map2d house={house} />
    </div>
  )
}
