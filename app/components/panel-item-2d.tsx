import type { PanelItem } from '~/domain/house'
import { Outlet } from './symbols/outlet'

export function PanelItem2D({ panelItem }: { panelItem: PanelItem }) {
  switch (panelItem.type) {
    case 'outlet':
      // return <rect x={0} y={0} width={10} height={10} fill="blue" />
      return <Outlet />
    case 'light-switch':
      return <rect x={0} y={0} width={10} height={10} fill="yellow" />
  }
}
