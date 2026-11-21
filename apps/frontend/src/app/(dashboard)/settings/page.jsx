import { Settings, Shield, Bell, Palette, Key, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = { title: 'Settings – DevFlow AI' };

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Workspace Settings</h2>
        <p className="text-sm text-muted-foreground">Configure DevFlow AI platform preferences and integrations.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/70 border-border/70">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Authentication & Security
            </CardTitle>
            <CardDescription>Clerk single sign-on and API keys</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Authentication infrastructure is prepared for Clerk integration in Phase 2.</p>
            <Badge variant="secondary">Phase 2 Target</Badge>
          </CardContent>
        </Card>

        <Card className="bg-card/70 border-border/70">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              Database & Storage
            </CardTitle>
            <CardDescription>PostgreSQL with pgvector & Redis configuration</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>PostgreSQL 16 with pgvector extension enabled for future embeddings.</p>
            <Badge variant="success">PostgreSQL 16 + pgvector</Badge>
          </CardContent>
        </Card>

        <Card className="bg-card/70 border-border/70">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" />
              AI Model Providers
            </CardTitle>
            <CardDescription>OpenAI & Google Gemini credentials</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Model credentials remain strictly isolated on the internal FastAPI service.</p>
            <Badge variant="secondary">Isolated Backend</Badge>
          </CardContent>
        </Card>

        <Card className="bg-card/70 border-border/70">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              User Interface Theme
            </CardTitle>
            <CardDescription>Modern dark developer theme</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Tailwind CSS custom theme with dark palette and professional spacing.</p>
            <Badge variant="default">Dark Mode Enabled</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
