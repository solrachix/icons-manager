interface IconLib {
  id: string
  isExternal?: boolean
  license?: string
  licenseUrl?: string
  name: string
  projectUrl?: string
  icons: {
    [name: string]: IconType
  }
}
