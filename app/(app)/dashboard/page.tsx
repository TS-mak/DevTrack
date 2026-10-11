import { StatCards } from '@/components/dashboard/stat-cards'
import { VelocityChart } from '@/components/dashboard/velocity-chart'
import { BurndownChart } from '@/components/dashboard/burndown-chart'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { HealthScore } from '@/components/dashboard/health-score'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarDays } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px]">
      {/* Page header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Core Platform — Sprint 20</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 text-xs bg-primary/15 text-primary">
            <CalendarDays className="size-3" />
            Jul 7 – Jul 18, 2025
          </Badge>
          <Badge variant="secondary" className="text-xs">
            5 days remaining
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Stat cards */}
      <StatCards />

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VelocityChart />
        <BurndownChart />
      </div>

      {/* Bottom row: activity feed + health */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <HealthScore />
      </div>
    </div>
  )
}
