import type { MetaFunction } from '@remix-run/node'
import { useOutletContext } from '@remix-run/react'
import { Total } from '~/components/gas/total'
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

  return (
    <div className="">
      <Total gas={house.gas} />
    </div>
  )
}
