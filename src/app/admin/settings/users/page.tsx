'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Shield,
  Plus,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Search,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  isActive: boolean;
  createdAt: string;
  company?: { id: string; name: string } | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Create User modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'PROJECT_MANAGER',
    password: '',
    phone: '',
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (roleFilter) params.set('role', roleFilter);

      const res = await fetch(`/api/admin/settings/users?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      const res = await fetch(`/api/admin/settings/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update role');
      }
    } catch (err) {
      console.error('Failed to update role:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleActive = async (user: UserItem) => {
    setUpdatingId(user.id);
    try {
      const res = await fetch(`/api/admin/settings/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/settings/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowCreateModal(false);
        setFormData({
          name: '',
          email: '',
          role: 'PROJECT_MANAGER',
          password: '',
          phone: '',
        });
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create user');
      }
    } catch (err) {
      console.error('Error creating user:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'border-red-500/40 text-red-400 bg-red-500/10';
      case 'MANAGEMENT':
        return 'border-brand-orange/40 text-brand-orange bg-brand-orange/10';
      case 'SALES':
        return 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10';
      case 'PROJECT_MANAGER':
        return 'border-blue-500/40 text-blue-400 bg-blue-500/10';
      case 'EMPLOYEE':
        return 'border-purple-500/40 text-purple-400 bg-purple-500/10';
      case 'FREELANCER':
        return 'border-amber-500/40 text-amber-400 bg-amber-500/10';
      case 'CLIENT':
        return 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10';
      default:
        return 'border-slate-700 text-slate-400 bg-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Settings
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            User Accounts & RBAC Governance
          </h1>
          <p className="text-sm text-slate-400">
            Enforce role-based access control, manage internal team members, and oversee client accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            disabled={loading}
            className="border-brand-border text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add User
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <Input
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-brand-black/50 border-brand-border text-xs"
              />
            </div>

            <div>
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-brand-black/50 border-brand-border text-xs"
              >
                <option value="">All Platform Roles</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="MANAGEMENT">Management</option>
                <option value="SALES">Sales</option>
                <option value="PROJECT_MANAGER">Project Manager</option>
                <option value="EMPLOYEE">Employee / Specialist</option>
                <option value="FREELANCER">Freelancer</option>
                <option value="CLIENT">Client</option>
              </Select>
            </div>

            <div className="flex items-center justify-end text-xs text-slate-400 font-mono">
              Total {users.length} registered accounts
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">User & Email</th>
                  <th className="py-3.5 px-4 font-semibold">Platform Role</th>
                  <th className="py-3.5 px-4 font-semibold">Account State</th>
                  <th className="py-3.5 px-4 font-semibold">Linked Org</th>
                  <th className="py-3.5 px-4 font-semibold">Created</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Role Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-brand-orange" />
                        <span>Loading user accounts...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No user accounts found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const isBusy = updatingId === user.id;

                    return (
                      <tr key={user.id} className="hover:bg-brand-surface/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-xs text-slate-400 font-mono">{user.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleActive(user)}
                            disabled={isBusy}
                            className="inline-flex items-center gap-1 text-xs cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            {user.isActive ? (
                              <Badge variant="success" className="gap-1 py-0 px-1.5 text-[10px]">
                                <CheckCircle className="w-2.5 h-2.5" />
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="gap-1 py-0 px-1.5 text-[10px]">
                                <XCircle className="w-2.5 h-2.5" />
                                Suspended
                              </Badge>
                            )}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-400">
                          {user.company?.name || <span className="text-slate-600 font-mono">DiziBrand Internal</span>}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-400 font-mono">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Select
                            value={user.role}
                            disabled={isBusy}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="w-40 ml-auto bg-brand-black/50 border-brand-border text-xs py-1"
                          >
                            <option value="SUPER_ADMIN">Super Admin</option>
                            <option value="MANAGEMENT">Management</option>
                            <option value="SALES">Sales</option>
                            <option value="PROJECT_MANAGER">Project Manager</option>
                            <option value="EMPLOYEE">Employee</option>
                            <option value="FREELANCER">Freelancer</option>
                            <option value="CLIENT">Client</option>
                          </Select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-base font-bold text-white">Create New User Account</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="block text-slate-300 mb-1">Full Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Email Address *</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Platform Role *</label>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                >
                  <option value="PROJECT_MANAGER">Project Manager</option>
                  <option value="SALES">Sales</option>
                  <option value="EMPLOYEE">Employee / Specialist</option>
                  <option value="FREELANCER">Freelancer</option>
                  <option value="MANAGEMENT">Management</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="CLIENT">Client</option>
                </Select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Initial Password (optional)</label>
                <Input
                  type="password"
                  placeholder="Defaults to DiziBrand2026!Temporary"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-brand-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="border-brand-border text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold"
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
