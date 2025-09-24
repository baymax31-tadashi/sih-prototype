import { PublicDashboardContent } from "@/components/public-dashboard-content"
import { Navigation } from "@/components/navigation"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PublicDashboardContent />
    </div>
  )
}
