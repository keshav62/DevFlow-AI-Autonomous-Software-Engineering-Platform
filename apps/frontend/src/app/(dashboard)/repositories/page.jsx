import { GitBranch, Plus, Lock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = { title: 'Repositories – DevFlow AI' };

export default function RepositoriesPage() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Repositories</h2>
          <p className="text-sm text-muted-foreground">Connected GitHub codebases for autonomous AI analysis.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Connect Repository
        </Button>
      </div>

      <Card className="bg-card/70 border-border/70">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-primary" />
            Repository Catalog
          </CardTitle>
          <CardDescription>
            Repositories will be dynamically imported using the GitHub App integration in Phase 2.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/80 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <GitBranch className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No Repositories Synchronized Yet</h3>
            <p className="text-sm text-muted-foreground max-w-md mt-1 mb-5">
              Phase 1 provides the database models and API shells. GitHub App authentication and repo sync will be enabled in Phase 2.
            </p>
            <Button variant="outline" size="sm">
              View Phase 2 Specs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
