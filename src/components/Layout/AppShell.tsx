import React from 'react';
import Sidebar from './Sidebar';
import Background from './Background';
import FloatingChat from '../Chat/FloatingChat';

interface AppShellProps {
    children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
    return (
        <div className="flex min-h-screen bg-slate-50 relative">
            <Background />
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative z-10">
                {children}
            </main>
            <FloatingChat />
        </div>
    );
};

export default AppShell;
