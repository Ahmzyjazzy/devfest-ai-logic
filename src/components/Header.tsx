export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="/" aria-label="Qorelly Store home">
          <img src="/brand/qorelly-lockup.svg" alt="Qorelly" className="h-7 w-auto" />
        </a>
        <span className="text-sm font-medium text-neutral-500">Store · Ilorin</span>
      </div>
    </header>
  )
}
