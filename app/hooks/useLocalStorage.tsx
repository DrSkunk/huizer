import { useState, useEffect } from 'react'
import { defaultHouse, parseHouseSchema, type House } from '~/domain/house'

export function useLocalStorage() {
  const [house, setHouse] = useState<null | House>(null)

  useEffect(() => {
    const storedHouse = localStorage.getItem('house')
    if (storedHouse) {
      try {
        const loadedHouse = JSON.parse(storedHouse)
        const result = parseHouseSchema(loadedHouse)
        setHouse(result)

        return
      } catch (e) {
        console.error('Error parsing stored house:', e)
      }
    }
    setHouse(defaultHouse)
  }, [])

  useEffect(() => {
    if (house) {
      localStorage.setItem('house', JSON.stringify(house))
    }
  }, [house])

  return { house, setHouse }
}
