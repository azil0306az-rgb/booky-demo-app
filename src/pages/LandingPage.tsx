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
      className={`min-h-screen transition-colors duration-300 selection:bg-[#c5a880] selection:text-[#0c0a09] ${
        isDark ? 'bg-[#0c0a09] text-[#faf7f2]' : 'bg-[#faf7f2] text-[#1a1614]'
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
