import { DeliveryIcon } from '@solar-icons/react/outline'
import { ProductCard } from '../components/ProductCard'
import { products, store } from '../data/catalogue'

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-neutral-200 bg-brand-pale">
        <div className="mx-auto max-w-6xl px-4 pt-14 sm:pt-20 lg:pb-28">
          <p className="text-sm font-medium text-brand">{store.name} · {store.city}</p>
          <h1 className="mt-3 max-w-2xl font-ciscela text-4xl font-normal text-ink sm:text-6xl">
            Gadgets for DevFest Ilorin, ready at the booth
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate">
            Power banks, earbuds, selfie sticks and merch. Ask the {store.assistant} anything about
            an item, delivery or returns.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink">
            <DeliveryIcon className="size-5 text-brand" />
            {store.delivery[0]}
          </p>
          {/* Ilorin Innovation Hub, home of DevFest Ilorin (from devfestilorin.com) */}
          <img
            src="/brand/ilorin-innovation-hub.svg"
            alt="Ilorin Innovation Hub"
            className="mt-10 ml-auto block w-full max-w-4xl lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[52%]"
          />
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
