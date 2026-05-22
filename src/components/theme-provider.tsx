import { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative h-9 w-9 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
      aria-label="Toggle theme"
    >
      <span className="text-lg dark:hidden">☀️</span>
      <span className="text-lg hidden dark:inline">🌙</span>
    </button>
  )
}

export { ThemeToggle }

export function ThemeProvider({ 
  children, 
  defaultTheme = 'light', 
  enableSystem = true, 
  disableTransitionOnChange = false 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  )
}