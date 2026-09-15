// Fitwell Central DataStore & Auth Service
// Provides reactive CRUD persistence backed by localStorage and mock seeding

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email?: string;
  interest: string;
  date?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  source?: string;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: 'Weekly Basic' | 'Monthly Pro' | 'Annual Elite';
  status: 'active' | 'expiring' | 'expired';
  joinedDate: string;
  expiryDate: string;
  attendanceCount: number;
}

export interface FitnessClass {
  id: string;
  title: string;
  trainer: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  duration: string;
  capacity: number;
  enrolled: number;
  level: 'Beginner' | 'Intermediate' | 'All Levels' | 'Advanced';
  category: 'HIIT' | 'Strength' | 'Cardio' | 'Yoga & Recovery' | 'Boxing';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  category: string;
  popular?: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave';
}

export interface ClubSettings {
  clubName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hoursWeekday: string;
  hoursWeekend: string;
  announcement: string;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: 17150001,
    name: 'Vikram Sengupta',
    phone: '+91 98301 22415',
    email: 'vikram.s@gmail.com',
    interest: 'Personal Training',
    date: '2026-09-12',
    notes: 'Looking for 1-on-1 body recomposition trainer. Prefers morning 7 AM slot.',
    status: 'new',
    source: 'Website Hero Form',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 17150002,
    name: 'Ananya Roy',
    phone: '+91 98745 61230',
    email: 'ananya.roy@yahoo.com',
    interest: 'Free 3-Day Trial Pass',
    date: '2026-09-11',
    notes: 'Interested in HIIT and group pilates sessions.',
    status: 'contacted',
    source: 'Lead Modal',
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: 17150003,
    name: 'Rohit Bannerjee',
    phone: '+91 91234 56789',
    email: 'rohit.b@outlook.com',
    interest: 'Monthly Pro Membership',
    date: '2026-09-10',
    notes: 'Walked in yesterday, signed up for 3 months.',
    status: 'converted',
    source: 'Chat Widget',
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
  },
  {
    id: 17150004,
    name: 'Priyanka Mukherjee',
    phone: '+91 94331 99881',
    email: 'pmukherjee@gmail.com',
    interest: 'Nutrition & Diet Plan',
    date: '2026-09-15',
    notes: 'Wants meal prep consultation alongside gym access.',
    status: 'new',
    source: 'Contact Page',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'MEM-101',
    name: 'Debjit Paul',
    email: 'debjit.paul@gmail.com',
    phone: '+91 98311 44521',
    plan: 'Monthly Pro',
    status: 'active',
    joinedDate: '2026-01-15',
    expiryDate: '2026-10-15',
    attendanceCount: 48,
  },
  {
    id: 'MEM-102',
    name: 'Sagnik Bhattacharya',
    email: 'sagnik.b@gmail.com',
    phone: '+91 98741 22334',
    plan: 'Annual Elite',
    status: 'active',
    joinedDate: '2025-11-01',
    expiryDate: '2026-11-01',
    attendanceCount: 112,
  },
  {
    id: 'MEM-103',
    name: 'Ritu Karmakar',
    email: 'ritu.k@outlook.com',
    phone: '+91 91233 44556',
    plan: 'Weekly Basic',
    status: 'expiring',
    joinedDate: '2026-09-01',
    expiryDate: '2026-09-14',
    attendanceCount: 6,
  },
  {
    id: 'MEM-104',
    name: 'Amitabh Sen',
    email: 'amitabh.sen@techcorp.in',
    phone: '+91 98300 11223',
    plan: 'Annual Elite',
    status: 'active',
    joinedDate: '2026-03-10',
    expiryDate: '2027-03-10',
    attendanceCount: 74,
  },
];

