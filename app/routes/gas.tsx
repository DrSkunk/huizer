import type { MetaFunction } from '@remix-run/node'
import { Grid } from '~/components/gas/grid'

export const meta: MetaFunction = () => {
  return [
    { title: 'Huizer' },
    { name: 'description', content: 'Huizer? I hardly know her.' },
  ]
}

export default function Index() {
  return (
    <div className="">
      <Grid />
    </div>
  )
}
