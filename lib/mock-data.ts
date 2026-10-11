// ── Team members ──────────────────────────────────────────────────────────────
export type Role = 'Engineering Lead' | 'Senior Engineer' | 'Engineer' | 'QA Engineer' | 'DevOps' | 'Product Manager'

export interface TeamMember {
  id: string
  name: string
  email: string
  role: Role
  avatar: string
  department: string
  joined: string
  tasksCompleted: number
  bugsFixed: number
  online: boolean
}

export const teamMembers: TeamMember[] = [
  { id: 't1', name: 'Alex Rivera', email: 'alex@devtrack.io', role: 'Engineering Lead', avatar: 'AR', department: 'Platform', joined: 'Jan 2023', tasksCompleted: 142, bugsFixed: 38, online: true },
  { id: 't2', name: 'Jamie Chen', email: 'jamie@devtrack.io', role: 'Senior Engineer', avatar: 'JC', department: 'Backend', joined: 'Mar 2023', tasksCompleted: 118, bugsFixed: 51, online: true },
  { id: 't3', name: 'Sam Okafor', email: 'sam@devtrack.io', role: 'Engineer', avatar: 'SO', department: 'Frontend', joined: 'Jun 2023', tasksCompleted: 87, bugsFixed: 22, online: false },
  { id: 't4', name: 'Morgan Lee', email: 'morgan@devtrack.io', role: 'QA Engineer', avatar: 'ML', department: 'Quality', joined: 'Feb 2023', tasksCompleted: 203, bugsFixed: 91, online: true },
  { id: 't5', name: 'Casey Park', email: 'casey@devtrack.io', role: 'DevOps', avatar: 'CP', department: 'Infrastructure', joined: 'Apr 2023', tasksCompleted: 76, bugsFixed: 14, online: false },
  { id: 't6', name: 'Jordan Kim', email: 'jordan@devtrack.io', role: 'Product Manager', avatar: 'JK', department: 'Product', joined: 'Nov 2022', tasksCompleted: 55, bugsFixed: 0, online: true },
  { id: 't7', name: 'Riley Thomas', email: 'riley@devtrack.io', role: 'Engineer', avatar: 'RT', department: 'Frontend', joined: 'Aug 2023', tasksCompleted: 64, bugsFixed: 17, online: true },
  { id: 't8', name: 'Taylor Singh', email: 'taylor@devtrack.io', role: 'Senior Engineer', avatar: 'TS', department: 'Backend', joined: 'Dec 2022', tasksCompleted: 130, bugsFixed: 44, online: false },
]

// ── Kanban ────────────────────────────────────────────────────────────────────
export type Priority = 'critical' | 'high' | 'medium' | 'low'
export type TaskStatus = 'backlog' | 'in-progress' | 'review' | 'done'

export interface KanbanTask {
  id: string
  title: string
  description: string
  priority: Priority
  assignee: string
  avatar: string
  storyPoints: number
  labels: string[]
  status: TaskStatus
  dueDate: string
}

export const kanbanTasks: KanbanTask[] = [
  // Backlog
  { id: 'k1', title: 'Implement OAuth2 refresh token rotation', description: 'Add automatic refresh token rotation to improve session security.', priority: 'high', assignee: 'Jamie Chen', avatar: 'JC', storyPoints: 5, labels: ['security', 'backend'], status: 'backlog', dueDate: 'Jul 18' },
  { id: 'k2', title: 'Add Prometheus metrics endpoint', description: 'Expose /metrics for Prometheus scraping to enable cluster monitoring.', priority: 'medium', assignee: 'Casey Park', avatar: 'CP', storyPoints: 3, labels: ['devops', 'observability'], status: 'backlog', dueDate: 'Jul 22' },
  { id: 'k3', title: 'Design onboarding flow v2', description: 'Revamp the new-user onboarding with interactive product tour.', priority: 'low', assignee: 'Jordan Kim', avatar: 'JK', storyPoints: 8, labels: ['ux', 'product'], status: 'backlog', dueDate: 'Jul 28' },
  // In progress
  { id: 'k4', title: 'Migrate auth service to Postgres', description: 'Replace SQLite with a managed Postgres instance for the auth microservice.', priority: 'critical', assignee: 'Alex Rivera', avatar: 'AR', storyPoints: 13, labels: ['backend', 'database'], status: 'in-progress', dueDate: 'Jul 14' },
  { id: 'k5', title: 'Dashboard performance audit', description: 'Profile and optimise render times across the main dashboard widgets.', priority: 'high', assignee: 'Sam Okafor', avatar: 'SO', storyPoints: 5, labels: ['frontend', 'performance'], status: 'in-progress', dueDate: 'Jul 15' },
  { id: 'k6', title: 'Write E2E tests for checkout', description: 'Cover happy-path and error cases using Playwright.', priority: 'medium', assignee: 'Morgan Lee', avatar: 'ML', storyPoints: 5, labels: ['testing', 'qa'], status: 'in-progress', dueDate: 'Jul 16' },
  // Review
  { id: 'k7', title: 'API rate limiting middleware', description: 'Implement per-user rate limiting using a sliding window algorithm.', priority: 'high', assignee: 'Taylor Singh', avatar: 'TS', storyPoints: 8, labels: ['backend', 'security'], status: 'review', dueDate: 'Jul 13' },
  { id: 'k8', title: 'Component library docs update', description: 'Sync the Storybook docs with the latest token changes.', priority: 'low', assignee: 'Riley Thomas', avatar: 'RT', storyPoints: 2, labels: ['docs', 'frontend'], status: 'review', dueDate: 'Jul 13' },
  // Done
  { id: 'k9', title: 'Set up CI/CD pipeline for staging', description: 'GitHub Actions workflow deploying to staging on every PR merge.', priority: 'high', assignee: 'Casey Park', avatar: 'CP', storyPoints: 8, labels: ['devops', 'ci-cd'], status: 'done', dueDate: 'Jul 10' },
  { id: 'k10', title: 'Fix memory leak in WebSocket handler', description: 'Resolved dangling listeners that caused OOM on long-lived connections.', priority: 'critical', assignee: 'Jamie Chen', avatar: 'JC', storyPoints: 5, labels: ['backend', 'bug'], status: 'done', dueDate: 'Jul 11' },
  { id: 'k11', title: 'Dark mode tokens for charts', description: 'Added dark-mode CSS variables for all Recharts chart colours.', priority: 'medium', assignee: 'Sam Okafor', avatar: 'SO', storyPoints: 3, labels: ['frontend', 'design'], status: 'done', dueDate: 'Jul 11' },
]

