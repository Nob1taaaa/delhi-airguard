import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, Megaphone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceOfChangeProps {
    onActionComplete?: () => void;
}

const VoiceOfChange = ({ onActionComplete }: VoiceOfChangeProps) => {
    const [copied, setCopied] = useState(false);

    const letterSubject = "Urgent Action Required: AI-Driven Insights & Strategic Proposal for Mitigating Critical Air Pollution Crisis";
    const recipientEmail = "minister.moefcc@gov.in"; // Example email

    const letterBody = `Date: November 23, 2025

To,
The Hon’ble Minister,
Ministry of Environment, Forest and Climate Change (MoEFCC),
Government of India,
Indira Paryavaran Bhawan,
Jor Bagh Road, New Delhi - 110003.

Subject: Urgent Action Required: AI-Driven Insights & Strategic Proposal for Mitigating Critical Air Pollution Crisis

Respected Sir/Madam,

We are writing to you on behalf of AirShield Global, an advanced AI-powered environmental intelligence initiative dedicated to monitoring, analyzing, and predicting air quality patterns across India. Our system leverages cutting-edge artificial intelligence, satellite fusion data, and hyperlocal sensor networks to provide real-time insights into the deepening pollution crisis affecting our nation.

We are submitting this representation to bring to your immediate attention critical findings from our latest analysis and to propose a technology-driven partnership to safeguard the health of millions of Indian citizens.

1. Critical Findings: The Invisible Emergency
Our deep-learning models have analyzed air quality data over the past 12 months, revealing alarming trends that demand immediate intervention:
* Life Expectancy Impact: Residents in high-risk zones are losing an average of 5-7 years of life expectancy.
* Hyperlocal Spikes: Unmonitored, extreme pollution spikes in residential areas caused by localized waste burning.
* The "Smog Dome" Effect: Forecast of a severe "Smog Dome" formation over North India in the coming 72 hours.

2. The Power of AirShield Global Technology
* Predictive AI (48-72 Hours): We predict pollution events before they occur.
* Source Identification: Distinguishing between vehicular emissions, industrial smoke, and biomass burning.
* Fused Intelligence: Combining satellite imagery with ground-level data.

3. Urgent Recommendations for Immediate Action
* Zero-Tolerance Enforcement: Deploy drone-based surveillance in "hotspots".
* Dynamic Traffic Regulation: Implement AI-triggered traffic restrictions automatically.
* Inter-State Coordination: Coordinate real-time stubble management.
* Health Emergency Protocol: Issue mandatory "Stay Indoors" advisories when needed.

4. A Proposal for Partnership
AirShield Global offers its technology to the Government of India:
* Real-Time Decision Dashboard for CPCB.
* District-Level Alerts for DMs.
* Public Safety Integration via official apps.

Conclusion
The economic cost of inaction is estimated at billions of dollars annually, but the human cost is incalculable. AirShield Global is committed to supporting the Government of India. We possess the data, the technology, and the resolve to make a difference.

We earnestly request an opportunity to present our system and detailed findings to your technical committee at the earliest convenience.

Yours faithfully,

Lead Developers & Researchers,
AirShield Global Initiative`;

    const handleAction = () => {
        // 1. Copy to Clipboard
        navigator.clipboard.writeText(letterBody).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });

        // 2. Open Mail Client
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(letterSubject)}&body=${encodeURIComponent("Please find the formal representation pasted below:\n\n")}`;
        window.location.href = mailtoLink;

        // 3. Trigger Score Update
        if (onActionComplete) {
            onActionComplete();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 md:p-8"
        >
            <div className="relative flex flex-col md:flex-row items-center gap-8">
                {/* Icon Section */}
                <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 border border-purple-100">
                        <Megaphone className="h-8 w-8 text-purple-600" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
                        Be the Voice of Change 🇮🇳
                    </h3>
                    <p className="text-slate-500 mb-6 max-w-xl leading-relaxed">
                        Don't just watch the AQI rise—act on it. Send our official, AI-backed policy letter to the Ministry instantly.
                        <span className="inline-flex items-center ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                            ✨ Pre-drafted for you
                        </span>
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <Button
                            onClick={handleAction}
                            size="lg"
                            className="bg-slate-900 text-white hover:bg-slate-800 shadow-sm min-w-[200px]"
                        >
                            <AnimatePresence mode='wait'>
                                {copied ? (
                                    <motion.div
                                        key="copied"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Check className="h-4 w-4" />
                                        <span>Mail Opened!</span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="default"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Mail className="h-4 w-4" />
                                        <span>Send Letter to Minister</span>
                                        <ArrowRight className="h-4 w-4 opacity-50" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                        <p className="text-xs text-slate-400">
                            *Clicking copies the letter & opens your mail app.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default VoiceOfChange;
