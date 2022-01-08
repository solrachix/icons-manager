import Store from 'electron-store'
import { JSONSchemaType } from 'json-schema-typed'

export const schema = {
  user: {
    type: JSONSchemaType.Object,
    default: {
      Logged: false,
      token: null,
      data: null
    }
  },

  useMacOSWindowActionButtons: {
    type: JSONSchemaType.Boolean,
    default: false
  },
  windowBounds: {
    type: JSONSchemaType.Object,
    default: {
      width: 1100,
      minWidth: 1000,
      minHeight: 600,
      height: 700
    }
  },
  alwaysOnTop: {
    type: JSONSchemaType.Boolean,
    default: true
  }
}

export const config = new Store({
  schema,
  watch: true
})
