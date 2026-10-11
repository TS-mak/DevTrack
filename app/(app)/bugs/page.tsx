'use client'

import { useState } from 'react'
import { Bug, Filter, Plus, Search, ChevronUp, ChevronDown, ChevronsUpDown, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { bugs, type Bug as BugType, type BugStatus, type BugSeverity } from '@/lib/mock-data'

const severityConfig: Record<BugSeverity, string> = {
  critical: 'bg-destructive/15 text-destructive',
  high: 'bg-chart-5/15 text-chart-5',
  medium: 'bg-primary/15 text-primary',
  low: 'bg-muted text-muted-foreground',
}

const statusConfig: Record<BugStatus, string> = {
  open: 'bg-chart-5/15 text-chart-5',
  'in-progress': 'bg-primary/15 text-primary',
  resolved: 'bg-chart-3/15 text-chart-3',
  closed: 'bg-muted text-muted-foreground',
}

type SortKey = 'id' | 'severity' | 'status' | 'created' | 'updated'
const severityOrder: BugSeverity[] = ['critical', 'high', 'medium', 'low']
const statusOrder: BugStatus[] = ['open', 'in-progress', 'resolved', 'closed']

export default function BugTrackerPage() {
  const [search, setSearch] = useState('')
  const [filterSeverity, setFilterSeverity] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('id')
  const [sortAsc, setSortAsc] = useState(true)
  const [selected, setSelected] = useState<BugType | null>(null)

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((v) => !v)
    else { setSortKey(key); setSortAsc(true) }
  }

  const filtered = bugs
    .filter((b) => {
      const q = search.toLowerCase()
      if (q && !b.title.toLowerCase().includes(q) && !b.id.toLowerCase().includes(q)) return false
      if (filterSeverity !== 'all' && b.severity !== filterSeverity) return false
      if (filterStatus !== 'all' && b.status !== filterStatus) return false
      return true
    })
    .sort((a, b) => {
      let cmp = 0
      if (sortKey === 'id') cmp = a.id.localeCompare(b.id)
      else if (sortKey === 'severity') cmp = severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity)
      else if (sortKey === 'status') cmp = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      else if (sortKey === 'created') cmp = a.created.localeCompare(b.created)
      else if (sortKey === 'updated') cmp = a.updated.localeCompare(b.updated)
      return sortAsc ? cmp : -cmp
    })

  const openCount = bugs.filter((b) => b.status === 'open' || b.status === 'in-progress').length
  const criticalCount = bugs.filter((b) => b.severity === 'critical' && b.status !== 'resolved' && b.status !== 'closed').length

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronsUpDown className="size-3 text-muted-foreground" />
    return sortAsc ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />
  }

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Bug Tracker</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Core Platform · {openCount} open, {criticalCount} critical</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="size-3" data-icon="inline-start" />
            New Bug
          </Button>
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        {(['open', 'in-progress', 'resolved', 'closed'] as BugStatus[]).map((s) => {
          const count = bugs.filter((b) => b.status === s).length
          return (
            <Badge key={s} className={cn('text-xs gap-1.5', statusConfig[s])}>
              <Bug className="size-3" />
              {count} {s.replace('-', ' ')}
            </Badge>
          )
        })}
      </div>

      <Separator className="flex-shrink-0" />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 size-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bugs…"
            className="h-8 w-52 pl-8 text-xs"
          />
        </div>
        <Select value={filterSeverity} onValueChange={setFilterSeverity}>
          <SelectTrigger className="h-8 w-32 text-xs">
            <Filter className="size-3 mr-1 text-muted-foreground" />
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All severities</SelectItem>
            <SelectItem value="critical" className="text-xs">Critical</SelectItem>
            <SelectItem value="high" className="text-xs">High</SelectItem>
            <SelectItem value="medium" className="text-xs">Medium</SelectItem>
            <SelectItem value="low" className="text-xs">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="h-8 w-36 text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All statuses</SelectItem>
            <SelectItem value="open" className="text-xs">Open</SelectItem>
            <SelectItem value="in-progress" className="text-xs">In Progress</SelectItem>
            <SelectItem value="resolved" className="text-xs">Resolved</SelectItem>
            <SelectItem value="closed" className="text-xs">Closed</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground ml-1">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden rounded-xl border border-border">
        <ScrollArea className="h-full">
          <table className="w-full text-xs">
            <thead className="sticky top-0 z-10 bg-card border-b border-border">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-24">
                  <button onClick={() => handleSort('id')} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    ID <SortIcon col="id" />
                  </button>
                </th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-24">
                  <button onClick={() => handleSort('severity')} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    Severity <SortIcon col="severity" />
                  </button>
                </th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-28">
                  <button onClick={() => handleSort('status')} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    Status <SortIcon col="status" />
                  </button>
                </th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-28 hidden md:table-cell">Assignee</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-20 hidden lg:table-cell">Component</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-24 hidden lg:table-cell">
                  <button onClick={() => handleSort('updated')} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    Updated <SortIcon col="updated" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((bug, index) => (
                <tr
                  key={bug.id}
                  onClick={() => setSelected(bug)}
                  className={cn(
                    'border-b border-border cursor-pointer transition-colors hover:bg-accent',
                    index % 2 === 0 ? 'bg-background' : 'bg-card/50',
                    selected?.id === bug.id && 'bg-accent'
                  )}
                >
                  <td className="px-4 py-3 font-mono text-muted-foreground">{bug.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground line-clamp-1">{bug.title}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={cn('text-[10px] px-1.5 py-0 capitalize', severityConfig[bug.severity])}>
                      {bug.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={cn('text-[10px] px-1.5 py-0 capitalize', statusConfig[bug.status])}>
                      {bug.status.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[9px] bg-primary/20 text-primary">{bug.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground truncate max-w-20">{bug.assignee.split(' ')[0]}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{bug.component}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{bug.updated}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    No bugs match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
      </div>

      {/* Detail sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selected && (
            <>
              <SheetHeader className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={cn('text-[10px] px-1.5 py-0', severityConfig[selected.severity])}>
                    {selected.severity}
                  </Badge>
                  <Badge className={cn('text-[10px] px-1.5 py-0', statusConfig[selected.status])}>
                    {selected.status.replace('-', ' ')}
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">{selected.id}</span>
                </div>
                <SheetTitle className="text-sm leading-snug text-left">{selected.title}</SheetTitle>
                <SheetDescription className="text-xs leading-relaxed text-left">
                  {selected.description}
                </SheetDescription>
              </SheetHeader>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Assignee', value: selected.assignee },
                  { label: 'Reporter', value: selected.reporter },
                  { label: 'Component', value: selected.component },
                  { label: 'Created', value: selected.created },
                  { label: 'Updated', value: selected.updated },
                  { label: 'Comments', value: `${selected.comments}` },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col gap-0.5">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{row.label}</p>
                    <p className="text-xs font-medium">{row.value}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MessageSquare className="size-3.5" />
                <span>{selected.comments} comments</span>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
