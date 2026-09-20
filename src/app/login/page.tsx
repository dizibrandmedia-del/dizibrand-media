'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid email or password. Please use authorized credentials.');
      } else {
        if (callbackUrl && callbackUrl !== '/') {
          router.push(callbackUrl);
        } else {
          try {
            const sessionRes = await fetch('/api/auth/session');
            const session = await sessionRes.json();
            const role = session?.user?.role;
            if (role === 'SUPER_ADMIN' || role === 'MANAGEMENT') {
              router.push('/admin');
            } else if (role === 'CLIENT') {
              router.push('/portal');
            } else if (role) {
              router.push('/team');
            } else {
              router.push('/admin');
            }
          } catch {
            router.push('/admin');
          }
        }
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-brand-border bg-brand-navy-soft shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white">Sign In</CardTitle>
        <CardDescription className="text-brand-muted">Enter your credentials to access your portal</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-xs text-red-300 bg-red-950/50 border border-red-800 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Work Email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-brand-navy">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red-orange/10 via-brand-navy to-brand-navy -z-10" />

      <div className="w-full max-w-md space-y-8">
        <div className="text-center flex flex-col items-center">
          <Logo variant="full" size="lg" showTagline={true} />
          <h2 className="mt-6 text-xl font-semibold tracking-tight text-white">
            Sign In to Your Workspace
          </h2>
          <p className="mt-1 text-xs text-brand-muted">
            Unified access across Management, Team, and Client Portals.
          </p>
        </div>

        <React.Suspense fallback={<div className="text-center text-xs text-slate-400 py-8">Loading workspace authentication...</div>}>
          <LoginForm />
        </React.Suspense>
      </div>
    </div>
  );
}
