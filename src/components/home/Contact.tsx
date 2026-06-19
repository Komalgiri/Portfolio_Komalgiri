import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeUp, staggerContainer } from '../../utils/scrollAnimations';
import {
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineMapPin,
    HiOutlineChatBubbleLeftRight,
    HiOutlineUser,
    HiOutlineTag,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiOutlinePaperAirplane,
    HiOutlineArrowPath,
} from 'react-icons/hi2';
import { SiLinkedin, SiGithub } from 'react-icons/si';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState<Partial<typeof form>>({});

    const validate = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
        if (!form.message.trim()) e.message = 'Message is required';
        return e;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setStatus('loading');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const raw = await res.text();
            let data: { error?: string; message?: string } = {};

            if (raw) {
                try {
                    data = JSON.parse(raw) as { error?: string; message?: string };
                } catch {
                    data = {};
                }
            }

            if (!res.ok) {
                throw new Error(data.error || `Request failed (${res.status}).`);
            }
            setStatus('success');
            setFeedback(data.message || 'Message sent successfully.');
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (err: unknown) {
            setStatus('error');
            setFeedback(err instanceof Error ? err.message : 'Could not send message. Please try again.');
        }
    };

    const inputBase = 'w-full px-4 py-3.5 rounded-xl bg-theme-bg border text-theme-text text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-theme-muted/60';
    const inputNormal = `${inputBase} border-theme-border focus:border-indigo-500 focus:ring-indigo-500`;
    const inputError = `${inputBase} border-red-500/60 focus:border-red-500 focus:ring-red-500`;

    const contactLinks = [
        { icon: <HiOutlineEnvelope className="text-lg" />, label: 'komalgiri789@gmail.com', href: 'mailto:komalgiri789@gmail.com' },
        { icon: <HiOutlinePhone className="text-lg" />, label: '+91-7850056842', href: 'tel:+917850056842' },
        { icon: <HiOutlineMapPin className="text-lg" />, label: 'Roorkee, Uttarakhand, India', href: null },
        { icon: <SiLinkedin className="text-lg" />, label: 'linkedin.com/in/komalgiri', href: 'https://www.linkedin.com/in/komalgiri/', external: true },
        { icon: <SiGithub className="text-lg" />, label: 'github.com/Komalgiri', href: 'https://github.com/Komalgiri', external: true },
    ];

    return (
        <section id="contact" className="py-20 md:py-24 bg-theme-bg transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <ScrollReveal className="mb-14">
                    <h2 className="text-5xl md:text-7xl font-black text-theme-text flex items-center gap-6">
                        <span className="w-16 h-[2px] bg-indigo-500"></span>
                        Contact.
                    </h2>
                    <p className="text-theme-muted max-w-xl text-lg font-medium pl-20 mt-4">
                        Whether you have a project in mind or just want to connect — I'm always open.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left — contact info */}
                    <motion.div
                        className="lg:col-span-2 flex flex-col gap-4"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {contactLinks.map(({ icon, label, href, external }) => (
                            <motion.div
                                key={label}
                                variants={fadeUp}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-theme-card border border-theme-border hover:border-indigo-500/30 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-theme-surface/50 border border-theme-border flex items-center justify-center text-indigo-400 shrink-0 group-hover:bg-indigo-500/10 transition-colors">
                                    {icon}
                                </div>
                                {href ? (
                                    <a
                                        href={href}
                                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                        className="text-theme-muted text-sm font-medium hover:text-indigo-400 transition-colors break-all"
                                    >
                                        {label}
                                    </a>
                                ) : (
                                    <span className="text-theme-muted text-sm font-medium">{label}</span>
                                )}
                            </motion.div>
                        ))}

                        {/* Availability badge */}
                        <motion.div variants={fadeUp} className="mt-2 flex items-center gap-3 p-4 rounded-2xl bg-theme-card border border-theme-border">
                            <span className="relative flex h-2.5 w-2.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <p className="text-sm font-bold text-theme-text uppercase tracking-widest">Available for Hire</p>
                        </motion.div>
                    </motion.div>

                    {/* Right — form */}
                    <ScrollReveal variant="fadeRight" delay={0.15} className="lg:col-span-3 bg-theme-card rounded-3xl border border-theme-border p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <HiOutlineChatBubbleLeftRight className="text-2xl text-indigo-400" />
                            <h3 className="text-xl font-bold text-theme-text">Send a Message</h3>
                        </div>

                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                                    <HiOutlineCheckCircle className="text-4xl text-green-400" />
                                </div>
                                <p className="text-theme-text font-bold text-lg">Message Sent!</p>
                                <p className="text-theme-muted text-sm">{feedback}</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-2 px-6 py-2.5 rounded-xl bg-theme-surface/50 border border-theme-border text-sm text-theme-muted hover:text-theme-text hover:bg-theme-surface transition-all"
                                >
                                    Send another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                            Name <span className="text-indigo-400">*</span>
                                        </label>
                                        <div className="relative">
                                            <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Komal Giri"
                                                className={`${errors.name ? inputError : inputNormal} pl-10`}
                                            />
                                        </div>
                                        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                            Email <span className="text-indigo-400">*</span>
                                        </label>
                                        <div className="relative">
                                            <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                className={`${errors.email ? inputError : inputNormal} pl-10`}
                                            />
                                        </div>
                                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                        Subject
                                    </label>
                                    <div className="relative">
                                        <HiOutlineTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
                                        <input
                                            type="text"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="Project inquiry, collaboration, etc."
                                            className={`${inputNormal} pl-10`}
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                        Message <span className="text-indigo-400">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Tell me about your project or idea..."
                                        className={errors.message ? inputError : inputNormal}
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                                </div>

                                {/* Error banner */}
                                {status === 'error' && (
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                        <HiOutlineExclamationCircle className="text-xl shrink-0" />
                                        {feedback}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold transition-colors"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <HiOutlineArrowPath className="text-xl animate-spin" />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            <HiOutlinePaperAirplane className="text-xl" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Contact;
