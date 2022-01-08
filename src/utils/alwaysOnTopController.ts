import { config } from '../store/config'

export const getAlwaysOnTop = function (): boolean {
  return config.get('alwaysOnTop') as boolean
}

export const setAlwaysOnTop = function (prop: boolean): void{
  config.set('alwaysOnTop', prop)
}
