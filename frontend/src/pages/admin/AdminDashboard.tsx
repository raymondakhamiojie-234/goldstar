import { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Wrench, 
  Settings2, 
  MessageSquare, 
  Settings, 
  LogOut,
  TrendingUp,
  Users,
  Eye
} from 'lucide-react';
import { VehiclesAdmin } from './VehiclesAdmin';
import { EnquiriesAdmin } from './EnquiriesAdmin';

// Sub-components for Admin
function DashboardHome() {
  const stats = [
    { label: 'Total Vehicles', value: '45', icon: Car, color: 'text-blue-500' },
    { label: 'Total Enquiries', value: '128', icon: MessageSquare, color: 'text-gold' },
    { label: 'Active Services', value: '6', icon: Wrench, color: 'text-green-500' },
    { label: 'Site Visits (Monthly)', value: '12.5k', icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Recent Enquiries</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
                <div>
                  <h4 className="text-white font-medium">John Doe</h4>
                  <p className="text-xs text-gray-500">Interested in: Mercedes-Benz Actros</p>
                </div>
                <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full">New</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Recently Added Vehicles</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4 p-4 bg-black rounded-xl border border-white/5">
                <div className="w-16 h-12 bg-zinc-800 rounded overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Vehicle" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-white font-medium text-sm">Mercedes-Benz Actros 3344</h4>
                  <p className="text-xs text-gold">₦ 85,000,000</p>
                </div>
                <button className="text-gray-500 hover:text-white"><Eye className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// Main Admin Dashboard Layout
export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: '' },
    { id: 'vehicles', label: 'Vehicles', icon: Car, path: 'vehicles' },
    { id: 'services', label: 'Services', icon: Wrench, path: 'services' },
    { id: 'parts', label: 'Parts', icon: Settings2, path: 'parts' },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, path: 'enquiries' },
    { id: 'testimonials', label: 'Testimonials', icon: Users, path: 'testimonials' },
    { id: 'settings', label: 'Settings', icon: Settings, path: 'settings' },
  ];

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-950 border-r border-white/5 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-gold rotate-45 flex items-center justify-center rounded-sm">
              <div className="w-3 h-3 bg-black rounded-sm" />
            </div>
            <span className="text-lg font-bold text-white">GOLD STAR</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500">Admin Portal</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.id}
              to={`/admin/${item.path}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-gold text-black' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-black">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/vehicles" element={<VehiclesAdmin />} />
          <Route path="/enquiries" element={<EnquiriesAdmin />} />
          <Route path="*" element={<div className="p-8 text-gray-400">Section under construction.</div>} />
        </Routes>
      </div>
    </div>
  );
}