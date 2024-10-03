import { FrequentlyAskedQuestion } from '@/components/feature/frequently-asked-question'
import { HowItWorks } from '@/components/feature/how-it-work'
import { InputSummary } from '@/components/feature/input-summary'
import { SummaryDemo } from '@/components/feature/summary_demo/section_summary_demo'
import { VideoSummaries } from '@/components/feature/video-summaries'
import { setToken } from '@/helper/helper-token'

import { useEffect } from 'react'

// Add this import
import { useNavigate, useSearchParams } from '@remix-run/react'

export default function HomePage() {
  // Replace useLoaderData with useSearchParams
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      setToken(token)
      // Remove token from URL after setting it
      navigate('/', { replace: true })
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [searchParams, navigate])

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
