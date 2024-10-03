// import { loadingAnimation } from '@/const/animation'
// import type React from 'react'
// import { Suspense, lazy } from 'react'

// const Lottie = lazy(() => import('lottie-react'))

// const LottieAnimation: React.FC = () => (
//   <Lottie
//     animationData={loadingAnimation}
//     loop
//     autoplay
//     style={{ width: 150, height: 100 }}
//   />
// )

// export const AppLoading: React.FC = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <LottieAnimation />
//     </Suspense>
//   )
// }

export const AppLoading: React.FC = () => {
  return <div>loading</div>
}
