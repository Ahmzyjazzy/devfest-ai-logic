import { store } from '../data/catalogue'

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-neutral-500 sm:flex-row sm:justify-between">
        <p>{store.name} is a demo store for DevFest Ilorin 2026. Nothing here is for sale.</p>
        <p>Built with Firebase AI Logic</p>
      </div>
    </footer>
  )
}
