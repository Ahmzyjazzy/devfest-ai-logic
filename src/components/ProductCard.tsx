import type { Product } from '../data/catalogue'
import { formatNaira } from '../lib/money'
import { Link } from './Link'
import { ProductArt } from './ProductArt'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/?product=${product.id}`}
      className="group block rounded-[14px] border border-neutral-200 bg-white p-3 transition-colors hover:border-brand-tint"
    >
      <ProductArt product={product} className="rounded-xl transition-colors group-hover:brightness-[0.98]" />
      <div className="px-1 pb-1 pt-3">
        <p className="text-xs font-medium text-neutral-500">{product.category}</p>
        <h3 className="mt-0.5 font-medium text-ink">{product.name}</h3>
        <p className="mt-1 text-sm text-neutral-600">{product.summary}</p>
        <p className="mt-3 font-semibold tabular-nums text-ink">{formatNaira(product.price)}</p>
      </div>
    </Link>
  )
}
