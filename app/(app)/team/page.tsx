'use client'

import { useState } from 'react'
import { Search, UserPlus, CheckSquare, Bug, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { teamMembers, type Role } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const roleConfig: Record<Role, string> = {
  'Engineering Lead': 'bg-primary/15 text-primary',
  'Senior Engineer': 'bg-chart-2/15 text-chart-2',
  'Engineer': 'bg-muted text-muted-foreground',
  'QA Engineer': 'bg-chart-3/15 text-chart-3',
  'DevOps': 'bg-chart-5/15 text-chart-5',
  'Product Manager': 'bg-destructive/15 text-destructive',
}

const avatarColors = [
  'bg-primary/20 text-primary',
  'bg-chart-2/20 text-chart-2',
  'bg-chart-3/20 text-chart-3',
  'bg-chart-5/20 text-chart-5',
  'bg-destructive/20 text-destructive',
]

export default function TeamPage() {
  const [search, setSearch] = useState('')

  const filtered = teamMembers.filter((m) => {
    const q = search.toLowerCase()
    return !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.department.toLowerCase().includes(q)
  })

  const departments = [...new Set(teamMembers.map((m) => m.department))]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{teamMembers.length} members · {teamMembers.filter((m) => m.online).length} online</p>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <UserPlus className="size-3" data-icon="inline-start" />
          Invite Member
        </Button>
      </div>

      <Separator />

      <Tabs defaultValue="members">
        <TabsList className="h-8 text-xs">
          <TabsTrigger value="members" className="text-xs px-3 h-7">Members</TabsTrigger>
          <TabsTrigger value="departments" className="text-xs px-3 h-7">By Department</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-4 space-y-4">
          {/* Search */}
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 size-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members…"
              className="h-8 w-64 pl-8 text-xs"
            />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((member, idx) => {
              const colorClass = avatarColors[idx % avatarColors.length]
              const maxTasks = Math.max(...teamMembers.map((m) => m.tasksCompleted))
              return (
                <Card key={member.id} className="relative overflow-hidden group hover:border-primary/40 transition-colors">
                  {/* Online indicator */}
                  {member.online && (
                    <div className="absolute top-3 right-3 size-2 rounded-full bg-chart-3 ring-2 ring-background" />
                  )}

                  <CardHeader className="pb-3 pt-4 px-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback className={cn('text-sm font-semibold', colorClass)}>
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{member.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{member.email}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="size-3.5" />
                            <span className="sr-only">Member actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-xs">
                          <DropdownMenuItem onClick={() => {}}>View profile</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>Assign task</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>Send message</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="px-4 pb-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <Badge className={cn('text-[10px] px-1.5 py-0', roleConfig[member.role])}>
                        {member.role}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{member.department}</span>
                    </div>

                    <Separator />

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <CheckSquare className="size-3" />
                          <span className="text-[10px]">Tasks done</span>
                        </div>
                        <span className="text-sm font-bold">{member.tasksCompleted}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Bug className="size-3" />
                          <span className="text-[10px]">Bugs fixed</span>
                        </div>
                        <span className="text-sm font-bold">{member.bugsFixed}</span>
                      </div>
                    </div>

                    {/* Productivity bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span className="text-[10px] text-muted-foreground">Productivity</span>
                        <span className="text-[10px] text-muted-foreground">
                          {Math.round((member.tasksCompleted / maxTasks) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(member.tasksCompleted / maxTasks) * 100}
                        className="h-1"
                      />
                    </div>

                    <p className="text-[10px] text-muted-foreground">Joined {member.joined}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-12">No members match your search.</p>
          )}
        </TabsContent>

        <TabsContent value="departments" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => {
              const deptMembers = teamMembers.filter((m) => m.department === dept)
              return (
                <Card key={dept}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{dept}</p>
                      <Badge variant="secondary" className="text-[10px]">{deptMembers.length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    {deptMembers.map((m, idx) => (
                      <div key={m.id} className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className={cn('text-[10px]', avatarColors[idx % avatarColors.length])}>
                            {m.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{m.name}</p>
                          <p className="text-[10px] text-muted-foreground">{m.role}</p>
                        </div>
                        {m.online && <div className="size-1.5 rounded-full bg-chart-3" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
