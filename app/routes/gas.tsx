import type { MetaFunction } from '@remix-run/node'
import { Total } from '~/components/gas/total'

export const meta: MetaFunction = () => {
  return [
    { title: 'Huizer' },
    { name: 'description', content: 'Huizer? I hardly know her.' },
  ]
}

export default function Index() {
  return (
    <div className="">
      <Total />
    </div>
  )
}
