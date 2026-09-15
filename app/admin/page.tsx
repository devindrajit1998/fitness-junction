'use client';

import React, { useState, useEffect, useMemo, useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Dumbbell,
  Settings,
  Download,
  Upload,
  LogOut,
  ExternalLink,
  Plus,
  Search,
  Filter,
  Trash2,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Award,
  Bell,
  Sparkles,
  Menu,
  X,
  RefreshCw,
  Eye,
  Check,
} from 'lucide-react';
import {
  DataStore,
  Lead,
  Member,
  FitnessClass,
  ServiceItem,
  Trainer,
  ClubSettings,
} from '@/lib/dataStore';

type AdminTab = 'overview' | 'leads' | 'members' | 'classes' | 'services' | 'trainers' | 'settings' | 'backup';

const emptySubscribe = () => () => {};

export default function AdminDashboardPage() {
  const router = useRouter();
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(() =>
    typeof window !== 'undefined' ? DataStore.auth.getUser() : null
  );

  // Data states
  const [leads, setLeads] = useState<Lead[]>(() =>
    typeof window !== 'undefined' ? DataStore.leads.getAll() : []
  );
  const [members, setMembers] = useState<Member[]>(() =>
    typeof window !== 'undefined' ? DataStore.members.getAll() : []
  );
  const [classes, setClasses] = useState<FitnessClass[]>(() =>
    typeof window !== 'undefined' ? DataStore.classes.getAll() : []
  );
  const [services, setServices] = useState<ServiceItem[]>(() =>
    typeof window !== 'undefined' ? DataStore.services.getAll() : []
  );
  const [trainers, setTrainers] = useState<Trainer[]>(() =>
    typeof window !== 'undefined' ? DataStore.trainers.getAll() : []
  );
  const [settings, setSettings] = useState<ClubSettings | null>(() =>
    typeof window !== 'undefined' ? DataStore.settings.get() : null
  );

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'new' | 'contacted' | 'converted'>('all');

  // Modals
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [addClassModalOpen, setAddClassModalOpen] = useState(false);
  const [viewLeadDetail, setViewLeadDetail] = useState<Lead | null>(null);

  // Form states
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Personal Training',
    date: '',
    notes: '',
  });

  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Monthly Pro' as Member['plan'],
    status: 'active' as Member['status'],
    expiryMonths: '6',
  });

  const [newClassForm, setNewClassForm] = useState({
    title: '',
    trainer: 'David Lee',
    day: 'Monday' as FitnessClass['day'],
    time: '07:00 AM - 08:00 AM',
    duration: '60 min',
    capacity: 20,
    level: 'All Levels' as FitnessClass['level'],
    category: 'HIIT' as FitnessClass['category'],
  });

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const refreshAllData = useCallback(() => {
    setLeads(DataStore.leads.getAll());
    setMembers(DataStore.members.getAll());
    setClasses(DataStore.classes.getAll());
    setServices(DataStore.services.getAll());
    setTrainers(DataStore.trainers.getAll());
    setSettings(DataStore.settings.get());
  }, []);

  // Auth check
  useEffect(() => {
    if (!DataStore.auth.isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    DataStore.auth.logout();
    router.push('/login');
  };

  // Lead actions
  const handleUpdateLeadStatus = (id: number, status: Lead['status']) => {
    DataStore.leads.updateStatus(id, status);
    setLeads(DataStore.leads.getAll());
    showToast(`Lead status updated to ${status.toUpperCase()}`);
    if (viewLeadDetail && viewLeadDetail.id === id) {
      setViewLeadDetail({ ...viewLeadDetail, status });
    }
  };

  const handleDeleteLead = (id: number) => {
    if (window.confirm('Are you sure you want to remove this lead?')) {
      DataStore.leads.delete(id);
      setLeads(DataStore.leads.getAll());
      showToast('Lead deleted successfully');
      if (viewLeadDetail?.id === id) setViewLeadDetail(null);
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) return;

    DataStore.leads.add({
      name: newLeadForm.name,
      phone: newLeadForm.phone,
      email: newLeadForm.email,
      interest: newLeadForm.interest,
      date: newLeadForm.date,
      notes: newLeadForm.notes,
      status: 'new',
      source: 'Admin Manual Entry',
    });

    setLeads(DataStore.leads.getAll());
    setAddLeadModalOpen(false);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      interest: 'Personal Training',
      date: '',
      notes: '',
    });
    showToast('New lead added to inbox');
  };

  // Member actions
  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberForm.name || !newMemberForm.email) return;

    const now = new Date();
    const months = parseInt(newMemberForm.expiryMonths, 10) || 3;
    const expiry = new Date(now.setMonth(now.getMonth() + months));

    DataStore.members.add({
      name: newMemberForm.name,
      email: newMemberForm.email,
      phone: newMemberForm.phone,
      plan: newMemberForm.plan,
      status: newMemberForm.status,
      joinedDate: new Date().toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      attendanceCount: 1,
    });

    setMembers(DataStore.members.getAll());
    setAddMemberModalOpen(false);
    setNewMemberForm({
      name: '',
      email: '',
      phone: '',
      plan: 'Monthly Pro',
      status: 'active',
      expiryMonths: '6',
    });
    showToast('New member registered successfully');
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Delete this member record?')) {
      DataStore.members.delete(id);
      setMembers(DataStore.members.getAll());
      showToast('Member removed');
    }
  };

  const handleCheckinMember = (id: string) => {
    const all = [...members];
    const item = all.find((m) => m.id === id);
    if (item) {
      item.attendanceCount += 1;
      DataStore.members.saveAll(all);
      setMembers(all);
      showToast(`Checked in ${item.name}! Attendance: ${item.attendanceCount}`);
    }
  };

  // Class actions
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassForm.title) return;

    DataStore.classes.add({
      title: newClassForm.title,
      trainer: newClassForm.trainer,
      day: newClassForm.day,
      time: newClassForm.time,
      duration: newClassForm.duration,
      capacity: Number(newClassForm.capacity),
      enrolled: 1,
      level: newClassForm.level,
      category: newClassForm.category,
    });

    setClasses(DataStore.classes.getAll());
    setAddClassModalOpen(false);
    setNewClassForm({
      title: '',
      trainer: 'David Lee',
      day: 'Monday',
      time: '07:00 AM - 08:00 AM',
      duration: '60 min',
      capacity: 20,
      level: 'All Levels',
      category: 'HIIT',
    });
    showToast('Class scheduled successfully');
  };

  const handleDeleteClass = (id: string) => {
    if (window.confirm('Cancel and delete this scheduled class?')) {
      DataStore.classes.delete(id);
      setClasses(DataStore.classes.getAll());
      showToast('Class cancelled');
    }
  };

  // Settings action
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    DataStore.settings.save(settings);
    showToast('Club settings updated successfully');
  };

  // Export JSON
  const handleExportJSON = () => {
    const json = DataStore.exportAllJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitwell_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Site data backup downloaded');
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = DataStore.importJSON(content);
        if (ok) {
          refreshAllData();
          showToast('Data imported and synced successfully');
        } else {
          alert('Invalid JSON backup file format');
        }
      }
    };
    reader.readAsText(file);
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesFilter = leadStatusFilter === 'all' || l.status === leadStatusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        l.interest.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [leads, leadStatusFilter, searchQuery]);

  // Metrics
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const convertedLeadsCount = leads.filter((l) => l.status === 'converted').length;
  const totalRevenue = members.length * 39 + 399 * 2;

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#131824] flex items-center justify-center text-white font-['Rajdhani',sans-serif]">
        <div className="flex items-center gap-3 text-lg">
          <div className="w-6 h-6 border-2 border-[#6EFF8F] border-t-transparent rounded-full animate-spin" />
          <span>Authenticating Fitwell Management Console...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131824] text-white flex font-['Rubik',sans-serif] selection:bg-[#6EFF8F] selection:text-[#131824]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#050505] border border-[#6EFF8F] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn text-sm">
          <CheckCircle className="w-5 h-5 text-[#6EFF8F] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-40 w-72 bg-[#050505] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/images/logo.png" alt="SPARK GYM" className="h-8 w-auto object-contain" />
            </Link>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-[#6EFF8F]/20 text-[#6EFF8F] text-[10px] font-bold uppercase tracking-wider rounded border border-[#6EFF8F]/40">
                Admin
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-[#A3A3A3] hover:text-white"
                aria-label="Close Sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Live Website Link */}
          <div className="px-4 py-3 border-b border-white/5 bg-[#131824]/50">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-[#6EFF8F]/15 text-xs text-[#A3A3A3] hover:text-[#6EFF8F] rounded-lg transition-all group"
            >
              <span className="font-semibold flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-[#6EFF8F]" />
                <span>View Live Site</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-500 group-hover:text-[#6EFF8F]">
                fitwell.club ↗
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-sm">
            <button
              onClick={() => {
                setActiveTab('overview');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#6EFF8F] text-[#131824] font-bold shadow-lg shadow-[#6EFF8F]/15'
                  : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('leads');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'leads'
                  ? 'bg-[#6EFF8F] text-[#131824] font-bold shadow-lg shadow-[#6EFF8F]/15'
                  : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Leads & Inquiries</span>
              </div>
              {newLeadsCount > 0 && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    activeTab === 'leads' ? 'bg-[#131824] text-[#6EFF8F]' : 'bg-[#6EFF8F] text-[#131824]'
                  }`}
                >
                  {newLeadsCount} new
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('members');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'members'
                  ? 'bg-[#6EFF8F] text-[#131824] font-bold shadow-lg shadow-[#6EFF8F]/15'
                  : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4" />
                <span>Club Members</span>
              </div>
              <span className="text-xs text-[#A3A3A3] font-mono">{members.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('classes');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'classes'
                  ? 'bg-[#6EFF8F] text-[#131824] font-bold shadow-lg shadow-[#6EFF8F]/15'
                  : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Class Timetable</span>
              </div>
              <span className="text-xs text-[#A3A3A3] font-mono">{classes.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('services');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'services'
                  ? 'bg-[#6EFF8F] text-[#131824] font-bold shadow-lg shadow-[#6EFF8F]/15'
                  : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Dumbbell className="w-4 h-4" />
                <span>Services & Pricing</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('trainers');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'trainers'
                  ? 'bg-[#6EFF8F] text-[#131824] font-bold shadow-lg shadow-[#6EFF8F]/15'
                  : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4" />
                <span>Trainers Roster</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('settings');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#6EFF8F] text-[#131824] font-bold shadow-lg shadow-[#6EFF8F]/15'
                  : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Club Settings</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('backup');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'backup'
                  ? 'bg-[#6EFF8F] text-[#131824] font-bold shadow-lg shadow-[#6EFF8F]/15'
                  : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4" />
                <span>Backup & Restore</span>
              </div>
            </button>
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-[#131824]/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#6EFF8F] text-[#131824] flex items-center justify-center font-bold font-['Rajdhani',sans-serif] text-sm">
                IG
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Indrajit Ghosh'}</p>
                <p className="text-[10px] text-[#A3A3A3] truncate">{currentUser?.email || 'admin@fitwell.com'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-[#A3A3A3] hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-gray-500 flex items-center justify-between pt-2 border-t border-white/5">
            <span>Fitwell Console</span>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[#A3A3A3] hover:text-white rounded-lg hover:bg-white/5"
              aria-label="Toggle navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider text-white">
                {activeTab === 'overview' && 'Executive Dashboard'}
                {activeTab === 'leads' && 'Leads & Inquiry Management'}
                {activeTab === 'members' && 'Member Directory'}
                {activeTab === 'classes' && 'Class Timetable & Capacity'}
                {activeTab === 'services' && 'Services & Membership Tiers'}
                {activeTab === 'trainers' && 'Certified Trainers Roster'}
                {activeTab === 'settings' && 'Club Configuration & Details'}
                {activeTab === 'backup' && 'System Backup & Export'}
              </h1>
              <p className="text-xs text-[#A3A3A3] hidden sm:block">
                Fitwell Fitness & Athletics Club Management
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={refreshAllData}
              title="Refresh Data"
              className="p-2 bg-white/5 hover:bg-white/10 text-[#A3A3A3] hover:text-white rounded-xl text-xs transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {activeTab === 'leads' && (
              <button
                onClick={() => setAddLeadModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#6EFF8F] hover:bg-[#c4e600] text-[#131824] font-bold text-xs font-['Rajdhani',sans-serif] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#6EFF8F]/15"
              >
                <Plus className="w-4 h-4" />
                <span>Add Walk-In Lead</span>
              </button>
            )}

            {activeTab === 'members' && (
              <button
                onClick={() => setAddMemberModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#6EFF8F] hover:bg-[#c4e600] text-[#131824] font-bold text-xs font-['Rajdhani',sans-serif] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#6EFF8F]/15"
              >
                <Plus className="w-4 h-4" />
                <span>Register Member</span>
              </button>
            )}

            {activeTab === 'classes' && (
              <button
                onClick={() => setAddClassModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#6EFF8F] hover:bg-[#c4e600] text-[#131824] font-bold text-xs font-['Rajdhani',sans-serif] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#6EFF8F]/15"
              >
                <Plus className="w-4 h-4" />
                <span>Add Class</span>
              </button>
            )}
          </div>
        </header>

        {/* TAB CONTENTS */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* ==================== TAB: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Top KPI Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Metric 1 */}
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#A3A3A3]">
                      Total Inquiries
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#6EFF8F]/10 text-[#6EFF8F] flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-['Rajdhani',sans-serif] text-white">
                      {leads.length}
                    </span>
                    <span className="text-xs text-[#6EFF8F] font-semibold flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +18% this wk
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {newLeadsCount} require immediate call back
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#A3A3A3]">
                      Active Members
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <UserCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-['Rajdhani',sans-serif] text-white">
                      {members.length}
                    </span>
                    <span className="text-xs text-green-400 font-semibold flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> 98% retention
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {convertedLeadsCount} converted from web leads
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#A3A3A3]">
                      Monthly Run-Rate
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#6EFF8F]/10 text-[#6EFF8F] flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-['Rajdhani',sans-serif] text-white">
                      ${totalRevenue.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#6EFF8F] font-semibold">Projected</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Across Pro & Elite recurring plans
                  </p>
                </div>

                {/* Metric 4 */}
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#A3A3A3]">
                      Daily Classes
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-['Rajdhani',sans-serif] text-white">
                      {classes.length}
                    </span>
                    <span className="text-xs text-purple-400 font-semibold">Sessions</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Avg 89% capacity utilization
                  </p>
                </div>
              </div>

              {/* Two Column Grid: Priority Leads vs Today's Classes */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Inquiries Panel (2 cols) */}
                <div className="lg:col-span-2 bg-[#050505] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-base font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider text-white">
                        Priority Inquiries & Leads
                      </h2>
                      <p className="text-xs text-[#A3A3A3]">
                        Recent submissions needing follow-up
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-xs text-[#6EFF8F] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>View All ({leads.length})</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {leads.slice(0, 4).map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 bg-[#131824] border border-white/5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/15 transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-white">{lead.name}</span>
                            <span
                              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                lead.status === 'new'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                  : lead.status === 'contacted'
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                                  : 'bg-green-500/20 text-green-400 border border-green-500/40'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#A3A3A3] mt-1">
                            <span className="text-[#6EFF8F]">{lead.interest}</span>
                            <span>•</span>
                            <span>{lead.phone}</span>
                            {lead.email && (
                              <>
                                <span>•</span>
                                <span>{lead.email}</span>
                              </>
                            )}
                          </div>
                          {lead.notes && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic">
                              &ldquo;{lead.notes}&rdquo;
                            </p>
                          )}
                        </div>

                        {/* Quick Status Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          {lead.status !== 'contacted' && (
                            <button
                              onClick={() => handleUpdateLeadStatus(lead.id, 'contacted')}
                              className="px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-medium rounded-lg transition-colors"
                            >
                              Mark Contacted
                            </button>
                          )}
                          {lead.status !== 'converted' && (
                            <button
                              onClick={() => handleUpdateLeadStatus(lead.id, 'converted')}
                              className="px-2.5 py-1 bg-[#6EFF8F]/20 hover:bg-[#6EFF8F] text-[#6EFF8F] hover:text-[#131824] text-xs font-bold rounded-lg transition-colors"
                            >
                              Convert
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Schedule & Class Capacity (1 col) */}
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-base font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider text-white">
                        Class Schedules
                      </h2>
                      <button
                        onClick={() => setActiveTab('classes')}
                        className="text-xs text-[#6EFF8F] hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>Manage</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {classes.slice(0, 4).map((c) => {
                        const percent = Math.round((c.enrolled / c.capacity) * 100);
                        return (
                          <div key={c.id} className="p-3 bg-[#131824] rounded-xl border border-white/5">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className="text-white truncate max-w-[160px]">{c.title}</span>
                              <span className="text-[#6EFF8F]">{c.time}</span>
                            </div>
                            <div className="text-[11px] text-[#A3A3A3] mt-0.5 flex items-center justify-between">
                              <span>Coach: {c.trainer}</span>
                              <span>
                                {c.enrolled}/{c.capacity} enrolled
                              </span>
                            </div>
                            {/* Capacity bar */}
                            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  percent >= 90 ? 'bg-amber-400' : 'bg-[#6EFF8F]'
                                }`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 text-center">
                    <button
                      onClick={() => setAddClassModalOpen(true)}
                      className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#A3A3A3] hover:text-white rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Schedule New Class</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB: LEADS ==================== */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Controls Header */}
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, phone, interest..."
                    className="w-full pl-10 pr-4 py-2 bg-[#131824] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                  {(['all', 'new', 'contacted', 'converted'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                        leadStatusFilter === st
                          ? 'bg-[#6EFF8F] text-[#131824]'
                          : 'bg-[#131824] text-[#A3A3A3] hover:text-white'
                      }`}
                    >
                      {st} ({st === 'all' ? leads.length : leads.filter((l) => l.status === st).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads Table Card */}
              <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-[#A3A3A3]">
                    <thead className="bg-[#131824] text-[11px] uppercase tracking-wider text-[#A3A3A3] border-b border-white/10 font-['Rajdhani',sans-serif]">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Contact Name</th>
                        <th className="py-3.5 px-4 font-bold">Phone & Email</th>
                        <th className="py-3.5 px-4 font-bold">Interested Program</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold">Source</th>
                        <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-500">
                            No inquiries match the current filter or search.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-white">
                              {lead.name}
                              {lead.notes && (
                                <span className="block text-[11px] font-normal text-[#A3A3A3] truncate max-w-xs">
                                  {lead.notes}
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="text-white font-mono">{lead.phone}</div>
                              {lead.email && <div className="text-gray-500">{lead.email}</div>}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-[#6EFF8F] font-medium">{lead.interest}</span>
                              {lead.date && <div className="text-gray-500">Date: {lead.date}</div>}
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  handleUpdateLeadStatus(lead.id, e.target.value as Lead['status'])
                                }
                                className={`text-[11px] font-bold px-2 py-1 rounded border uppercase tracking-wider focus:outline-none cursor-pointer bg-[#131824] ${
                                  lead.status === 'new'
                                    ? 'border-amber-500/50 text-amber-400'
                                    : lead.status === 'contacted'
                                    ? 'border-blue-500/50 text-blue-400'
                                    : 'border-green-500/50 text-green-400'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="converted">Converted</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-[#A3A3A3]">{lead.source || 'Website'}</td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setViewLeadDetail(lead)}
                                  title="View Details"
                                  className="p-1.5 text-[#A3A3A3] hover:text-white rounded hover:bg-white/5"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  title="Delete Lead"
                                  className="p-1.5 text-[#A3A3A3] hover:text-red-400 rounded hover:bg-white/5"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB: MEMBERS ==================== */}
          {activeTab === 'members' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider text-white">
                      Registered Club Members
                    </h2>
                    <p className="text-xs text-[#A3A3A3]">
                      Total active athlete roster & pass validation
                    </p>
                  </div>
                  <button
                    onClick={() => setAddMemberModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#6EFF8F] hover:bg-[#c4e600] text-[#131824] font-bold text-xs font-['Rajdhani',sans-serif] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#6EFF8F]/15"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Registration</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-[#A3A3A3]">
                    <thead className="bg-[#131824] text-[11px] uppercase tracking-wider text-[#A3A3A3] border-b border-white/10 font-['Rajdhani',sans-serif]">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Member ID & Name</th>
                        <th className="py-3.5 px-4 font-bold">Contact Info</th>
                        <th className="py-3.5 px-4 font-bold">Membership Plan</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold">Expires</th>
                        <th className="py-3.5 px-4 font-bold">Attendance</th>
                        <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                      {members.map((member) => (
                        <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-[10px] text-gray-500 block">{member.id}</span>
                            <span className="font-bold text-white text-sm">{member.name}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-[#A3A3A3] font-mono">{member.phone}</div>
                            <div className="text-gray-500">{member.email}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#6EFF8F]/10 text-[#6EFF8F] border border-[#6EFF8F]/30">
                              {member.plan}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                member.status === 'active'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              {member.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[#A3A3A3]">{member.expiryDate}</td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-white">{member.attendanceCount}</span>{' '}
                            <span className="text-gray-500">visits</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleCheckinMember(member.id)}
                                title="Check In Now"
                                className="px-2.5 py-1 bg-white/5 hover:bg-[#6EFF8F] text-[#A3A3A3] hover:text-[#131824] rounded-lg font-semibold text-[11px] transition-colors"
                              >
                                Check In
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                title="Delete Member"
                                className="p-1.5 text-[#A3A3A3] hover:text-red-400 rounded hover:bg-white/5"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB: CLASSES ==================== */}
          {activeTab === 'classes' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-base font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider text-white">
                      Weekly Class Timetable
                    </h2>
                    <p className="text-xs text-[#A3A3A3]">
                      Configure group classes, coach assignments, and headcount caps
                    </p>
                  </div>
                  <button
                    onClick={() => setAddClassModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#6EFF8F] hover:bg-[#c4e600] text-[#131824] font-bold text-xs font-['Rajdhani',sans-serif] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#6EFF8F]/15"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Schedule Class</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((cls) => (
                    <div
                      key={cls.id}
                      className="p-5 bg-[#131824] border border-white/10 rounded-xl flex flex-col justify-between relative group hover:border-[#6EFF8F]/40 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-[#A3A3A3]">
                            {cls.day}
                          </span>
                          <span className="text-xs font-bold text-[#6EFF8F]">{cls.category}</span>
                        </div>
                        <h3 className="text-base font-bold font-['Rajdhani',sans-serif] text-white">
                          {cls.title}
                        </h3>
                        <p className="text-xs text-[#A3A3A3] mt-1">
                          Coach: <span className="text-gray-200 font-semibold">{cls.trainer}</span>
                        </p>
                        <div className="text-xs text-[#A3A3A3] mt-0.5">
                          Time: <span className="text-[#6EFF8F]">{cls.time}</span> ({cls.duration})
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-[#A3A3A3]">
                          Capacity: <span className="text-white font-bold">{cls.enrolled}/{cls.capacity}</span>
                        </span>
                        <button
                          onClick={() => handleDeleteClass(cls.id)}
                          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB: SERVICES & PRICING ==================== */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider text-white">
                      Active Services & Training Programs
                    </h2>
                    <p className="text-xs text-[#A3A3A3]">
                      Catalog presented on the public /services and homepage cards
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((svc) => (
                    <div
                      key={svc.id}
                      className="p-5 bg-[#131824] border border-white/10 rounded-xl relative group hover:border-[#6EFF8F]/40 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#6EFF8F]/15 text-[#6EFF8F]">
                          {svc.category}
                        </span>
                        <span className="text-base font-bold font-['Rajdhani',sans-serif] text-white">
                          {svc.price}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-['Rajdhani',sans-serif] text-white">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-[#A3A3A3] mt-2 leading-relaxed">
                        {svc.description}
                      </p>
                      <div className="mt-3 text-[11px] text-gray-500 flex items-center gap-2">
                        <span>Standard Session: {svc.duration}</span>
                        {svc.popular && (
                          <span className="text-[#6EFF8F] font-semibold">• Most Requested</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB: TRAINERS ==================== */}
          {activeTab === 'trainers' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="mb-6">
                  <h2 className="text-base font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider text-white">
                    Coaching & Fitness Staff
                  </h2>
                  <p className="text-xs text-[#A3A3A3]">
                    Staff roster featured on /team-single and homepage
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {trainers.map((trn) => (
                    <div
                      key={trn.id}
                      className="p-5 bg-[#131824] border border-white/10 rounded-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                          <img
                            src={trn.image}
                            alt={trn.name}
                            className="w-full h-full object-cover object-top"
                          />
                          <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#131824]/90 text-[#6EFF8F] text-[10px] font-bold rounded">
                            {trn.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-['Rajdhani',sans-serif] text-white">
                          {trn.name}
                        </h3>
                        <p className="text-xs text-[#6EFF8F] font-semibold">{trn.role}</p>
                        <p className="text-xs text-[#A3A3A3] mt-2">{trn.specialty}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#A3A3A3] space-y-1">
                        <div>Experience: {trn.experience}</div>
                        <div>Email: {trn.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB: SETTINGS ==================== */}
          {activeTab === 'settings' && settings && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 shadow-xl max-w-3xl">
                <h2 className="text-base font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider text-white mb-2">
                  Club Information & Contacts
                </h2>
                <p className="text-xs text-[#A3A3A3] mb-6">
                  Configure real-time details rendered across the public website and headers
                </p>

                <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Club Legal Name</label>
                    <input
                      type="text"
                      value={settings.clubName}
                      onChange={(e) => setSettings({ ...settings, clubName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Telephone Contact</label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Official Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Club Facility Address</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Weekday Hours</label>
                      <input
                        type="text"
                        value={settings.hoursWeekday}
                        onChange={(e) => setSettings({ ...settings, hoursWeekday: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Weekend Hours</label>
                      <input
                        type="text"
                        value={settings.hoursWeekend}
                        onChange={(e) => setSettings({ ...settings, hoursWeekend: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-[#A3A3A3] mb-1">
                      Header Promotional Announcement
                    </label>
                    <textarea
                      rows={2}
                      value={settings.announcement}
                      onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#6EFF8F] hover:bg-[#c4e600] text-[#131824] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#6EFF8F]/20"
                    >
                      Save Configuration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ==================== TAB: BACKUP & RESTORE ==================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6 animate-fadeIn max-w-2xl">
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 shadow-xl">
                <h2 className="text-base font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider text-white mb-2">
                  Database JSON Export & Import
                </h2>
                <p className="text-xs text-[#A3A3A3] mb-6">
                  Download a snapshot of leads, memberships, and schedules or seed new data
                </p>

                <div className="space-y-4">
                  {/* Export Button */}
                  <div className="p-4 bg-[#131824] border border-white/5 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Export Complete Backup</h4>
                      <p className="text-xs text-[#A3A3A3] mt-0.5">
                        Download all active leads, members, schedules, and club settings as a JSON file.
                      </p>
                    </div>
                    <button
                      onClick={handleExportJSON}
                      className="px-4 py-2 bg-[#6EFF8F] hover:bg-[#c4e600] text-[#131824] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JSON</span>
                    </button>
                  </div>

                  {/* Import Button */}
                  <div className="p-4 bg-[#131824] border border-white/5 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Restore / Import Data</h4>
                      <p className="text-xs text-[#A3A3A3] mt-0.5">
                        Upload a previously exported Fitwell JSON schema.
                      </p>
                    </div>
                    <label className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0">
                      <Upload className="w-4 h-4 text-[#6EFF8F]" />
                      <span>Select File</span>
                      <input
                        type="file"
                        accept=".json,application/json"
                        onChange={handleImportJSON}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================== MODAL: ADD LEAD ==================== */}
      {addLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#050505] border border-white/15 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fadeIn text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider">
                Add Walk-In / Phone Lead
              </h3>
              <button
                onClick={() => setAddLeadModalOpen(false)}
                className="text-[#A3A3A3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  placeholder="e.g. Suman Sen"
                  className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  placeholder="+91 98300 00000"
                  className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Email Address</label>
                <input
                  type="email"
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  placeholder="name@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Interested Program</label>
                <select
                  value={newLeadForm.interest}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, interest: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                >
                  <option value="Personal Training">Personal Training</option>
                  <option value="Monthly Pro Membership">Monthly Pro Membership</option>
                  <option value="Free 3-Day Trial Pass">Free 3-Day Trial Pass</option>
                  <option value="Nutrition & Diet Plan">Nutrition & Diet Plan</option>
                  <option value="Strength Hypertrophy">Strength Hypertrophy</option>
                </select>
              </div>

              <div>
                <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Staff Notes</label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  placeholder="Notes from front desk conversation..."
                  className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddLeadModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#A3A3A3] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6EFF8F] text-[#131824] font-bold rounded-xl uppercase tracking-wider"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD MEMBER ==================== */}
      {addMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#050505] border border-white/15 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fadeIn text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider">
                Register New Member
              </h3>
              <button
                onClick={() => setAddMemberModalOpen(false)}
                className="text-[#A3A3A3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Athlete Name *</label>
                <input
                  type="text"
                  required
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newMemberForm.email}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={newMemberForm.phone}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                  placeholder="+91 98301 22334"
                  className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Plan</label>
                  <select
                    value={newMemberForm.plan}
                    onChange={(e) =>
                      setNewMemberForm({ ...newMemberForm, plan: e.target.value as Member['plan'] })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                  >
                    <option value="Weekly Basic">Weekly Basic ($19)</option>
                    <option value="Monthly Pro">Monthly Pro ($39)</option>
                    <option value="Annual Elite">Annual Elite ($399)</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Duration</label>
                  <select
                    value={newMemberForm.expiryMonths}
                    onChange={(e) =>
                      setNewMemberForm({ ...newMemberForm, expiryMonths: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">1 Year</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddMemberModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#A3A3A3] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6EFF8F] text-[#131824] font-bold rounded-xl uppercase tracking-wider"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD CLASS ==================== */}
      {addClassModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#050505] border border-white/15 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fadeIn text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider">
                Schedule Class Session
              </h3>
              <button
                onClick={() => setAddClassModalOpen(false)}
                className="text-[#A3A3A3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Class Title *</label>
                <input
                  type="text"
                  required
                  value={newClassForm.title}
                  onChange={(e) => setNewClassForm({ ...newClassForm, title: e.target.value })}
                  placeholder="e.g. Crossfit WOD & Gymnastics"
                  className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Day</label>
                  <select
                    value={newClassForm.day}
                    onChange={(e) =>
                      setNewClassForm({ ...newClassForm, day: e.target.value as FitnessClass['day'] })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Coach</label>
                  <select
                    value={newClassForm.trainer}
                    onChange={(e) => setNewClassForm({ ...newClassForm, trainer: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                  >
                    {trainers.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newClassForm.time}
                    onChange={(e) => setNewClassForm({ ...newClassForm, time: e.target.value })}
                    placeholder="07:00 AM - 08:00 AM"
                    className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-[#A3A3A3] mb-1">Max Capacity</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={newClassForm.capacity}
                    onChange={(e) =>
                      setNewClassForm({ ...newClassForm, capacity: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#131824] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6EFF8F]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddClassModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#A3A3A3] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6EFF8F] text-[#131824] font-bold rounded-xl uppercase tracking-wider"
                >
                  Add to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: VIEW LEAD DETAIL ==================== */}
      {viewLeadDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#050505] border border-white/15 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fadeIn text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider">
                Lead Record Details
              </h3>
              <button
                onClick={() => setViewLeadDetail(null)}
                className="text-[#A3A3A3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#A3A3A3] block">Prospect Full Name</span>
                <span className="text-base font-bold text-white">{viewLeadDetail.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[#A3A3A3] block">Phone</span>
                  <span className="font-mono text-white">{viewLeadDetail.phone}</span>
                </div>
                <div>
                  <span className="text-[#A3A3A3] block">Email</span>
                  <span className="text-[#A3A3A3]">{viewLeadDetail.email || 'N/A'}</span>
                </div>
              </div>
              <div>
                <span className="text-[#A3A3A3] block">Program Interest</span>
                <span className="text-[#6EFF8F] font-semibold">{viewLeadDetail.interest}</span>
              </div>
              {viewLeadDetail.notes && (
                <div>
                  <span className="text-[#A3A3A3] block">Prospect Notes</span>
                  <p className="p-3 bg-[#131824] rounded-xl text-[#A3A3A3] mt-1 italic">
                    &ldquo;{viewLeadDetail.notes}&rdquo;
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <div>
                  <span className="text-gray-500 block">Channel Source</span>
                  <span className="text-[#A3A3A3]">{viewLeadDetail.source || 'Website'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Submitted At</span>
                  <span className="text-[#A3A3A3]">
                    {new Date(viewLeadDetail.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateLeadStatus(viewLeadDetail.id, 'contacted')}
                  className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-semibold hover:bg-blue-500/30 transition-colors"
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => handleUpdateLeadStatus(viewLeadDetail.id, 'converted')}
                  className="px-3 py-1.5 bg-[#6EFF8F] text-[#131824] rounded-lg text-xs font-bold hover:bg-[#c4e600] transition-colors"
                >
                  Convert
                </button>
              </div>
              <button
                onClick={() => setViewLeadDetail(null)}
                className="px-4 py-1.5 bg-white/10 text-[#A3A3A3] rounded-lg text-xs hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
