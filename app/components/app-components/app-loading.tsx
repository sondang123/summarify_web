import { loadingAnimation } from '@/const/animation'
import React, { Suspense } from 'react'
const LottiePlayer = React.lazy(() => import('react-lottie-player'))
export const AppLoading: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LottiePlayer
        loop
        animationData={loadingAnimation}
        play
        style={{ width: 150, height: 100 }}
      />
    </Suspense>
  )
}
