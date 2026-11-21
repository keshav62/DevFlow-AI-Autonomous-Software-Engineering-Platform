'use client';

import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackendStatus } from '@/components/shared/BackendStatus';

export function TopNav({ title }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
      <div className="flex items-center gap-3">
        <BackendStatus />
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground">
          DA
        </div>
      </div>
    </header>
  );
}
