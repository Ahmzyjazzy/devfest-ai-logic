import { ArrowRightUpIcon } from '@solar-icons/react/outline'
import { store } from '../data/catalogue'

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-24 pt-8 text-sm sm:pb-8 sm:pr-40 text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>{store.name} is a demo store for DevFest Ilorin 2026. Nothing here is for sale.</p>
        <a
          href="https://qorelly.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit shrink-0 items-center whitespace-nowrap gap-1.5 rounded-full bg-brand-pale px-4 py-2 font-medium text-brand hover:bg-brand-tint"
        >
          Get your own store on Qorelly
          <ArrowRightUpIcon className="size-4" />
        </a>
      </div>
    </footer>
  )
}
