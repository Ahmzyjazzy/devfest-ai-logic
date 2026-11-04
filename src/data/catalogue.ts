import catalogue from './catalogue.json'

export type Product = (typeof catalogue.products)[number]

export const store = catalogue.store
export const products: Product[] = catalogue.products

export function getProduct(id: string | null | undefined): Product | undefined {
  return products.find((product) => product.id === id)
}

// One pale brand ground per category, so each illustration sits on its own colour.
const grounds: Record<string, string> = {
  Fashion: 'bg-violet-pale',
  Gifts: 'bg-coral-pale',
  Wellness: 'bg-yellow-pale',
  Health: 'bg-brand-pale',
  Home: 'bg-neutral-100',
}

export function groundFor(product: Product): string {
  return grounds[product.category] ?? 'bg-neutral-100'
}
