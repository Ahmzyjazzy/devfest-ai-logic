import { useEffect, useState } from 'react'

// The store has two pages, so routing is just the ?product= query parameter.
// The support agent links to products the same way: /?product=PRODUCT_ID
function readProductId(): string | null {
  return new URLSearchParams(window.location.search).get('product')
}

export function useProductId(): string | null {
  const [productId, setProductId] = useState(readProductId)

  useEffect(() => {
    const onChange = () => setProductId(readProductId())
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  return productId
}

export function navigate(href: string) {
  window.history.pushState(null, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0 })
}
