const fs = require('fs')
const path = require('path')

const folderName = 'bold'
const files = fs.readdirSync(`./${folderName}`)

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const indexFile = files.reduce((acc, file) => {
  if (file === 'index.ts') return acc

  const ComponentName = capitalize(file)
    .replace('.svg', '')
    .replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
    .replace(/[^a-z0-9]/gi, '')

  console.log(String(file).replace(/\d+/, ''))

  acc += `export { default as ${ComponentName} } from './${file}'
`

  return acc
}, '')

const iconsPath = path.resolve(__dirname, `${folderName}/index.ts`)
if (fs.existsSync(iconsPath)) {
  const oldIcons = fs.readFileSync(iconsPath).toString('utf8')
  fs.writeFileSync(iconsPath, indexFile)
} else {
  fs.writeFileSync(iconsPath, indexFile)
}

// console.log('Loading', indexFile)
