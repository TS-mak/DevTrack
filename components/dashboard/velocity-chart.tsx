'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { sprintVelocityData } from '@/lib/mock-data'

export function VelocityChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Sprint Velocity</CardTitle>
        <CardDescription className="text-xs">Planned vs completed story points per sprint</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-2">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sprintVelocityData} barCategoryGap="30%" barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 264)" vertical={false} />
            <XAxis
              dataKey="sprint"
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
              cursor={{ fill: 'oklch(0.22 0.018 264)' }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
              formatter={(value) => (
                <span style={{ color: 'oklch(0.55 0.015 264)' }}>{value}</span>
              )}
            />
            <Bar dataKey="planned" name="Planned" fill="oklch(0.55 0.015 264)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="completed" name="Completed" fill="oklch(0.62 0.2 264)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
