// Writes firebase/catalogue.txt from src/data/catalogue.json.
// The support agent reads that file from Cloud Storage, so run
// `npm run catalogue` and upload it again whenever the products change.
import { readFileSync, writeFileSync } from 'node:fs'

const { store, products } = JSON.parse(readFileSync('src/data/catalogue.json', 'utf8'))
const naira = (amount) => `₦${amount.toLocaleString('en-NG')}`
const list = (lines) => lines.map((line) => `- ${line}`).join('\n')

const text = `# ${store.name} catalogue

${store.name} is an online shop in ${store.city}, Nigeria.

## Delivery
${list(store.delivery)}

## Returns and refunds
${list(store.returns)}

## Payment
${list(store.payment)}

## Products
${products
  .map(
    (product) => `
### ${product.name}
- ID: ${product.id}
- Category: ${product.category}
- Price: ${naira(product.price)}
- Summary: ${product.summary}
- Description: ${product.description}
- Features: ${product.features.join('; ')}`,
  )
  .join('\n')}
`

writeFileSync('firebase/catalogue.txt', text)
console.log(`Wrote firebase/catalogue.txt (${products.length} products)`)
