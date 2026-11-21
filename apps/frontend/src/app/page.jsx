import Link from 'next/link';
import { Zap, GitBranch, Workflow, Shield, Code2, Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const features = [
    {
      icon: Bot,
      title: 'Multi-Agent Swarm',
      description: 'Specialized autonomous AI agents for codebase understanding, code generation, and test generation.',
    },
    {
      icon: GitBranch,
      title: 'GitHub Native Integration',
      description: 'Synchronize repositories, inspect diffs, and automatically submit reviewed Pull Requests.',
    },
    {
      icon: Code2,
      title: 'Automated Code Review',
      description: 'Context-aware code reviews with syntax validation and semantic bug identification.',
    },
    {
      icon: Workflow,
      title: 'LangGraph Orchestration',
      description: 'Stateful multi-actor workflows designed for complex software engineering tasks.',
    },
    {
      icon: Shield,
      title: 'Security & SAST Analysis',
      description: 'Pre-commit vulnerability scanning, credential detection, and dependency auditing.',
    },
    {
      icon: Zap,
      title: 'High-Throughput Queues',
      description: 'Built on PostgreSQL 16 with pgvector and Redis 7 with BullMQ background execution.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/70 backdrop-blur sticky top-0 z-50 bg-background/80">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              <Zap className="h-4 w-4" />
            </div>
            <span className="font-bold text-foreground tracking-tight text-lg">DevFlow AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Launch Platform</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Phase 1 Foundation – Complete & Active
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl sm:leading-tight">
          Autonomous Software <br />
          <span className="text-primary">Engineering Platform</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          DevFlow AI coordinates specialized multi-agent AI systems to automate software development —
          from bug detection and code generation to automated testing and GitHub Pull Requests.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/dashboard">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="bg-card/70 border-border/70 hover:border-primary/40 transition-colors">
                <CardContent className="p-6 space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/70 py-8 text-center text-xs text-muted-foreground">
        DevFlow AI &middot; Autonomous Software Engineering Platform &middot; Phase 1 Complete
      </footer>
    </div>
  );
}
