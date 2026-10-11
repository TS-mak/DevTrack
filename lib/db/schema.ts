import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

// ─── Better Auth tables (do not rename columns) ───────────────────────────────

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
})

// ─── App tables ───────────────────────────────────────────────────────────────

export const pipelineRun = pgTable("pipeline_run", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull(),
  repoName: text("repoName").notNull(),
  branch: text("branch").notNull().default("main"),
  status: text("status").notNull().default("pending"),
  stage: text("stage").notNull().default("build"),
  duration: integer("duration"),
  triggeredBy: text("triggeredBy"),
  commitSha: text("commitSha"),
  commitMessage: text("commitMessage"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const codeQualitySnapshot = pgTable("code_quality_snapshot", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull(),
  repoName: text("repoName").notNull(),
  coverage: numeric("coverage", { precision: 5, scale: 2 }),
  technicalDebt: integer("technicalDebt"),
  vulnerabilities: integer("vulnerabilities"),
  codeSmells: integer("codeSmells"),
  duplications: numeric("duplications", { precision: 5, scale: 2 }),
  complexity: integer("complexity"),
  snapshotAt: timestamp("snapshotAt").notNull().defaultNow(),
})

export const githubRepo = pgTable("github_repo", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull(),
  name: text("name").notNull(),
  fullName: text("fullName").notNull(),
  description: text("description"),
  language: text("language"),
  stars: integer("stars").default(0),
  forks: integer("forks").default(0),
  openPRs: integer("openPRs").default(0),
  openIssues: integer("openIssues").default(0),
  defaultBranch: text("defaultBranch").default("main"),
  lastCommitAt: timestamp("lastCommitAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const milestone = pgTable("milestone", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  quarter: text("quarter").notNull(),
  status: text("status").notNull().default("planned"),
  progress: integer("progress").default(0),
  dueDate: timestamp("dueDate"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const developerProfile = pgTable("developer_profile", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().unique(),
  bio: text("bio"),
  role: text("role").default("Engineer"),
  department: text("department"),
  location: text("location"),
  timezone: text("timezone"),
  github: text("github"),
  commits: integer("commits").default(0),
  issuesResolved: integer("issuesResolved").default(0),
  prsmerged: integer("prsmerged").default(0),
  linesAdded: integer("linesAdded").default(0),
  linesRemoved: integer("linesRemoved").default(0),
  languages: jsonb("languages").$type<string[]>().default([]),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})
