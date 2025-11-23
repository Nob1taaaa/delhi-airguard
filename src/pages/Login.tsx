import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wind } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [view, setView] = useState<'login' | 'forgot' | 'verify'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Signing in...");
    const { login } = useAuth();
    const navigate = useNavigate();

    const funnyLoadingMessages = [
        "Hacking into the mainframe... 💻",
        "Convincing the AI you're human... 🤖",
        "Checking if you recycled today... ♻️",
        "Loading fresh air pixels... 💨",
        "Asking the clouds for permission... ☁️"
    ];

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        let msgIndex = 0;
        const msgInterval = setInterval(() => {
            setLoadingText(funnyLoadingMessages[msgIndex % funnyLoadingMessages.length]);
            msgIndex++;
        }, 600);

        setTimeout(() => {
            clearInterval(msgInterval);
            login(email, email.split('@')[0] || 'Eco Warrior');
            setIsLoading(false);
            navigate('/');
        }, 2500);
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setLoadingText("Sending carrier pigeon... 🐦");

        setTimeout(() => {
            setIsLoading(false);
            setView('verify');
            alert(`We've sent a secret code to ${email || 'your email'}! (Psst... it's 123456) 😉`);
        }, 1500);
    };

    const handleVerifyCode = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setLoadingText("Verifying secret handshake... 🤝");

        setTimeout(() => {
            setIsLoading(false);
            if (verificationCode === '123456') {
                login(email, email.split('@')[0] || 'Eco Warrior');
                navigate('/');
            } else {
                alert("Wrong code! Are you an alien? 👽 (Try 123456)");
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] relative overflow-hidden font-sans">
            {/* Cute Background Blobs */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-60"
            />
            <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-20 w-40 h-40 bg-pink-200 rounded-full blur-xl opacity-60"
            />

            <motion.div
                key={view}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-full max-w-md p-6 relative z-10"
            >
                <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
                    <CardHeader className="space-y-1 text-center pt-10 pb-2">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                            className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
                        >
                            <Wind className="text-white h-8 w-8" />
                        </motion.div>
                        <CardTitle className="text-3xl font-black text-slate-800 tracking-tight">
                            {view === 'login' ? "Welcome Back! 👋" : view === 'forgot' ? "Forgot Password? 😱" : "Verify It's You 🕵️‍♂️"}
                        </CardTitle>
                        <CardDescription className="text-slate-500 text-lg">
                            {view === 'login' ? "Ready to save the planet again?" : view === 'forgot' ? "Don't worry, it happens to the best of us." : "Check your digital mailbox!"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        {view === 'login' && (
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Your Email 📧</label>
                                    <Input
                                        type="email"
                                        placeholder="hero@planet.earth"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-slate-900 rounded-xl h-12 px-4 transition-all hover:bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Secret Password 🔑</label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-slate-900 rounded-xl h-12 px-4 transition-all hover:bg-white"
                                    />
                                </div>
                                <Button
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <motion.span
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        {loadingText}
                                    </motion.span> : "Let's Go! 🚀"}
                                </Button>
                                <div className="mt-4 text-center">
                                    <p className="text-sm text-slate-400">
                                        Forgot password? <span onClick={() => setView('forgot')} className="text-slate-900 font-bold cursor-pointer hover:underline">Reset it 🔄</span>
                                    </p>
                                </div>
                            </form>
                        )}

                        {view === 'forgot' && (
                            <form onSubmit={handleForgotPassword} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Enter your Email 📧</label>
                                    <Input
                                        type="email"
                                        placeholder="hero@planet.earth"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-slate-900 rounded-xl h-12 px-4 transition-all hover:bg-white"
                                    />
                                </div>
                                <Button
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? loadingText : "Send Code 📨"}
                                </Button>
                                <div className="mt-4 text-center">
                                    <span onClick={() => setView('login')} className="text-slate-500 text-sm font-bold cursor-pointer hover:underline">← Back to Login</span>
                                </div>
                            </form>
                        )}

                        {view === 'verify' && (
                            <form onSubmit={handleVerifyCode} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Enter Code 🔢</label>
                                    <Input
                                        type="text"
                                        placeholder="123456"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        required
                                        className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-slate-900 rounded-xl h-12 px-4 transition-all hover:bg-white text-center text-2xl tracking-widest"
                                    />
                                </div>
                                <Button
                                    className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? loadingText : "Verify & Login ✅"}
                                </Button>
                                <div className="mt-4 text-center">
                                    <span onClick={() => setView('forgot')} className="text-slate-500 text-sm font-bold cursor-pointer hover:underline">Resend Code 🔄</span>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
