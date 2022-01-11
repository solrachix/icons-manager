interface IconLib {
  id: string
  license: string
  licenseUrl: string
  name: string
  projectUrl: string
  icons: {
    [name: string]: IconType
  }
}
