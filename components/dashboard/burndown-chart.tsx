'use client'

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { burndownData } from '@/lib/mock-data'

export function BurndownChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
        <div className="space-y-0.5">
          <CardTitle className="text-sm font-semibold">Sprint Burndown</CardTitle>
          <CardDescription className="text-xs">Sprint 20 — remaining work vs ideal</CardDescription>
        </div>
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-chart-3/15 text-chart-3">
          On track
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 pt-2">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={burndownData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 264)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: 'oklch(0.55 0.015 264)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'oklch(0.55 0.015 264)' }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(0.18 0.015 264)',
                border: '1px solid oklch(0.28 0.02 264)',
                borderRadius: '6px',
                fontSize: '12px',
                color: 'oklch(0.96 0.005 264)',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
              formatter={(value) => (
                <span style={{ color: 'oklch(0.55 0.015 264)' }}>{value}</span>
              )}
            />
            <ReferenceLine y={0} stroke="oklch(0.28 0.02 264)" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="ideal"
              name="Ideal"
              stroke="oklch(0.55 0.015 264)"
              strokeWidth={1.5}
              strokeDasharray="5 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="remaining"
              name="Remaining"
              stroke="oklch(0.62 0.2 264)"
              strokeWidth={2}
              dot={{ r: 3, fill: 'oklch(0.62 0.2 264)', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
