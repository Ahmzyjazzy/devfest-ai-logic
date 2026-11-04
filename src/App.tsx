import { ChatWidget } from './components/ChatWidget'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { getProduct } from './data/catalogue'
import { useProductId } from './lib/route'
import { Home } from './pages/Home'
import { ProductPage } from './pages/ProductPage'

function App() {
  const product = getProduct(useProductId())

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{product ? <ProductPage product={product} /> : <Home />}</main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
