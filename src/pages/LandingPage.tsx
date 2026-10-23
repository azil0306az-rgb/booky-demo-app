import React from 'react'
import { Navbar } from '../components/common/Navbar'
import { HeroSection } from '../components/landing/HeroSection'
import {
  HowItWorksSection,
  FeaturesShowcase,
  WorkflowPreviewSection,
  FAQSection,
  LandingFooter,
} from '../components/landing/LandingSections'
import { useApp } from '../context/AppContext'

export const LandingPage: React.FC = () => {
  const { theme } = useApp()
  const isDark = theme === 'dark'

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-lime-400 selection:text-slate-950 ${
        isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#edf2f7] text-slate-900'
      }`}
    >
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesShowcase />
        <WorkflowPreviewSection />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  )
}
