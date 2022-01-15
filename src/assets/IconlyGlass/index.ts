import fs from 'fs'

const icons = fs.readdirSync('./src/assets/IconlyGlass')

export default async function () {
  const importIcons: { [icon: string]: React.ReactNode } = {}
  for await (const icon of icons) {
    const iconName = icon.replace('.svg', '')
    if (icon.includes('.svg')) {
      importIcons[iconName] = await (await import(`./${iconName}.svg`)).default
    }
  }

  return {
    id: 'external-1',
    isExternal: true,
    name: 'Iconly Glass',
    icons: importIcons,
    projectUrl: 'https://piqodesign.gumroad.com/l/iconlyglass'
  }
}
