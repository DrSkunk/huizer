import type { PanelItem } from '~/domain/house'

export function PanelItem2D({ panelItem }: { panelItem: PanelItem }) {
  switch (panelItem.type) {
    case 'outlet':
      return <rect x={0} y={0} width={10} height={10} fill="blue" />
    case 'light-switch':
      return <rect x={0} y={0} width={10} height={10} fill="yellow" />
  }
}
