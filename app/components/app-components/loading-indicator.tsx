import { cn } from '@/lib/utils'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

let ActivityIndicatorRef: any

export const GlobalIndicator = {
  hide: () => {
    ActivityIndicatorRef?.current?.hide()
  },
  show: () => {
    ActivityIndicatorRef?.current?.show()
  },
}

interface LoadingIndicatorProps {
  forceClose?: boolean
}

export default function LoadingIndicator({
  forceClose,
}: LoadingIndicatorProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const initialRef: any = null
  const IndicatorRef = useRef(initialRef)
  /* force close modal */
  useEffect(() => {
    if (forceClose) {
      setIsLoading(false)
    }
  }, [forceClose])

  useLayoutEffect(() => {
    IndicatorRef.current = {
      show: () => {
        !forceClose && setIsLoading(true)
      },

      hide: () => {
        setIsLoading(false)
      },
    }
    ActivityIndicatorRef = IndicatorRef
  }, [forceClose])

  return (
    <div className={cn(isLoading ? 'block' : 'hidden')}>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[99999999999] flex items-center justify-center backdrop-brightness-90">
        <div className="flex gap-2">
          <div className="h-5 w-5 animate-bounce rounded-full bg-main-primary [animation-delay:-0.3s]"></div>
          <div className="h-5 w-5 animate-bounce rounded-full bg-main-primary [animation-delay:-0.15s]"></div>
          <div className="h-5 w-5 animate-bounce rounded-full bg-main-primary"></div>
        </div>
      </div>
    </div>
  )
}
