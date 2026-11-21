import { Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = { title: 'Sign Up – DevFlow AI' };

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Zap className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Create DevFlow Account</h1>
          <p className="text-sm text-muted-foreground">Start automating software engineering with AI agents</p>
        </div>

        <Card className="bg-card/70 border-border/70">
          <CardHeader>
            <CardTitle className="text-base">Get Started</CardTitle>
            <CardDescription>Registration and GitHub App linking in Phase 2</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" asChild>
              <Link href="/dashboard">Access Dashboard (Dev Preview)</Link>
            </Button>
            <div className="text-center text-xs text-muted-foreground">
              Phase 1 foundation: Registration UI shell
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
