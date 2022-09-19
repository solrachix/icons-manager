import * as iconlyGlass from './IconlyGlass'
import * as iconsax from './Vuesax'

export const IconlyGlass: IconLib = {
  id: 'external-1',
  new: true,
  isExternal: true,
  name: 'Iconly Glass',
  icons: iconlyGlass,
  projectUrl: 'https://piqodesign.gumroad.com/l/iconlyglass'
}

export const Iconsax: IconLib = {
  id: 'external-1',
  new: true,
  isExternal: true,
  name: 'Iconsax',
  icons: {},
  projectUrl: 'https://iconsax.io/',
  variants: [
    {
      name: 'Linear',
      icons: iconsax.LinearIcons,
      className: 'stroke-icon-color'
    },
    {
      name: 'Bold',
      icons: iconsax.BoldIcons,
      className: 'fill-icon-color'
    }
  ]
}
