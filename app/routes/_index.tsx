import { FrequentlyAskedQuestion } from '@/components/feature/frequently-asked-question'
import { HowItWorks } from '@/components/feature/how-it-work'
import { InputSummary } from '@/components/feature/input-summary'
import { SummaryDemo } from '@/components/feature/summary_demo/section_summary_demo'
import { VideoSummaries } from '@/components/feature/video-summaries'
import { setToken } from '@/helper/helper-token'

import { type LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { useEffect } from 'react'

// Add this type for the loader data
type LoaderData = {
  token: string | null
}

// Add this loader function
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')

  return json<LoaderData>({ token })
}

const HomePage = () => {
  const { token } = useLoaderData<LoaderData>()

  useEffect(() => {
    if (token) {
      setToken(token)
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [token])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-main-background  bg-contain bg-top bg-no-repeat pt-28 bg-[url('./assets/images/bg-home.svg')]">
      <div className="container">
        <InputSummary />
        <SummaryDemo />
        <VideoSummaries />
        <HowItWorks />
        <FrequentlyAskedQuestion />
      </div>
    </main>
  )
}

export default HomePage
