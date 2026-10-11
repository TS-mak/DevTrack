"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Download, TrendingUp, TrendingDown, Bug, CheckCircle2, Clock, Users } from "lucide-react"

const velocityTrend = [
  { sprint: "S1", planned: 34, completed: 28 },
  { sprint: "S2", planned: 40, completed: 38 },
  { sprint: "S3", planned: 36, completed: 35 },
  { sprint: "S4", planned: 42, completed: 30 },
  { sprint: "S5", planned: 38, completed: 40 },
  { sprint: "S6", planned: 45, completed: 43 },
  { sprint: "S7", planned: 44, completed: 47 },
]

const bugTrend = [
  { week: "W1", opened: 12, closed: 8, total: 42 },
  { week: "W2", opened: 9, closed: 14, total: 37 },
  { week: "W3", opened: 15, closed: 11, total: 41 },
  { week: "W4", opened: 7, closed: 18, total: 30 },
  { week: "W5", opened: 10, closed: 12, total: 28 },
  { week: "W6", opened: 6, closed: 14, total: 20 },
  { week: "W7", opened: 8, closed: 10, total: 18 },
]

const memberContributions = [
  { name: "Alice K.", commits: 87, prs: 24, reviews: 31 },
  { name: "Bob M.", commits: 62, prs: 18, reviews: 45 },
  { name: "Carol S.", commits: 95, prs: 31, reviews: 22 },
  { name: "Dave R.", commits: 41, prs: 12, reviews: 38 },
  { name: "Emma T.", commits: 78, prs: 27, reviews: 29 },
]

const cycleTimeData = [
  { label: "Todo → In Progress", days: 1.2 },
  { label: "In Progress → Review", days: 2.8 },
  { label: "Review → Done", days: 1.4 },
  { label: "Total Cycle Time", days: 5.4 },
]

const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "#22d3ee",
  muted: "hsl(var(--muted-foreground))",
}

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--popover-foreground))",
}

const summaryStats = [
  {
    label: "Total Sprints",
    value: "7",
    sub: "Avg velocity 37.3 pts",
    icon: TrendingUp,
    positive: true,
  },
  {
    label: "Bugs Resolved",
    value: "87",
    sub: "67% resolution rate",
    icon: Bug,
    positive: true,
  },
  {
    label: "Avg Cycle Time",
    value: "5.4d",
    sub: "-0.8d vs last quarter",
    icon: Clock,
    positive: true,
  },
  {
    label: "Team Size",
    value: "5",
    sub: "3 active this week",
    icon: Users,
    positive: false,
  },
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("velocity")

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Project analytics and team performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Last 7 sprints
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="pt-5 pb-4 px-5">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {stat.positive ? (
                        <TrendingUp className="size-3 text-emerald-400" />
                      ) : (
                        <TrendingDown className="size-3 text-muted-foreground" />
                      )}
                      {stat.sub}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="size-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/40 border border-border">
          <TabsTrigger value="velocity">Velocity</TabsTrigger>
          <TabsTrigger value="bugs">Bug Trends</TabsTrigger>
          <TabsTrigger value="team">Team Output</TabsTrigger>
          <TabsTrigger value="cycle">Cycle Time</TabsTrigger>
        </TabsList>

        {/* Velocity Tab */}
        <TabsContent value="velocity" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Sprint Velocity Trend</CardTitle>
              <CardDescription>Planned vs completed story points per sprint</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={velocityTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradPlanned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS.accent} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={CHART_COLORS.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="sprint" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }} />
                  <Area type="monotone" dataKey="planned" stroke={CHART_COLORS.primary} strokeWidth={2} fill="url(#gradPlanned)" name="Planned" />
                  <Area type="monotone" dataKey="completed" stroke={CHART_COLORS.accent} strokeWidth={2} fill="url(#gradCompleted)" name="Completed" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bug Trends Tab */}
        <TabsContent value="bugs" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Bug Trend Analysis</CardTitle>
              <CardDescription>Weekly opened vs closed vs total open bugs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={bugTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }} />
                  <Line type="monotone" dataKey="opened" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} name="Opened" />
                  <Line type="monotone" dataKey="closed" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} name="Closed" />
                  <Line type="monotone" dataKey="total" stroke={CHART_COLORS.primary} strokeWidth={2} strokeDasharray="5 5" dot={false} name="Total Open" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Output Tab */}
        <TabsContent value="team" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Team Contributions</CardTitle>
              <CardDescription>Commits, pull requests, and code reviews per member</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={memberContributions} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }} />
                  <Bar dataKey="commits" fill={CHART_COLORS.primary} name="Commits" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="prs" fill={CHART_COLORS.accent} name="Pull Requests" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="reviews" fill="#a78bfa" name="Reviews" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cycle Time Tab */}
        <TabsContent value="cycle" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Average Cycle Time</CardTitle>
              <CardDescription>Days spent in each workflow stage (last 3 sprints)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 mt-2">
                {cycleTimeData.map((item, idx) => {
                  const isTotal = item.label === "Total Cycle Time"
                  const pct = Math.round((item.days / 5.4) * 100)
                  return (
                    <div key={item.label} className={`flex flex-col gap-1 ${isTotal ? "mt-2 pt-4 border-t border-border" : ""}`}>
                      <div className="flex items-center justify-between text-sm">
                        <span className={`font-medium ${isTotal ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
                        <span className={`tabular-nums font-semibold ${isTotal ? "text-primary" : "text-foreground"}`}>{item.days}d</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isTotal ? "bg-primary" : "bg-primary/50"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}

                <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Improving trend</p>
                    <p className="text-xs text-muted-foreground">Cycle time decreased 12.9% compared to last quarter</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
