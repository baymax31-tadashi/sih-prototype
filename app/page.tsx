import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { MultilingualCopyright } from "@/components/multilingual-copyright"
import { HomePageContent } from "@/components/home-page-content"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Component */}
      <Navigation />

      <HomePageContent />

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Image
                src="/images/samudrasetu-logo.png"
                alt="SAMUDRASETU Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-bold text-primary">SAMUDRASETU</div>
                <div className="text-sm text-muted-foreground">Coastal Safety Bridge</div>
              </div>
            </div>
            <MultilingualCopyright />
          </div>
        </div>
      </footer>
    </div>
  )
}
