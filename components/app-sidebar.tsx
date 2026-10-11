'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  KanbanSquare,
  Bug,
  Users,
  BarChart3,
  Settings,
  Zap,
  ChevronDown,
  Circle,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Kanban Board', href: '/kanban', icon: KanbanSquare },
  { label: 'Bug Tracker', href: '/bugs', icon: Bug, badge: 6 },
  { label: 'Team', href: '/team', icon: Users },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
]

const projects = [
  { name: 'Core Platform', color: 'bg-primary', status: 'active' },
  { name: 'Mobile App', color: 'bg-chart-2', status: 'active' },
  { name: 'Data Pipeline', color: 'bg-chart-5', status: 'paused' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      {/* Logo */}
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="size-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground tracking-tight group-data-[collapsible=icon]:hidden">
            DevTrack
          </span>
          <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 group-data-[collapsible=icon]:hidden">
            v2.4
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {/* Main nav */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    tooltip={item.label}
                  >
                    <Link href={item.href} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </span>
                      {item.badge && (
                        <Badge
                          variant="destructive"
                          className="ml-auto text-[10px] px-1.5 py-0 group-data-[collapsible=icon]:hidden"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Projects */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Projects</span>
            <ChevronDown className="size-3 text-muted-foreground" />
          </SidebarGroupLabel>
          <SidebarMenu>
            {projects.map((project) => (
              <SidebarMenuItem key={project.name}>
                <SidebarMenuButton asChild tooltip={project.name}>
                  <button className="flex items-center gap-2 w-full">
                    <Circle
                      className={cn('size-2 fill-current', {
                        'text-primary': project.color === 'bg-primary',
                        'text-chart-2': project.color === 'bg-chart-2',
                        'text-chart-5': project.color === 'bg-chart-5',
                      })}
                    />
                    <span className="truncate text-sm">{project.name}</span>
                    {project.status === 'paused' && (
                      <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 group-data-[collapsible=icon]:hidden">
                        Paused
                      </Badge>
                    )}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* User footer */}
      <SidebarFooter className="pb-4">
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="#" className="flex items-center gap-2">
                <Settings className="size-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Alex Rivera">
              <Link href="#" className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">AR</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                  <span className="text-xs font-medium truncate">Alex Rivera</span>
                  <span className="text-[10px] text-muted-foreground truncate">alex@devtrack.io</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
