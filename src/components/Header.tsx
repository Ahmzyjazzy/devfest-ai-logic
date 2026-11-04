import { Link } from './Link'

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label="DevFest Store home" className="flex items-center gap-3">
          <img src="/brand/qorelly-lockup.svg" alt="Qorelly" className="h-7 w-auto" />
          <span className="h-5 w-px bg-neutral-300" aria-hidden />
          <img src="/brand/gdg-icon.svg" alt="" className="h-5 w-auto" />
          <span className="-ml-1 font-semibold text-ink">DevFest Store</span>
        </Link>
        <span className="hidden text-sm font-medium text-neutral-500 sm:inline">DevFest Ilorin 2026</span>
      </div>
    </header>
  )
}
