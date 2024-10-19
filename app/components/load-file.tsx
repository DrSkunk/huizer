import { useOutletContext } from '@remix-run/react'
import { parseHouseSchema } from '~/domain/house'
import type { House } from '~/domain/house'

const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Error reading file'))
    reader.readAsText(file)
  })
}

export function LoadFile() {
  const [, setHouse] = useOutletContext() as [
    House,
    React.Dispatch<React.SetStateAction<House>>,
  ]

  async function load(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    try {
      const contents = await readFileAsText(file)
      const house = parseHouseSchema(JSON.parse(contents))
      setHouse(house)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <label htmlFor="load-file">
      <span className="block cursor-pointer rounded bg-white px-2 py-1 font-semibold text-gray-900 text-sm shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
        Load House file
      </span>
      <input type="file" className="hidden" id="load-file" onChange={load} />
    </label>
  )
}
