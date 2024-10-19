import { useOutletContext } from '@remix-run/react'
import type { House } from '~/domain/house'

export function SaveFile() {
  const [house] = useOutletContext() as [House]

  async function onClick() {
    const blob = new Blob([JSON.stringify(house)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'house.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      type="button"
      className="rounded bg-white px-2 py-1 font-semibold text-gray-900 text-sm shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      onClick={onClick}
    >
      Save House file
    </button>
  )
}
