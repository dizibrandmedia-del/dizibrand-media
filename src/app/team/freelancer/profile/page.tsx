'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  User,
  ShieldCheck,
  Globe,
  Clock,
  DollarSign,
  Loader2,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

export default function FreelancerProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    skills: '',
    hourlyRate: 75,
    currency: 'USD',
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    availabilityHoursPerWeek: 30,
  });

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/team/freelancer/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data.profile);
        if (data.profile) {
          setFormData({
            skills: data.profile.skills?.join(', ') || '',
            hourlyRate: Number(data.profile.hourlyRate || 75),
            currency: data.profile.currency || 'USD',
            portfolioUrl: data.profile.portfolioUrl || '',
            githubUrl: data.profile.githubUrl || '',
            linkedinUrl: data.profile.linkedinUrl || '',
            availabilityHoursPerWeek: data.profile.availabilityHoursPerWeek || 30,
          });
        }
      }
    } catch (err) {
      console.error('Failed to load freelancer profile:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch('/api/team/freelancer/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          skills: skillsArray,
          hourlyRate: Number(formData.hourlyRate),
          availabilityHoursPerWeek: Number(formData.availabilityHoursPerWeek),
        }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        fetchProfile();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Specialist Profile & Availability
        </h1>
        <p className="text-sm text-slate-400">
          Manage your technical specialty tags, hourly billing rates, and weekly sprint capacity.
        </p>
      </div>

      {savedSuccess && (
        <Card className="bg-emerald-950/40 border-emerald-500/40">
          <CardContent className="pt-6 flex items-center gap-3 text-xs text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Profile and availability settings updated successfully.</span>
          </CardContent>
        </Card>
      )}

      {/* Profile Form */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-base">Contractor Credentials</CardTitle>
              <CardDescription className="text-slate-400">
                Staffed on client project sprints by DiziBrand Project Managers
              </CardDescription>
            </div>
            {profile?.isVetted ? (
              <Badge variant="success" className="gap-1">
                <ShieldCheck className="w-3 h-3" />
                Vetted Specialist
              </Badge>
            ) : (
              <Badge variant="pending">Under Verification</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">
                Core Skill Tags (comma-separated) *
              </label>
              <Input
                required
                placeholder="e.g. Next.js, Python AI, LLM Fine-Tuning, Tailwind CSS"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="bg-brand-black/50 border-brand-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1">Hourly Rate *</label>
                <Input
                  type="number"
                  required
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Currency</label>
                <Select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                >
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Weekly Availability (hours) *</label>
              <Input
                type="number"
                required
                min={0}
                max={80}
                value={formData.availabilityHoursPerWeek}
                onChange={(e) =>
                  setFormData({ ...formData, availabilityHoursPerWeek: Number(e.target.value) })
                }
                className="bg-brand-black/50 border-brand-border"
              />
              <span className="text-[10px] text-slate-500 mt-1 block font-mono">
                Used by PMs to allocate sprint tasks and deliverable milestones.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1">Portfolio / Personal Site</label>
                <Input
                  type="url"
                  placeholder="https://..."
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">GitHub Profile</label>
                <Input
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-brand-border">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold"
              >
                {isSaving ? 'Saving Profile...' : 'Update Specialist Profile'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