// ── Bug tracker ───────────────────────────────────────────────────────────────
export type BugStatus = 'open' | 'in-progress' | 'resolved' | 'closed'
export type BugSeverity = 'critical' | 'high' | 'medium' | 'low'

export interface Bug {
  id: string
  title: string
  description: string
  severity: BugSeverity
  status: BugStatus
  assignee: string
  avatar: string
  reporter: string
  component: string
  created: string
  updated: string
  comments: number
}

export const bugs: Bug[] = [
  { id: 'BUG-001', title: 'Login page crashes on Safari 16 when biometrics are enabled', description: 'Users on macOS Ventura with Touch ID enabled experience a hard crash when submitting the login form.', severity: 'critical', status: 'in-progress', assignee: 'Jamie Chen', avatar: 'JC', reporter: 'Morgan Lee', component: 'Auth', created: 'Jul 10', updated: 'Jul 12', comments: 7 },
  { id: 'BUG-002', title: 'Dashboard velocity chart shows incorrect sprint totals', description: 'Story points shown in the velocity chart are doubled when a sprint contains sub-tasks.', severity: 'high', status: 'open', assignee: 'Sam Okafor', avatar: 'SO', reporter: 'Jordan Kim', component: 'Dashboard', created: 'Jul 11', updated: 'Jul 12', comments: 3 },
  { id: 'BUG-003', title: 'Kanban card drag-and-drop fails on touch devices', description: 'iOS and Android users cannot drag kanban cards — the drag gesture is intercepted by scroll.', severity: 'high', status: 'open', assignee: 'Riley Thomas', avatar: 'RT', reporter: 'Alex Rivera', component: 'Kanban', created: 'Jul 9', updated: 'Jul 11', comments: 5 },
  { id: 'BUG-004', title: 'Notifications badge count does not reset after read', description: 'The unread count in the header badge persists even after opening the notification panel.', severity: 'medium', status: 'in-progress', assignee: 'Sam Okafor', avatar: 'SO', reporter: 'Taylor Singh', component: 'Notifications', created: 'Jul 8', updated: 'Jul 12', comments: 2 },
  { id: 'BUG-005', title: 'Password reset email link expires immediately', description: 'The reset link in the email has a TTL of 0s in the production environment due to a missing env var.', severity: 'critical', status: 'resolved', assignee: 'Alex Rivera', avatar: 'AR', reporter: 'Casey Park', component: 'Auth', created: 'Jul 7', updated: 'Jul 10', comments: 9 },
  { id: 'BUG-006', title: 'Report CSV export includes HTML entities', description: 'Exported CSV files contain raw HTML entities like &amp; instead of decoded characters.', severity: 'medium', status: 'open', assignee: 'Taylor Singh', avatar: 'TS', reporter: 'Jordan Kim', component: 'Reports', created: 'Jul 6', updated: 'Jul 9', comments: 1 },
  { id: 'BUG-007', title: 'Avatar upload silently fails for PNG files over 2 MB', description: 'The upload endpoint returns 200 OK but does not store the file when size exceeds the undocumented limit.', severity: 'low', status: 'open', assignee: 'Riley Thomas', avatar: 'RT', reporter: 'Sam Okafor', component: 'Profile', created: 'Jul 5', updated: 'Jul 8', comments: 0 },
  { id: 'BUG-008', title: 'Sprint completion percentage rounds to 101%', description: 'Floating-point rounding causes the completion bar to show 101% in edge cases.', severity: 'low', status: 'resolved', assignee: 'Morgan Lee', avatar: 'ML', reporter: 'Alex Rivera', component: 'Sprints', created: 'Jul 4', updated: 'Jul 9', comments: 4 },
  { id: 'BUG-009', title: 'Table sort order reverses on page reload', description: 'Sort preferences are not persisted to the URL so navigating away resets column sort state.', severity: 'medium', status: 'closed', assignee: 'Sam Okafor', avatar: 'SO', reporter: 'Morgan Lee', component: 'Bug Tracker', created: 'Jul 3', updated: 'Jul 8', comments: 2 },
  { id: 'BUG-010', title: 'Sidebar collapses unexpectedly when focus moves to input', description: 'On Firefox, focusing an input inside the main content triggers the sidebar collapse animation.', severity: 'low', status: 'closed', assignee: 'Riley Thomas', avatar: 'RT', reporter: 'Casey Park', component: 'Layout', created: 'Jul 2', updated: 'Jul 7', comments: 3 },
]

