import { GitMerge, Bug, Rocket, Globe, MessageSquare, GitCommit } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { activityFeed } from '@/lib/mock-data'

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  merge: { icon: GitMerge, color: 'text-chart-3' },
  bug: { icon: Bug, color: 'text-destructive' },
  sprint: { icon: Rocket, color: 'text-primary' },
  deploy: { icon: Globe, color: 'text-chart-2' },
  comment: { icon: MessageSquare, color: 'text-chart-5' },
  commit: { icon: GitCommit, color: 'text-muted-foreground' },
}

export function ActivityFeed() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[280px] px-4">
          <div className="flex flex-col gap-0">
            {activityFeed.map((item, index) => {
              const cfg = typeConfig[item.type]
              const Icon = cfg.icon
              return (
                <div key={item.id} className="relative flex gap-3 pb-4">
                  {/* vertical connector */}
                  {index < activityFeed.length - 1 && (
                    <div className="absolute left-[18px] top-8 bottom-0 w-px bg-border" />
                  )}
                  <div className="relative flex-shrink-0">
                    <Avatar className="size-8">
                      <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">
                        {item.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-card ring-1 ring-border ${cfg.color}`}>
                      <Icon className="size-2" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-xs">
                      <span className="font-medium">{item.user}</span>
                      {' '}
                      <span className="text-muted-foreground">{item.action}</span>
                      {' '}
                      <span className="font-medium text-primary">{item.target}</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
