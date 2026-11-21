import { Code2, GitPullRequest, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = { title: 'Code Reviews – DevFlow AI' };

export default function ReviewsPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Code Reviews</h2>
        <p className="text-sm text-muted-foreground">Autonomous code reviews, diff annotations, and PR summaries.</p>
      </div>

      <Card className="bg-card/70 border-border/70">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            Review Queue
          </CardTitle>
          <CardDescription>
            Automated pull request analysis and comment dispatch.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/80 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No Pending PRs</h3>
            <p className="text-sm text-muted-foreground max-w-md mt-1">
              Automated review pipelines activate when GitHub webhooks receive PR synchronization events.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