// ── Dashboard ─────────────────────────────────────────────────────────────────
export const sprintVelocityData = [
  { sprint: 'S-14', planned: 34, completed: 28 },
  { sprint: 'S-15', planned: 40, completed: 38 },
  { sprint: 'S-16', planned: 36, completed: 34 },
  { sprint: 'S-17', planned: 42, completed: 45 },
  { sprint: 'S-18', planned: 38, completed: 36 },
  { sprint: 'S-19', planned: 44, completed: 41 },
  { sprint: 'S-20', planned: 46, completed: 39 },
]

export const burndownData = [
  { day: 'Day 1', remaining: 48, ideal: 48 },
  { day: 'Day 2', remaining: 44, ideal: 43 },
  { day: 'Day 3', remaining: 41, ideal: 38 },
  { day: 'Day 4', remaining: 35, ideal: 33 },
  { day: 'Day 5', remaining: 30, ideal: 28 },
  { day: 'Day 6', remaining: 29, ideal: 23 },
  { day: 'Day 7', remaining: 22, ideal: 18 },
  { day: 'Day 8', remaining: 18, ideal: 13 },
  { day: 'Day 9', remaining: 12, ideal: 8 },
  { day: 'Day 10', remaining: 9, ideal: 3 },
]

export const activityFeed = [
  { id: 1, user: 'Jamie Chen', avatar: 'JC', action: 'merged PR #284', target: 'feat/auth-refresh-token', time: '4m ago', type: 'merge' },
  { id: 2, user: 'Morgan Lee', avatar: 'ML', action: 'opened bug report', target: 'BUG-011: Form loses state on resize', time: '18m ago', type: 'bug' },
  { id: 3, user: 'Alex Rivera', avatar: 'AR', action: 'closed sprint', target: 'Sprint 19', time: '1h ago', type: 'sprint' },
  { id: 4, user: 'Casey Park', avatar: 'CP', action: 'deployed to staging', target: 'v2.4.1-rc.3', time: '2h ago', type: 'deploy' },
  { id: 5, user: 'Sam Okafor', avatar: 'SO', action: 'commented on', target: 'BUG-002: Velocity chart totals', time: '3h ago', type: 'comment' },
  { id: 6, user: 'Riley Thomas', avatar: 'RT', action: 'pushed 3 commits to', target: 'fix/sidebar-firefox', time: '4h ago', type: 'commit' },
]

// ── Reports charts ────────────────────────────────────────────────────────────
export const weeklyActivityData = [
  { week: 'W27', commits: 48, prs: 12, reviews: 19 },
  { week: 'W28', commits: 62, prs: 17, reviews: 24 },
  { week: 'W29', commits: 55, prs: 14, reviews: 21 },
  { week: 'W30', commits: 71, prs: 21, reviews: 28 },
  { week: 'W31', commits: 66, prs: 18, reviews: 25 },
  { week: 'W32', commits: 80, prs: 23, reviews: 31 },
]

export const bugsByComponent = [
  { component: 'Auth', open: 4, resolved: 8 },
  { component: 'Dashboard', open: 3, resolved: 5 },
  { component: 'Kanban', open: 2, resolved: 4 },
  { component: 'API', open: 5, resolved: 9 },
  { component: 'Reports', open: 1, resolved: 3 },
  { component: 'UI', open: 3, resolved: 6 },
]

export const teamProductivityData = [
  { name: 'Alex Rivera', score: 94 },
  { name: 'Jamie Chen', score: 88 },
  { name: 'Taylor Singh', score: 85 },
  { name: 'Morgan Lee', score: 97 },
  { name: 'Sam Okafor', score: 79 },
  { name: 'Riley Thomas', score: 82 },
]
