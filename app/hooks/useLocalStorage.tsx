import { useState, useEffect } from 'react'
import { defaultHouse, HouseSchema, type House } from '~/domain/house'
import { z } from 'zod'

export function useLocalStorage() {
  const [house, setHouse] = useState<null | House>(null)

  useEffect(() => {
    const storedHouse = localStorage.getItem('house')
    if (storedHouse) {
      try {
        const loadedHouse = JSON.parse(storedHouse)
        // check if it matches with zod
        const parsedHouse = z.object({
          name: z.string(),
          rooms: z.array(
            z.object({
              name: z.string(),
              width: z.number(),
              length: z.number(),
              windows: z.number(),
              doors: z.number(),
              color: z.string(),
            }),
          ),
        })
        const result = HouseSchema.parse(loadedHouse)
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
