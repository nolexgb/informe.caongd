import Header from './Header'
import Footer from './Footer'

export default function PageShell({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  )
}
