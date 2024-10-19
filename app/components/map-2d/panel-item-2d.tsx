import { defaults, PanelItemType, type PanelItem } from '~/domain/house'
import { Outlet } from './symbols/outlet'

export function PanelItem2D({ panelItem }: { panelItem: PanelItem }) {
  switch (panelItem.type) {
    case PanelItemType.OUTLET: {
      let amount = panelItem.amount || defaults.outlet.amount
      return <Outlet amount={amount} />
    }
    case 'light-switch': {
      return <rect x={0} y={0} width={10} height={10} fill="yellow" />
    }
  }
}
