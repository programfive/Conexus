import { Button } from "@/components/ui/button"
import { FeatureIcons } from "@/components/utils/feature-icon"
import { WaveDivider } from "@/components/utils/wave-divider"

import { Send, Smile } from "lucide-react"

import Image from "next/image"
import Link from "next/link"
import { Hero } from "./components/hero"
import { Header } from "./components/header"
import { Feature } from "./components/feature"
import { Cta } from "./components/cta"
import { Footer } from "./components/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Feature />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}

