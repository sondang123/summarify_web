import loadingAnimation from '../../../public/animation/loading.json'
import type React from 'react'
import { Suspense, lazy, useEffect, useState } from 'react'

const Lottie = lazy(() => import('lottie-react'))

const LottieAnimation: React.FC = () => (
  <Lottie
    animationData={loadingAnimation}
    loop
    autoplay
    style={{ width: 150, height: 100 }}
  />
)

export const AppLoading: React.FC = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isClient ? <LottieAnimation /> : null}
    </Suspense>
  )
}
