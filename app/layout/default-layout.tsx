import { Footer } from '@/components/feature/footer'
import { Header } from '@/components/feature/header'
import { useLocation } from '@remix-run/react'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = useLocation()

  return (
    <section>
      {pathname?.pathname === '/' ? (
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
