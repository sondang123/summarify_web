import { loadingAnimation } from '@/const/animation'
import Lottie from 'react-lottie-player'
export const AppLoading: React.FC = () => {
  return (
    <Lottie
      loop
      animationData={loadingAnimation}
      play
      style={{ width: 150, height: 100 }}
    />
  )
}
