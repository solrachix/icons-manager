import { useState, useEffect } from 'react'
import { config, schema } from '../store/config'

type Schema = typeof schema;

export function useConfig<K extends keyof Schema> (key: K): [ Schema[K]['default'], React.Dispatch<React.SetStateAction<unknown>>] {
  const defaultValue = config.get(key, schema[key].default) as Schema[K]['default']
  const [value, setValue] = useState<Schema[K]['default']>(defaultValue)

  useEffect(() => {
    config.set(key, value)
  }, [key, value])

  useEffect(() => {
    const unsubscribe = config.onDidChange(key, (newValue) => {
      setValue(newValue as Schema[K]['default'])
    })

    return unsubscribe
  }, [])

  return [value, setValue]
}
