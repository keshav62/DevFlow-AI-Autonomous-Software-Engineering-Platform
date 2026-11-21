import { Users, UserPlus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = { title: 'Team – DevFlow AI' };

export default function TeamPage() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Organization Members</h2>
          <p className="text-sm text-muted-foreground">Manage collaborator roles and workspace permissions.</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <Card className="bg-card/70 border-border/70">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Member Directory
          </CardTitle>
          <CardDescription>
            Backed by PostgreSQL `OrganizationMember` table with role-based access control.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-background/40">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                  DA
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Workspace Founder (You)</p>
                  <p className="text-xs text-muted-foreground">developer@devflow.ai</p>
                </div>
              </div>
              <Badge variant="default">OWNER</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
