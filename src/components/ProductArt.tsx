import { groundFor, type Product } from '../data/catalogue'
import { productIcons } from '../data/icons'

export function ProductArt({ product, className = '' }: { product: Product; className?: string }) {
  const Icon = productIcons[product.icon]
  return (
    <div className={`flex aspect-square items-center justify-center ${groundFor(product)} ${className}`}>
      {Icon && <Icon className="size-1/4 text-brand" />}
    </div>
  )
}