const INITIAL_CLASSES: FitnessClass[] = [
  {
    id: 'CLS-01',
    title: 'High-Octane HIIT Circuit',
    trainer: 'David Lee',
    day: 'Monday',
    time: '06:30 AM - 07:30 AM',
    duration: '60 min',
    capacity: 20,
    enrolled: 18,
    level: 'Intermediate',
    category: 'HIIT',
  },
  {
    id: 'CLS-02',
    title: 'Olympic Powerlifting & Form',
    trainer: 'Marcus Brody',
    day: 'Tuesday',
    time: '07:30 AM - 08:45 AM',
    duration: '75 min',
    capacity: 12,
    enrolled: 11,
    level: 'Advanced',
    category: 'Strength',
  },
  {
    id: 'CLS-03',
    title: 'Vinyasa Flow & Deep Mobility',
    trainer: 'Elena Rostova',
    day: 'Wednesday',
    time: '06:00 PM - 07:00 PM',
    duration: '60 min',
    capacity: 25,
    enrolled: 22,
    level: 'All Levels',
    category: 'Yoga & Recovery',
  },
  {
    id: 'CLS-04',
    title: 'Combat Boxing & Footwork',
    trainer: 'Sarah Jenkins',
    day: 'Thursday',
    time: '07:00 PM - 08:15 PM',
    duration: '75 min',
    capacity: 16,
    enrolled: 15,
    level: 'Intermediate',
    category: 'Boxing',
  },
  {
    id: 'CLS-05',
    title: 'Functional Conditioning & Core',
    trainer: 'David Lee',
    day: 'Saturday',
    time: '08:00 AM - 09:15 AM',
    duration: '75 min',
    capacity: 24,
    enrolled: 24,
    level: 'All Levels',
    category: 'Cardio',
  },
];

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'SRV-01',
    title: 'Group Functional Fitness',
    description: 'High energy group workouts combining cardiovascular endurance and plyometrics.',
    duration: '60 Mins',
    price: '$39 / mo',
    category: 'Group Training',
    popular: true,
  },
  {
    id: 'SRV-02',
    title: 'Personal Coaching & Form',
    description: '1-on-1 tailored biomechanical training, periodized muscle hypertrophy, and posture refinement.',
    duration: '60 Mins',
    price: '$79 / session',
    category: 'Personal Training',
    popular: true,
  },
  {
    id: 'SRV-03',
    title: 'Olympic Weightlifting',
    description: 'Specialized barbell platforms, bumper plates, chalk stations, and elite strength coaches.',
    duration: '90 Mins',
    price: '$49 / mo',
    category: 'Strength',
  },
  {
    id: 'SRV-04',
    title: 'Clinical Nutrition & Macro Planning',
    description: 'Registered sports dietitian consultations, body composition DEXA analysis, and personalized meals.',
    duration: '45 Mins',
    price: '$65 / plan',
    category: 'Wellness',
  },
];

const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'TRN-01',
    name: 'David Lee',
    role: 'Head Strength & Conditioning Coach',
    specialty: 'Powerlifting, Functional HIIT, Biomechanics',
    experience: '8+ Years',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&auto=format&fit=crop&q=80',
    email: 'david@fitwellgym.com',
    phone: '+91 98301 11200',
    status: 'Active',
  },
  {
    id: 'TRN-02',
    name: 'Sarah Jenkins',
    role: 'Combat & HIIT Specialist',
    specialty: 'Boxing Conditioning, Core Athletics, Speed Drills',
    experience: '6+ Years',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    email: 'sarah@fitwellgym.com',
    phone: '+91 98302 22300',
    status: 'Active',
  },
  {
    id: 'TRN-03',
    name: 'Marcus Brody',
    role: 'Bodybuilding & Hypertrophy Coach',
    specialty: 'Contest Prep, Hypertrophy, Mobility',
    experience: '10+ Years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    email: 'marcus@fitwellgym.com',
    phone: '+91 98303 33400',
    status: 'Active',
  },
];

const INITIAL_SETTINGS: ClubSettings = {
  clubName: 'THE FITNESS JUNCTION',
  tagline: 'Premier Unisex Gym & CrossFit Centre in Barasat',
  phone: '+91 96811 25006',
  email: 'sparkgym.chakdaha@gmail.com',
  address: 'Monorama Ultrascan Pvt. Ltd., C.B. Road, beside Monorama Ultrascan, Lalpur, Barasat, West Bengal 741222',
  hoursWeekday: '06:00 AM – 10:00 PM',
  hoursWeekend: '06:00 AM – 10:00 PM',
  announcement: 'Rated 4.5/5 on Google & Justdial. Established in 2020. Unisex gym, CrossFit & Personal Training!',
};

