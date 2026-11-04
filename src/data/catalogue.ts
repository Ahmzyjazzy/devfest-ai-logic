import catalogue from './catalogue.json'

export type Product = (typeof catalogue.products)[number]

export const store = catalogue.store
export const products: Product[] = catalogue.products

export function getProduct(id: string | null | undefined): Product | undefined {
  return products.find((product) => product.id === id)
}

// One pale brand ground per category, so each product sits on its own colour.
const grounds: Record<string, string> = {
  Power: 'bg-yellow-pale',
  Audio: 'bg-brand-pale',
  Photo: 'bg-violet-pale',
  Accessories: 'bg-neutral-100',
  Merch: 'bg-coral-pale',
}

export function groundFor(product: Product): string {
  return grounds[product.category] ?? 'bg-neutral-100'
}
