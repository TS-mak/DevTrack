'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, Eye, EyeOff, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { authClient } from '@/lib/auth-client'

const passwordRules = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
]

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '', workspace: '' })

  function handleChange(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
      })
      if (res.error) {
        setError(res.error.message ?? 'Registration failed')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-card border-r border-border relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(oklch(0.62 0.2 264) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.2 264) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
            <Zap className="size-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">DevTrack</span>
          <Badge variant="secondary" className="ml-1 text-[10px]">v2.4</Badge>
        </div>

        <div className="relative space-y-5">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Your team.<br />
            Your workflow.<br />
            <span className="text-primary">Zero friction.</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            Set up your workspace in under two minutes. Invite your team, import your backlog, and start your first sprint today.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              { label: 'Kanban Boards', desc: 'Visual sprint planning' },
              { label: 'Bug Tracker', desc: 'Triage at velocity' },
              { label: 'Team Reports', desc: 'Data-driven insights' },
              { label: 'Integrations', desc: 'GitHub, Slack & more' },
            ].map((f) => (
              <div key={f.label} className="rounded-lg border border-border bg-background/60 p-3 space-y-0.5">
                <p className="text-xs font-medium">{f.label}</p>
                <p className="text-[11px] text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-muted-foreground">
          &copy; 2025 DevTrack, Inc. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="size-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold">DevTrack</span>
        </div>

        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold">Create your account</h2>
            <p className="text-sm text-muted-foreground">Get started for free, no credit card required</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-medium">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange('name')}
                required
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="workspace" className="text-xs font-medium">Workspace name</Label>
              <div className="relative">
                <Input
                  id="workspace"
                  type="text"
                  placeholder="acme-corp"
                  value={form.workspace}
                  onChange={handleChange('workspace')}
                  required
                  className="h-9 text-sm pr-28"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground select-none">
                  .devtrack.io
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reg-email" className="text-xs font-medium">Work email</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange('email')}
                autoComplete="email"
                required
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reg-password" className="text-xs font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange('password')}
                  autoComplete="new-password"
                  required
                  className="h-9 text-sm pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

              {/* Password strength indicators */}
              {form.password.length > 0 && (
                <div className="flex flex-col gap-1 pt-1">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(form.password)
                    return (
                      <div key={rule.label} className="flex items-center gap-1.5">
                        <div className={cn(
                          'flex size-3.5 items-center justify-center rounded-full transition-colors',
                          passed ? 'bg-chart-3' : 'bg-muted'
                        )}>
                          {passed && <Check className="size-2 text-background" strokeWidth={3} />}
                        </div>
                        <span className={cn('text-[11px]', passed ? 'text-chart-3' : 'text-muted-foreground')}>
                          {rule.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full h-9 gap-2" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="size-3.5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Creating workspace…
                </span>
              ) : (
                <>
                  Create account
                  <ArrowRight className="size-3.5" data-icon="inline-end" />
                </>
              )}
            </Button>

            <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
              By creating an account you agree to our{' '}
              <Link href="#" className="underline hover:text-foreground">Terms of Service</Link>
              {' '}and{' '}
              <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
