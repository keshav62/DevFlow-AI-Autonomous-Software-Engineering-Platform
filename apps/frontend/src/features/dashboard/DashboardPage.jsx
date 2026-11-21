'use client';

import {
  GitBranch,
  Workflow,
  CheckCircle,
  XCircle,
  Bot,
  Clock,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MOCK_STATS,
  MOCK_RECENT_REPOS,
  MOCK_RECENT_WORKFLOWS,
  MOCK_AI_AGENTS,
} from './mockData';

function StatusBadge({ status }) {
  const map = {
    COMPLETED: 'success',
    RUNNING: 'default',
    FAILED: 'error',
    PENDING: 'warning',
    idle: 'secondary',
  };
  return <Badge variant={map[status] ?? 'secondary'}>{status}</Badge>;
}

export function DashboardPage() {
  return (
    <div className="space-y-6 p-8">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Engineering Overview</h2>
        <p className="text-sm text-muted-foreground">
          Autonomous multi-agent activity, repository telemetry, and background workflow pipelines.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Repositories"
          value={MOCK_STATS.totalRepositories}
          icon={GitBranch}
          subtitle="Connected via GitHub App"
          trend={12}
        />
        <StatCard
          title="Active Workflows"
          value={MOCK_STATS.activeWorkflows}
          icon={Workflow}
          subtitle="Currently evaluating in Redis"
        />
        <StatCard
          title="Completed Workflows"
          value={MOCK_STATS.completedWorkflows}
          icon={CheckCircle}
          subtitle="All time successful runs"
          trend={24}
        />
        <StatCard
          title="Failed Workflows"
          value={MOCK_STATS.failedWorkflows}
          icon={XCircle}
          subtitle="Requires developer inspection"
          trend={-10}
        />
      </div>

      {/* Two Column Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Repositories */}
        <Card className="bg-card/70 border-border/70">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-primary" />
                Connected Repositories
              </CardTitle>
              <CardDescription>Recently synchronized codebases</CardDescription>
            </div>
            <Badge variant="outline" className="text-[11px]">4 Total</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_RECENT_REPOS.map((repo) => (
              <div
                key={repo.id}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3 hover:bg-accent/40 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{repo.name}</p>
                  <p className="text-xs text-muted-foreground">{repo.fullName} &middot; {repo.defaultBranch}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{repo.lastWorkflow}</span>
                  <StatusBadge status={repo.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Workflows */}
        <Card className="bg-card/70 border-border/70">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Recent Workflow Executions
              </CardTitle>
              <CardDescription>Live and completed multi-agent tasks</CardDescription>
            </div>
            <Badge variant="outline" className="text-[11px]">BullMQ Queued</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_RECENT_WORKFLOWS.map((wf) => (
              <div
                key={wf.id}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3 hover:bg-accent/40 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{wf.type}</p>
                  <p className="text-xs text-muted-foreground">{wf.repository} &middot; {wf.startedAt}</p>
                </div>
                <StatusBadge status={wf.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Agents Status */}
      <Card className="bg-card/70 border-border/70">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                Specialized AI Agent Swarm
              </CardTitle>
              <CardDescription>
                Multi-agent orchestration powered by LangGraph (Phase 2 & 3 initialization)
              </CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1 font-mono text-[11px]">
              Foundation Ready
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_AI_AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="rounded-lg border border-border/60 bg-background/40 p-4 space-y-2 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{agent.name}</span>
                  <StatusBadge status={agent.status} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{agent.description}</p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/40">
                  <span>Target: {agent.phase}</span>
                  <span className="text-primary/80 font-mono">STANDBY</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
