import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function StatCard({ title, value, subtitle, icon: Icon, trend, className }) {
  return (
    <Card className={cn('bg-card/70 backdrop-blur border-border/70', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {Icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
        {trend !== undefined && (
          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <span className={cn('font-medium', trend >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
            <span className="text-muted-foreground">vs last cycle</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
