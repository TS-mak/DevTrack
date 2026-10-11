import { TrendingUp, TrendingDown, Bug, CheckSquare, Zap, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const stats = [
  {
    title: 'Sprint Progress',
    value: '83%',
    sub: '39 / 47 points',
    trend: '+12%',
    up: true,
    icon: Zap,
    accent: 'text-primary',
    bar: 83,
  },
  {
    title: 'Open Bugs',
    value: '6',
    sub: '2 critical, 4 high',
    trend: '-3 this week',
    up: true,
    icon: Bug,
    accent: 'text-destructive',
    bar: null,
  },
  {
    title: 'Tasks Completed',
    value: '142',
    sub: 'This sprint',
    trend: '+18%',
    up: true,
    icon: CheckSquare,
    accent: 'text-chart-3',
    bar: null,
  },
  {
    title: 'Team Velocity',
    value: '41 pts',
    sub: 'Sprint 20 avg',
    trend: '-5 pts',
    up: false,
    icon: Users,
    accent: 'text-chart-2',
    bar: null,
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={cn('p-1.5 rounded-md bg-muted', stat.accent)}>
                <Icon className="size-3.5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-bold">{stat.value}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
                <Badge
                  variant={stat.up ? 'secondary' : 'destructive'}
                  className={cn('text-[10px] px-1.5 py-0 gap-0.5', {
                    'bg-chart-3/15 text-chart-3 hover:bg-chart-3/20': stat.up,
                    'bg-destructive/15 text-destructive hover:bg-destructive/20': !stat.up,
                  })}
                >
                  {stat.up ? (
                    <TrendingUp className="size-2.5" />
                  ) : (
                    <TrendingDown className="size-2.5" />
                  )}
                  {stat.trend}
                </Badge>
              </div>
              {stat.bar !== null && (
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${stat.bar}%` }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