// Safe localStorage helper
function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export const DataStore = {
  // Authentication
  auth: {
    isAuthenticated(): boolean {
      if (typeof window === 'undefined') return false;
      return localStorage.getItem('fitwell_admin_session') === 'true';
    },
    getUser(): { name: string; email: string; role: string } | null {
      if (typeof window === 'undefined') return null;
      const raw = localStorage.getItem('fitwell_admin_user');
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    },
    login(email: string, pass: string): boolean {
      // Demo credentials check: admin@fitwell.com / admin123 or fitwell2025
      const cleanEmail = email.trim().toLowerCase();
      const validCreds =
        (cleanEmail === 'admin@fitwell.com' && (pass === 'admin123' || pass === 'fitwell2025')) ||
        (cleanEmail === 'indrajitghosh449@gmail.com' && (pass === 'admin123' || pass === 'fitwell2025')) ||
        (cleanEmail === 'admin' && pass === 'admin');

      if (validCreds) {
        localStorage.setItem('fitwell_admin_session', 'true');
        localStorage.setItem(
          'fitwell_admin_user',
          JSON.stringify({
            name: cleanEmail.includes('indrajit') ? 'Indrajit Ghosh' : 'Fitwell Manager',
            email: cleanEmail,
            role: 'Super Administrator',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          })
        );
        return true;
      }
      return false;
    },
    logout(): void {
      if (typeof window === 'undefined') return;
      localStorage.removeItem('fitwell_admin_session');
      localStorage.removeItem('fitwell_admin_user');
    },
  },

  // Leads
  leads: {
    getAll(): Lead[] {
      const stored = safeGet<Lead[]>('fitwell_leads', []);
      if (stored.length === 0) {
        safeSet('fitwell_leads', INITIAL_LEADS);
        return INITIAL_LEADS;
      }
      return stored;
    },
    saveAll(leads: Lead[]): void {
      safeSet('fitwell_leads', leads);
    },
    updateStatus(id: number, status: Lead['status']): void {
      const all = this.getAll();
      const updated = all.map((item) => (item.id === id ? { ...item, status } : item));
      this.saveAll(updated);
    },
    add(lead: Omit<Lead, 'id' | 'createdAt'>): Lead {
      const all = this.getAll();
      const newLead: Lead = {
        ...lead,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      this.saveAll([newLead, ...all]);
      return newLead;
    },
    delete(id: number): void {
      const all = this.getAll();
      this.saveAll(all.filter((i) => i.id !== id));
    },
  },

  // Members
  members: {
    getAll(): Member[] {
      const stored = safeGet<Member[]>('fitwell_members', []);
      if (stored.length === 0) {
        safeSet('fitwell_members', INITIAL_MEMBERS);
        return INITIAL_MEMBERS;
      }
      return stored;
    },
    saveAll(members: Member[]): void {
      safeSet('fitwell_members', members);
    },
    add(member: Omit<Member, 'id'>): Member {
      const all = this.getAll();
      const newMember: Member = {
        ...member,
        id: `MEM-${Math.floor(100 + Math.random() * 900)}`,
      };
      this.saveAll([newMember, ...all]);
      return newMember;
    },
    delete(id: string): void {
      const all = this.getAll();
      this.saveAll(all.filter((m) => m.id !== id));
    },
  },

  // Classes
  classes: {
    getAll(): FitnessClass[] {
      const stored = safeGet<FitnessClass[]>('fitwell_classes', []);
      if (stored.length === 0) {
        safeSet('fitwell_classes', INITIAL_CLASSES);
        return INITIAL_CLASSES;
      }
      return stored;
    },
    saveAll(classes: FitnessClass[]): void {
      safeSet('fitwell_classes', classes);
    },
    add(c: Omit<FitnessClass, 'id'>): FitnessClass {
      const all = this.getAll();
      const newClass: FitnessClass = {
        ...c,
        id: `CLS-${Math.floor(10 + Math.random() * 90)}`,
      };
      this.saveAll([...all, newClass]);
      return newClass;
    },
    delete(id: string): void {
      const all = this.getAll();
      this.saveAll(all.filter((c) => c.id !== id));
    },
  },

  // Services
  services: {
    getAll(): ServiceItem[] {
      const stored = safeGet<ServiceItem[]>('fitwell_services', []);
      if (stored.length === 0) {
        safeSet('fitwell_services', INITIAL_SERVICES);
        return INITIAL_SERVICES;
      }
      return stored;
    },
    saveAll(services: ServiceItem[]): void {
      safeSet('fitwell_services', services);
    },
  },

  // Trainers
  trainers: {
    getAll(): Trainer[] {
      const stored = safeGet<Trainer[]>('fitwell_trainers', []);
      if (stored.length === 0) {
        safeSet('fitwell_trainers', INITIAL_TRAINERS);
        return INITIAL_TRAINERS;
      }
      return stored;
    },
    saveAll(trainers: Trainer[]): void {
      safeSet('fitwell_trainers', trainers);
    },
  },

  // Settings
  settings: {
    get(): ClubSettings {
      const stored = safeGet<ClubSettings>('fitwell_settings', INITIAL_SETTINGS);
      return stored;
    },
    save(settings: ClubSettings): void {
      safeSet('fitwell_settings', settings);
    },
  },

  // Backup & Restore
  exportAllJSON(): string {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      leads: this.leads.getAll(),
      members: this.members.getAll(),
      classes: this.classes.getAll(),
      services: this.services.getAll(),
      trainers: this.trainers.getAll(),
      settings: this.settings.get(),
    };
    return JSON.stringify(backup, null, 2);
  },

  importJSON(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.leads) safeSet('fitwell_leads', data.leads);
      if (data.members) safeSet('fitwell_members', data.members);
      if (data.classes) safeSet('fitwell_classes', data.classes);
      if (data.services) safeSet('fitwell_services', data.services);
      if (data.trainers) safeSet('fitwell_trainers', data.trainers);
      if (data.settings) safeSet('fitwell_settings', data.settings);
      return true;
    } catch {
      return false;
    }
  },
};
