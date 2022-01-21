interface IconLib {
  id: string
  new?: boolean
  isExternal?: boolean
  license?: string
  licenseUrl?: string
  name: string
  projectUrl?: string
  icons: {
    [name: string]: IconType
  }
}
