import { FrequentlyAskedQuestion } from '@/components/feature/frequently-asked-question'
import { HowItWorks } from '@/components/feature/how-it-work'
import { InputSummary } from '@/components/feature/input-summary'
import { SummaryDemo } from '@/components/feature/summary_demo/section_summary_demo'
import { VideoSummaries } from '@/components/feature/video-summaries'
import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-main-background  bg-contain bg-top bg-no-repeat pt-28 bg-[url('./assets/images/bg-home.svg')]">
      <div className="container">
        <p className="typo-s48-w800 text-center text-neutral-0">
          Summarize videos & create quiz
        </p>
        <p className="typo-s18-w500 text-center text-neutral-1">
          Take notes from YouTube videos and other supported File easily.
        </p>
        <InputSummary />
        {/* <SummaryDemo /> */}
        <VideoSummaries />
        <HowItWorks />
        <FrequentlyAskedQuestion />
      </div>
    </main>
  )
}

export default HomePage
