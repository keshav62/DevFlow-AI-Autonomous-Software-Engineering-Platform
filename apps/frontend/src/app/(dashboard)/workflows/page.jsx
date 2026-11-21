import { Workflow, Play, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = { title: 'Workflows – DevFlow AI' };

export default function WorkflowsPage() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Workflows</h2>
          <p className="text-sm text-muted-foreground">Manage multi-agent engineering workflows and execution history.</p>
        </div>
        <Button className="gap-2">
          <Play className="h-4 w-4" />
          Trigger Workflow
        </Button>
      </div>

      <Card className="bg-card/70 border-border/70">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Workflow className="h-4 w-4 text-primary" />
            Execution Pipeline
          </CardTitle>
          <CardDescription>
            Background execution queue managed by BullMQ & Redis (`devflow-workflows`).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/80 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Workflow className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Queue Ready for Agent Jobs</h3>
            <p className="text-sm text-muted-foreground max-w-md mt-1 mb-5">
              BullMQ queue connectivity has been established and verified in the backend. Multi-agent LangGraph workflows will begin execution in Phase 3.
            </p>
            <Badge variant="success">BullMQ Active</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
