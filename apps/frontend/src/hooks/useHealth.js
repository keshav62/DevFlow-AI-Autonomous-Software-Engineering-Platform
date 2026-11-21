import { useQuery } from '@tanstack/react-query';
import { getBackendHealth } from '@/services/health.service';

export function useBackendHealth() {
  return useQuery({
    queryKey: ['health', 'backend'],
    queryFn: getBackendHealth,
    refetchInterval: 15000,
    retry: 1,
  });
}
