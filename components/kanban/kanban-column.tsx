'use client'

import { useDroppable } from '@dnd-kit/core'
import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { TaskStatus } from '@/lib/mock-data'

const columnStyles: Record<TaskStatus, { dot: string; badge: string }> = {
  backlog: { dot: 'bg-muted-foreground', badge: 'bg-muted text-muted-foreground' },
  'in-progress': { dot: 'bg-primary', badge: 'bg-primary/15 text-primary' },
  review: { dot: 'bg-chart-5', badge: 'bg-chart-5/15 text-chart-5' },
  done: { dot: 'bg-chart-3', badge: 'bg-chart-3/15 text-chart-3' },
}

interface KanbanColumnProps {
  id: TaskStatus
  label: string
  count: number
  children: React.ReactNode
}

export function KanbanColumn({ id, label, count, children }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const styles = columnStyles[id]

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col w-72 flex-shrink-0 rounded-xl border border-border bg-card transition-colors',
        isOver && 'border-primary/50 bg-accent'
      )}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className={cn('size-2 rounded-full', styles.dot)} />
          <span className="text-xs font-semibold">{label}</span>
          <Badge className={cn('text-[10px] px-1.5 py-0', styles.badge)}>
            {count}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="size-6 text-muted-foreground hover:text-foreground">
          <Plus className="size-3" />
          <span className="sr-only">Add task to {label}</span>
        </Button>
      </div>

      {/* Cards */}
      <ScrollArea className="flex-1 max-h-[calc(100vh-280px)]">
        <div className="flex flex-col gap-2 p-2 min-h-[80px]">
          {children}
        </div>
      </ScrollArea>
    </div>
  )
}
