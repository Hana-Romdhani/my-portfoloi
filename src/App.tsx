import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './components/ui/theme-provider'
import { Navigation } from './components/navigation'
import { HeroSection } from './components/hero-section'
import { AboutSection } from './components/about-section'
import { ProjectsSection } from './components/projects-section'
import { EducationSection } from './components/Path-section'
import { SkillsSection } from './components/skills-section'
import { ContactSection } from './components/contact-section'
import { Footer } from './components/footer'
import { ParticlesBackground } from './components/ui/particles-background'
import { CursorGlow } from './components/ui/cursor-glow'
import { LoadingScreen } from './components/ui/loading-screen'
import './index.css'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem disableTransitionOnChange>
      <main className="relative min-h-screen bg-background overflow-x-hidden">
        <LoadingScreen />
        <ParticlesBackground />
        <CursorGlow />
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </main>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)