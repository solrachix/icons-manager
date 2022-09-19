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

  variants?: IconLibVariant[]
}

interface IconLibVariant {
  name: string
  icons: {
    [name: string]: IconType
  }
  className?: string
}
