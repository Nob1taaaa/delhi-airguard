import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Wind, HeartPulse, CheckCircle2, AlertTriangle, Ambulance } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmergencyOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmergencyOverlay = ({ isOpen, onClose }: EmergencyOverlayProps) => {
    const [step, setStep] = useState(0);
    const [isCritical, setIsCritical] = useState(false);

    // Reset state when opened
    useEffect(() => {
        if (isOpen) {
            setStep(0);
            setIsCritical(false);
        }
    }, [isOpen]);

    const handleEmergencyCall = () => {
        window.location.href = "tel:112"; // Universal emergency number
    };

    const handleHealthAuthorityCall = () => {
        window.location.href = "tel:1031"; // Delhi Pollution Control Committee / Health Helpline
    };

    const steps = [
        {
            id: 'calm',
            title: "Don't Panic",
            instruction: "Sit upright and try to remain calm.",
            subtext: "Panic tightens your chest muscles.",
            action: "I'm sitting up",
            color: "bg-blue-500",
            icon: HeartPulse,
            iconColor: "text-red-500"
        },
        {
            id: 'assess',
            title: "Quick Check",
            instruction: "Can you speak a full sentence without pausing?",
            subtext: "Be honest. This determines your next step.",
            action: "Yes, I can",
            secondaryAction: "No, I can't",
            color: "bg-yellow-500",
            icon: AlertTriangle,
            iconColor: "text-yellow-500"
        },
        {
            id: 'inhaler',
            title: "Rescue Inhaler",
            instruction: "Take one puff of your rescue inhaler.",
            subtext: "Use a spacer if you have one. Shake well first.",
            action: "Taken 1 puff",
            color: "bg-blue-600",
            icon: Wind,
            iconColor: "text-blue-500"
        },
        {
            id: 'check',
            title: "Assess",
            instruction: "Do you feel relief?",
            subtext: "If not, contact health authorities immediately.",
            action: "I feel better",
            secondaryAction: "Still struggling",
            color: "bg-green-500",
            icon: CheckCircle2,
            iconColor: "text-green-500"
        },
        {
            id: 'contact',
            title: "Health Authority",
            instruction: "Contact Delhi Health Authority for guidance.",
            subtext: "Helpline: 1031",
            action: "Call Health Authority",
            color: "bg-teal-600",
            icon: Ambulance,
            iconColor: "text-teal-500",
            isCall: true
        }
    ];

    const handleNext = () => {
        const current = steps[step];

        if (current.id === 'assess') {
            // If they clicked "Yes" (primary action), proceed to inhaler
            setStep(step + 1);
        } else if (current.id === 'contact') {
            handleHealthAuthorityCall();
        } else if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onClose();
        }
    };

    const handleSecondary = () => {
        const current = steps[step];
        if (current.id === 'assess') {
            setIsCritical(true);
        } else if (current.id === 'check') {
            // Jump to Health Authority contact instead of critical immediately if they just need guidance
            // Or keep critical if "Still struggling" implies emergency. 
            // Let's map "Still struggling" to Critical Emergency for safety, 
            // but maybe the user wants the Health Authority option here?
            // The user asked to "add contact number to health authority".
            // Let's make the secondary action of "check" go to the "contact" step.
            setStep(steps.findIndex(s => s.id === 'contact'));
        }
    };

    if (isCritical) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-red-600 text-white p-6 text-center"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="bg-white p-6 rounded-full mb-8"
                    >
                        <Phone className="h-16 w-16 text-red-600" />
                    </motion.div>
                    <h1 className="text-4xl font-bold mb-4">CRITICAL EMERGENCY</h1>
                    <p className="text-xl mb-8 max-w-md">Your symptoms indicate a severe attack. You need professional help immediately.</p>

                    <Button
                        size="lg"
                        className="w-full max-w-sm h-16 text-2xl bg-white text-red-600 hover:bg-red-50 mb-4 font-bold animate-pulse"
                        onClick={handleEmergencyCall}
                    >
                        CALL 112 NOW
                    </Button>

                    <Button
                        variant="ghost"
                        className="text-white/80 hover:text-white hover:bg-red-700"
                        onClick={() => setIsCritical(false)}
                    >
                        Go back to protocol
                    </Button>
                </motion.div>
            </AnimatePresence>
        );
    }

    const currentStep = steps[step];
    const Icon = currentStep.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl p-6"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <X className="h-8 w-8 text-slate-400" />
                    </button>

                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                        <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        />
                    </div>

                    <div className="max-w-md w-full text-center space-y-12">

                        {/* Dynamic Icon */}
                        <div className="relative h-48 w-48 mx-auto flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className={`absolute inset-0 rounded-full blur-xl ${currentStep.color.replace('bg-', 'bg-').replace('500', '200')}`}
                            />
                            <motion.div
                                key={step}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative z-10 bg-white p-6 rounded-full shadow-xl border border-slate-100"
                            >
                                <Icon className={`h-16 w-16 ${currentStep.iconColor}`} />
                            </motion.div>
                        </div>

                        {/* Text Content */}
                        <motion.div
                            key={`text-${step}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="space-y-4"
                        >
                            <h2 className="text-4xl font-bold text-slate-900">{currentStep.title}</h2>
                            <p className="text-xl font-medium text-slate-700">{currentStep.instruction}</p>
                            <p className="text-slate-500">{currentStep.subtext}</p>
                        </motion.div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <Button
                                size="lg"
                                className={`w-full h-14 text-lg shadow-lg hover:opacity-90 transition-all ${currentStep.color}`}
                                onClick={handleNext}
                            >
                                {currentStep.action}
                            </Button>

                            {currentStep.secondaryAction && (
                                <Button
                                    variant="destructive"
                                    size="lg"
                                    className="w-full h-14 text-lg shadow-lg gap-2"
                                    onClick={handleSecondary}
                                >
                                    {currentStep.id === 'assess' ? <AlertTriangle className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                                    {currentStep.secondaryAction}
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EmergencyOverlay;
