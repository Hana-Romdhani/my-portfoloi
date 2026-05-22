import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './components/theme-provider'
import { Navigation } from './components/navigation'
import { HeroSection } from './components/hero-section'
import { AboutSection } from './components/about-section'
import { ProjectsSection } from './components/projects-section'
import { ExperienceSection } from './components/experience-section'
import { EducationSection } from './components/education-section'
import { SkillsSection } from './components/skills-section'
import { ContactSection } from './components/contact-section'
import { Footer } from './components/footer'
import { ParticlesBackground } from './components/particles-background'
import { CursorGlow } from './components/cursor-glow'
import { LoadingScreen } from './components/loading-screen'
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
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
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