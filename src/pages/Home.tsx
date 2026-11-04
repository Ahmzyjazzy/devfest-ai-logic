import { DeliveryIcon } from '@solar-icons/react/outline'
import { ProductCard } from '../components/ProductCard'
import { products, store } from '../data/catalogue'

export function Home() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-brand-pale">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="text-sm font-medium text-brand">{store.name} · {store.city}</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Everyday goods, delivered across Ilorin today
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate">
            Fashion, gifts, home and wellness from local makers. Ask our assistant anything about an
            item, delivery or returns.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink">
            <DeliveryIcon className="size-5 text-brand" />
            {store.delivery[0]}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-semibold text-ink">All products</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
