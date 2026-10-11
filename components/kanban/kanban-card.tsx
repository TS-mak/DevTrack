'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MessageSquare, Paperclip } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import type { KanbanTask, Priority } from '@/lib/mock-data'

const priorityConfig: Record<Priority, { label: string; class: string }> = {
  critical: { label: 'Critical', class: 'bg-destructive/15 text-destructive' },
  high: { label: 'High', class: 'bg-chart-5/15 text-chart-5' },
  medium: { label: 'Medium', class: 'bg-primary/15 text-primary' },
  low: { label: 'Low', class: 'bg-muted text-muted-foreground' },
}

interface KanbanCardProps {
  task: KanbanTask
  isDragging?: boolean
}

export function KanbanCard({ task, isDragging }: KanbanCardProps) {
  const [open, setOpen] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } =
    useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const pCfg = priorityConfig[task.priority]

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setOpen(true)}
        className={cn(
          'group flex flex-col gap-2 rounded-lg border border-border bg-background p-3 cursor-pointer',
          'hover:border-primary/40 hover:shadow-md transition-all select-none',
          (isDragging || isSortableDragging) && 'opacity-50 shadow-xl border-primary/60'
        )}
      >
        {/* Priority + labels row */}
        <div className="flex flex-wrap items-center gap-1">
          <Badge className={cn('text-[10px] px-1.5 py-0', pCfg.class)}>
            {pCfg.label}
          </Badge>
          {task.labels.slice(0, 2).map((label) => (
            <Badge key={label} variant="secondary" className="text-[10px] px-1.5 py-0">
              {label}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <p className="text-xs font-medium leading-snug text-foreground line-clamp-2">{task.title}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-0.5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-[10px] font-mono bg-muted px-1 py-0.5 rounded">{task.storyPoints}pts</span>
            <span className="text-[10px]">{task.dueDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-muted-foreground">
              <MessageSquare className="size-3" />
              <span className="text-[10px]">2</span>
            </div>
            <Avatar className="size-5">
              <AvatarFallback className="text-[9px] bg-primary/20 text-primary">
                {task.avatar}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Detail dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn('text-[10px] px-1.5 py-0', pCfg.class)}>{pCfg.label}</Badge>
              {task.labels.map((l) => (
                <Badge key={l} variant="secondary" className="text-[10px] px-1.5 py-0">{l}</Badge>
              ))}
            </div>
            <DialogTitle className="text-sm leading-snug">{task.title}</DialogTitle>
            <DialogDescription className="text-xs leading-relaxed">{task.description}</DialogDescription>
          </DialogHeader>

          <Separator />

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Assignee', value: task.assignee },
              { label: 'Story Points', value: `${task.storyPoints} pts` },
              { label: 'Due Date', value: task.dueDate },
              { label: 'Status', value: task.status.replace('-', ' ') },
            ].map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{row.label}</p>
                <p className="text-xs font-medium capitalize">{row.value}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageSquare className="size-3" />
              <span>2 comments</span>
            </div>
            <div className="flex items-center gap-1">
              <Paperclip className="size-3" />
              <span>1 attachment</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
