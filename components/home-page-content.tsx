"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, Home } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

export function HomePageContent() {
  const { t } = useTranslation()

  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full relative">
            <iframe
              className="w-full h-full object-cover scale-150"
              src="https://www.youtube.com/embed/CMZxdCqYC3g?autoplay=1&mute=1&loop=1&playlist=CMZxdCqYC3g&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=1&start=45&end=105"
              title="Maritime Background Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ pointerEvents: "none" }}
            ></iframe>
          </div>

          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Saltwater Slide color overlay for brand consistency */}
          <div
            className="absolute inset-0 mix-blend-multiply opacity-40"
            style={{ backgroundColor: "var(--saltwater-slide)" }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Government Initiative Badge */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Home className="w-4 h-4 text-white/90" />
              <span className="text-white/90 text-sm font-medium">Government Initiative</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-balance mb-8 leading-tight">
              <span className="text-white drop-shadow-lg">Bridging Communities</span>
              <br />
              <span className="text-white drop-shadow-lg">with </span>
              <span className="text-white drop-shadow-lg">Maritime Safety</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 text-balance mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              SAMUDRASETU connects coastal communities with maritime officials, enabling real-time hazard reporting and
              coordinated emergency response for safer seas.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-full shadow-xl"
                asChild
              >
                <Link href="/report">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Report a Hazard
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full bg-white/20 backdrop-blur-sm shadow-xl"
                asChild
              >
                <Link href="/dashboard">
                  <MapPin className="w-5 h-5 mr-2" />
                  View Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
