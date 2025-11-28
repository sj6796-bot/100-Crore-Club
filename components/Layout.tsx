import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PieChart, 
  History, 
  FileText, 
  Menu, 
  X, 
  Bell,
  User,
  LogOut,
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './ui/Logo';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: 'Invest', path: '/invest', icon: LayoutDashboard },
    { name: 'Portfolio', path: '/portfolio', icon: PieChart },
    { name: 'Orders', path: '/orders', icon: History },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const handleLogin = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/login');
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await signOut();
    navigate('/login');
  };
  
  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
      setIsSidebarOpen(false);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gold-900/30 px-4 py-3 flex justify-between items-center shadow-lg shadow-gold-900/5">
        <div className="flex items-center gap-3">
           {/* Mobile Logo Text */}
          <div className="flex flex-col justify-center">
             <Logo className="h-8 w-auto" />
          </div>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gold-400">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-black border-r border-gold-900/20 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 border-b border-gold-900/20 flex flex-col items-center justify-center min-h-[140px]">
          {/* Main Logo Text */}
          <div className="w-full relative flex flex-col items-center justify-center py-2 text-center">
            <Logo className="w-48 h-auto" />
          </div>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden
                  ${isActive 
                    ? 'text-gold-400 bg-gold-950/30 border border-gold-900/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                    : 'text-neutral-500 hover:text-gold-200 hover:bg-neutral-900'}
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-500 rounded-r-full" />
                )}
                <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-gold-500' : 'text-neutral-600 group-hover:text-gold-400'}`} />
                <span className="font-medium tracking-wide relative z-10">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-gold-900/10 bg-gradient-to-t from-gold-950/20 to-transparent">
          <div 
            onClick={handleProfileClick}
            className="flex items-center gap-3 justify-between group cursor-pointer hover:bg-neutral-900/50 p-2 rounded-lg transition-colors -mx-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-gold-500/30 shadow-sm shadow-gold-900/20 group-hover:border-gold-500/60 transition-colors">
                <User className="w-5 h-5 text-gold-500" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-gold-100 font-serif truncate w-32 group-hover:text-gold-400 transition-colors">
                  {user ? (user.user_metadata?.fullName || user.email || 'Member') : 'Guest'}
                </p>
                <p className="text-xs text-gold-600">
                  {user ? 'Premium Member' : 'Sign In'}
                </p>
              </div>
            </div>
            
            {user ? (
               <button 
                 onClick={handleSignOut}
                 className="text-neutral-500 hover:text-red-400 transition-colors p-2"
                 title="Sign Out"
               >
                 <LogOut className="w-4 h-4" />
               </button>
            ) : (
               <button 
                 onClick={handleLogin}
                 className="text-neutral-500 hover:text-gold-400 transition-colors p-2"
                 title="Sign In"
               >
                 <LogIn className="w-4 h-4" />
               </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative bg-black custom-scrollbar">
        {/* Desktop Top Bar */}
        <header className="hidden md:flex sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-gold-900/20 px-8 py-5 justify-end items-center shadow-md shadow-black">
          <div className="flex items-center gap-6">
             <div className="px-4 py-1.5 rounded-full border border-gold-800/30 bg-gold-950/10 text-xs text-gold-500 tracking-wider uppercase font-medium">
               Nifty 50: <span className="text-green-500 font-bold ml-1">22,450 ▲</span>
             </div>
            <button className="p-2 text-gold-500 hover:bg-gold-500/10 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-black"></span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-10 pb-20 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/80 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;