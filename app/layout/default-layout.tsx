import { Footer } from '@/components/feature/footer'
import { Header } from '@/components/feature/header'
import { useLocation } from '@remix-run/react'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const location = useLocation()

  return (
    <section>
      {location?.pathname === '/' ? (
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      ) : (
        <div> {children}</div>
      )}
    </section>
  )
}
