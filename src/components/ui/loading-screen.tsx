import { useState, useEffect } from 'react'
import Software_Engine_svg from '../../assets/icon/Software_Engine_svg.svg'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [isFilling, setIsFilling] = useState(false)

  useEffect(() => {
    // trigger fill animation shortly after mount
    const startFill = setTimeout(() => setIsFilling(true), 50)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)
    return () => {
      clearTimeout(startFill)
      clearTimeout(timer)
      clearTimeout(fadeOutTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-700 ease-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <img
            src={Software_Engine_svg}
            alt="Loading"
            className="w-16 h-16 dark:invert opacity-80"
          />
          <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full" />
        </div>
        <span className="text-xl font-bold gradient-text tracking-tight">
          Hanar.
        </span>
        <div className="w-32 h-0.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
            style={{ width: isFilling ? '100%' : '0%' }}
          />
        </div>
      </div>
    </div>
  )
}
