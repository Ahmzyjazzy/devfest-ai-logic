import { ArrowLeftIcon } from '@solar-icons/react/outline'
import { Link } from '../components/Link'
import { groundFor, store, type Product } from '../data/catalogue'
import { formatNaira } from '../lib/money'

export function ProductPage({ product }: { product: Product }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-ink">
        <ArrowLeftIcon className="size-4" />
        All products
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className={`aspect-square rounded-[18px] ${groundFor(product)}`}>
          <img src={product.image} alt="" className="h-full w-full object-contain p-12" />
        </div>

        <div>
          <p className="text-sm font-medium text-neutral-500">{product.category}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink">{product.name}</h1>
          <p className="mt-3 text-2xl font-semibold tabular-nums text-ink">{formatNaira(product.price)}</p>
          <p className="mt-5 text-slate">{product.description}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm">
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[14px] bg-neutral-100 p-5 text-sm">
            <h2 className="font-medium text-ink">Delivery and returns</h2>
            <ul className="mt-2 space-y-1 text-neutral-600">
              {[...store.delivery, store.returns[0]].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
