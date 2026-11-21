'use client';

import { useBackendHealth } from '@/hooks/useHealth';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

export function BackendStatus() {
  const { data, isLoading, isError } = useBackendHealth();

  if (isLoading) {
    return (
      <Badge variant="secondary" className="gap-1.5 font-normal">
        <Activity className="h-3 w-3 animate-pulse text-muted-foreground" />
        Checking backend...
      </Badge>
    );
  }

  if (isError || !data?.data?.status) {
    return (
      <Badge variant="error" className="gap-1.5 font-normal">
        <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
        Backend Offline
      </Badge>
    );
  }

  return (
    <Badge variant="success" className="gap-1.5 font-normal">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      Backend Connected
    </Badge>
  );
}
