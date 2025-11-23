import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, MessageSquare, Lightbulb, BarChart3, Camera, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Activity, label: 'Simulation', path: '/simulation' },
        { icon: MessageSquare, label: 'Assistant', path: '/chatbot' },
        { icon: Lightbulb, label: 'Tips', path: '/tips' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Camera, label: 'Report', path: '/report' },
    ];

    return (
        <div className="h-screen w-64 bg-white border-r border-slate-200 flex flex-col p-4 relative z-20 shadow-sm">
            <div className="mb-8 flex items-center gap-2 px-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
                    <span className="text-white font-bold">AS</span>
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">AirShield</span>
            </div>

            <nav className="space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 font-medium",
                                isActive
                                    ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <Icon size={20} className={isActive ? "text-blue-600" : "text-slate-400"} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-4 border-t border-slate-100">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium group"
                >
                    <LogOut size={20} className="text-slate-400 group-hover:text-red-500" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
