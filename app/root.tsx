import type { LinksFunction } from '@remix-run/cloudflare'

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { AppToast } from './components/app-components/app-toast'
import LoadingIndicator from './components/app-components/loading-indicator'
import DefaultLayout from './layout/default-layout'
import QueryProvider from './providers/query-provider'
import tailwind from './tailwind.css?url'
import 'react-toastify/dist/ReactToastify.css'
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwind },

    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },

    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: 'logo.png',
    },
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/logo.png" />
        <Meta />
        <Links />
      </head>
      <body className="font-manrope">
        {children}
        <ScrollRestoration />
        <Scripts />
        <AppToast />
        <LoadingIndicator />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <QueryProvider>
      <Layout>
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      </Layout>
    </QueryProvider>
  )
}
