'use client'

import { usePathname } from 'next/navigation'
import { Bell, Search, Plus } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const routeMap: Record<string, { label: string; parent?: { label: string; href: string } }> = {
  '/dashboard': { label: 'Dashboard' },
  '/kanban': { label: 'Kanban Board', parent: { label: 'Projects', href: '#' } },
  '/bugs': { label: 'Bug Tracker', parent: { label: 'Projects', href: '#' } },
  '/team': { label: 'Team', parent: { label: 'Organisation', href: '#' } },
  '/reports': { label: 'Reports', parent: { label: 'Analytics', href: '#' } },
}

export function AppHeader() {
  const pathname = usePathname()
  const route = routeMap[pathname] ?? { label: 'DevTrack' }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <SidebarTrigger className="-ml-1 size-8" />
      <Separator orientation="vertical" className="h-5" />

      {/* Breadcrumb */}
      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          {route.parent && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={route.parent.href} className="text-muted-foreground text-xs">
                  {route.parent.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xs font-medium">{route.label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Search */}
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-2.5 size-3.5 text-muted-foreground" />
        <Input
          placeholder="Search tasks, bugs…"
          className="h-8 w-52 pl-8 text-xs bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>

      {/* New task button */}
      <Button size="sm" className="h-8 gap-1.5 text-xs hidden sm:flex">
        <Plus className="size-3.5" data-icon="inline-start" />
        New Task
      </Button>

      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative size-8">
        <Bell className="size-4" />
        <Badge
          variant="destructive"
          className="absolute -top-0.5 -right-0.5 size-4 p-0 flex items-center justify-center text-[9px]"
        >
          3
        </Badge>
        <span className="sr-only">Notifications</span>
      </Button>

      {/* Avatar */}
      <Avatar className="size-7">
        <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">AR</AvatarFallback>
      </Avatar>
    </header>
  )
}
