import { useState, useEffect } from 'react'
import Software_Engine_svg from '../../assets/icon/Software_Engine_svg.svg'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearTimeout(fadeOutTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <img 
          src={Software_Engine_svg} 
          alt="Loading" 
          className="w-20 h-20 animate-pulse dark:invert" 
        />
        <span className="text-lg font-medium text-muted-foreground  text-xl font-bold gradient-text flex items-center gap-2">Hanar.</span>
      </div>
    </div>
  )
}