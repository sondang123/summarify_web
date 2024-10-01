import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import type { LinksFunction } from '@remix-run/cloudflare'
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
export const loader = () => {
  return {
    ENV: {
      BASE_URL_API: process.env.BASE_URL_API,
    },
  }
}
export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/logo.png" />
        <Meta />
        <Links />
      </head>
      <body className="font-manrope ">
        <QueryProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </QueryProvider>
        <ScrollRestoration />
        <Scripts />
        <AppToast />
        <LoadingIndicator />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data?.ENV)}`,
          }}
        />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
