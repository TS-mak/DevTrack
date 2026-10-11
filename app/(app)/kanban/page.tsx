import { KanbanBoard } from '@/components/kanban/kanban-board'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter, Plus, CalendarDays } from 'lucide-react'

export default function KanbanPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Kanban Board</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Core Platform — drag cards between columns to update status</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="sprint-20">
            <SelectTrigger className="h-8 w-36 text-xs">
              <CalendarDays className="size-3 mr-1 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sprint-20" className="text-xs">Sprint 20</SelectItem>
              <SelectItem value="sprint-19" className="text-xs">Sprint 19</SelectItem>
              <SelectItem value="sprint-18" className="text-xs">Sprint 18</SelectItem>
              <SelectItem value="backlog" className="text-xs">Backlog</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Filter className="size-3" data-icon="inline-start" />
            Filter
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="size-3" data-icon="inline-start" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <Badge variant="secondary" className="text-[10px] bg-primary/15 text-primary">47 total points</Badge>
        <Badge variant="secondary" className="text-[10px]">11 tasks</Badge>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-xs text-muted-foreground">Sprint 20 · Jul 7 – Jul 18</span>
      </div>

      <Separator className="flex-shrink-0" />

      {/* Board */}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  )
}
