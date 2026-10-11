import { ShieldCheck, AlertTriangle, GitBranch, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const metrics = [
  { label: 'Code Coverage', value: 87, icon: ShieldCheck, color: 'text-chart-3' },
  { label: 'CI Pass Rate', value: 94, icon: GitBranch, color: 'text-primary' },
  { label: 'Bug Escape Rate', value: 12, icon: AlertTriangle, color: 'text-destructive', invert: true },
  { label: 'Review Turnaround', value: 73, icon: Clock, color: 'text-chart-2' },
]

function scoreColor(score: number) {
  if (score >= 80) return 'text-chart-3'
  if (score >= 60) return 'text-chart-5'
  return 'text-destructive'
}

export function HealthScore() {
  const overallScore = 78

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Project Health</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Big score */}
        <div className="flex items-center gap-4">
          <div className="relative flex size-16 items-center justify-center rounded-full border-4 border-primary/40 bg-primary/10">
            <span className={cn('text-xl font-bold', scoreColor(overallScore))}>{overallScore}</span>
          </div>
          <div>
            <p className="text-sm font-medium">Good</p>
            <p className="text-xs text-muted-foreground">Overall project score</p>
          </div>
        </div>

        {/* Individual metrics */}
        <div className="flex flex-col gap-3">
          {metrics.map((m) => {
            const Icon = m.icon
            const display = m.invert ? `${m.value}%` : `${m.value}%`
            return (
              <div key={m.label} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon className={cn('size-3', m.color)} />
                    <span className="text-xs text-muted-foreground">{m.label}</span>
                  </div>
                  <span className="text-xs font-medium">{display}</span>
                </div>
                <Progress
                  value={m.invert ? 100 - m.value : m.value}
                  className="h-1"
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
