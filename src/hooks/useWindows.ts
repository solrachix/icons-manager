import { useState, useEffect } from 'react'
import { windows, schema } from '../store/windows'

type Schema = typeof schema;

export function useWindows<K extends keyof Schema> (key: K): Schema[K]['default'] {
  const defaultValue = windows.get(key, schema[key].default) as Schema[K]['default']
  const [value, setValue] = useState<Schema[K]['default']>(defaultValue)

  useEffect(() => {
    const unsubscribe = windows.onDidChange(key, (newValue) => {
      setValue(newValue as Schema[K]['default'])
    })

    return unsubscribe
  }, [])

  return value
}
