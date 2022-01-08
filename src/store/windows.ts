import Store from 'electron-store'
import { JSONSchemaType } from 'json-schema-typed'

export const schema = {
  windows: {
    type: JSONSchemaType.Array,
    default: [
      {
        id: 0,
        title: '',
        width: 1100,
        minWidth: 1000,
        minHeight: 600,
        height: 700,
        webContentsID: 0
      }
    ]
  }
}

export const windows = new Store({
  schema,
  watch: true
})

console.log(windows.path)
