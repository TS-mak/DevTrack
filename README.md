Author: Thembisile Makhubu

# DevTrack

DevTrack is a dark, modern software development management workspace built with Next.js. It brings sprint planning, issue tracking, team visibility, engineering analytics, and authentication into one focused interface.

## Features

- Dashboard with sprint health, velocity, burndown, and recent activity
- Kanban board with drag-and-drop task management
- Bug tracker with filtering, priorities, statuses, and issue details
- Team directory with developer and role information
- Reports and engineering charts
- Email/password authentication with Better Auth
- Neon Postgres persistence through Drizzle ORM
- Accessible UI built from shadcn/ui components
- Responsive dark-first design

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui and Base UI
- Better Auth
- Neon Postgres
- Drizzle ORM
- Recharts
- dnd-kit
- Lucide React

## Routes

| Route | Description |
| --- | --- |
| `/login` | Sign in with email and password |
| `/register` | Create an account |
| `/dashboard` | Project overview and engineering health |
| `/kanban` | Sprint Kanban board |
| `/bugs` | Bug and issue tracker |
| `/team` | Team member directory |
| `/reports` | Engineering reports and charts |

## Getting started

### Requirements

- Node.js 20 or newer
- pnpm
- A Neon Postgres database

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Create a `.env.local` file with:

```env
DATABASE_URL=your_neon_database_url
BETTER_AUTH_SECRET=your_random_secret_at_least_32_characters
```

`BETTER_AUTH_SECRET` should be a long, random value used to sign Better Auth sessions. Never commit `.env.local` or production secrets to source control.

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
pnpm dev       # Start the development server
pnpm build     # Create a production build
pnpm start     # Start the production server
pnpm lint      # Run ESLint
```

## Database

Authentication and application data use Neon Postgres with Drizzle ORM. Better Auth uses the shared database connection for users, sessions, accounts, and verification records. Application records are scoped by `userId` in server-side queries.

Database schema changes should be applied through the project's Neon integration. Keep application queries parameterized and ensure user-owned records are always filtered by the authenticated user's ID.

## Project structure

```text
app/
  (app)/                 Protected application pages
  api/auth/[...all]/     Better Auth route handler
  login/                 Sign-in page
  register/              Registration page
components/
  dashboard/             Dashboard cards, charts, and activity
  kanban/                Kanban board components
  ui/                    Shared shadcn/ui primitives
lib/
  auth.ts                Better Auth server configuration
  auth-client.ts         Better Auth browser client
  db/                    Drizzle client and schema
```

## Security notes

- Keep authentication secrets in environment variables.
- Do not expose `DATABASE_URL` to client components.
- Validate and authorize mutations on the server.
- Scope user-owned database queries by the authenticated `userId`.
- Use HTTPS and secure cookies in deployed environments.

## Deployment

The project is designed for deployment on Vercel. Configure the Neon integration and required environment variables for the appropriate Vercel environments, then deploy through Vercel or the project's connected Git repository.

## License

This project is licensed under the [MIT License](LICENSE).
