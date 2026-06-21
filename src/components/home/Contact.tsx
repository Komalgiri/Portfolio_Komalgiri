import { useState } from 'react';
import { HiOutlineArrowRight, HiOutlineArrowPath, HiOutlineCheckCircle, HiOutlineMapPin } from 'react-icons/hi2';
import { WORK_LOCATIONS_LABEL, US_REMOTE_LABEL } from '../../constants/site';

type FormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

const Contact = () => {
    const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState<Partial<FormState>>({});

    const validate = () => {
        const e: Partial<FormState> = {};
        if (!form.name.trim()) e.name = 'Required';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
        if (!form.message.trim()) e.message = 'Required';
        return e;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        const scriptUrl = import.meta.env.VITE_CONTACT_SCRIPT_URL as string | undefined;
        const scriptSecret = import.meta.env.VITE_CONTACT_SECRET as string | undefined;
        const useGoogleScript = Boolean(scriptUrl?.trim());

        if (useGoogleScript && !scriptSecret?.trim()) {
            setStatus('error');
            setFeedback('Contact form is not configured. Set VITE_CONTACT_SECRET in environment variables.');
            return;
        }

        setStatus('loading');
        try {
            const payload = useGoogleScript
                ? {
                      secret: scriptSecret,
                      name: form.name.trim(),
                      email: form.email.trim(),
                      phone: form.phone.trim(),
                      message: form.message.trim(),
                  }
                : {
                      name: form.name.trim(),
                      email: form.email.trim(),
                      subject: form.phone.trim() ? `Phone: ${form.phone.trim()}` : '',
                      message: form.message.trim(),
                  };

            const res = await fetch(useGoogleScript ? scriptUrl! : '/api/contact', {
                method: 'POST',
                headers: useGoogleScript
                    ? { 'Content-Type': 'text/plain;charset=utf-8' }
                    : { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const raw = await res.text();
            let data: { error?: string; message?: string; success?: boolean; status?: number } = {};

            if (raw) {
                try {
                    data = JSON.parse(raw) as typeof data;
                } catch {
                    data = {};
                }
            }

            if (data.error || (data.status && data.status >= 400)) {
                throw new Error(data.error || 'Request failed.');
            }

            if (!useGoogleScript && !res.ok) {
                throw new Error(data.error || `Request failed (${res.status}).`);
            }

            setStatus('success');
            setFeedback(data.message || 'Message sent successfully.');
            setForm({ name: '', email: '', phone: '', message: '' });
        } catch (err: unknown) {
            setStatus('error');
            setFeedback(err instanceof Error ? err.message : 'Could not send message. Please try again.');
        }
    };

    const fieldClass = (hasError: boolean) =>
        `contact-field w-full bg-transparent pb-3 pt-1 text-sm text-theme-text outline-none placeholder:text-theme-muted/40 ${
            hasError ? 'border-red-400/60' : ''
        }`;

    return (
        <section id="contact" className="bg-theme-bg py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
                    {/* Left — serif heading */}
                    <div className="lg:pt-4">
                        <div className="flex items-start gap-6">
                            <h2 className="contact-serif-heading text-theme-text">
                                LET&apos;S
                                <br />
                                GET
                                <br />
                                IN TOUCH
                            </h2>
                            <div className="contact-ornament mt-2 shrink-0" aria-hidden="true">
                                <span className="contact-ornament-dot" />
                                <span className="contact-ornament-arc" />
                            </div>
                        </div>
                        <p className="mt-8 max-w-sm text-sm leading-relaxed text-theme-muted">
                            Hiring for a full-time role or a freelance project? Share the role, scope, timeline,
                            and stack — I respond within 1–2 business days.
                        </p>
                    </div>

                    {/* Right — form + details */}
                    <div className="flex flex-col">
                        {status === 'success' ? (
                            <div className="flex flex-col items-start gap-4 py-8">
                                <HiOutlineCheckCircle className="text-3xl text-green-400" />
                                <p className="text-lg font-medium text-theme-text">Message sent.</p>
                                <p className="text-sm text-theme-muted">{feedback}</p>
                                <button
                                    type="button"
                                    onClick={() => setStatus('idle')}
                                    className="mt-2 text-sm text-theme-muted underline-offset-4 hover:text-theme-text hover:underline"
                                >
                                    Send another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-8">
                                <div>
                                    <div className="contact-field-wrap">
                                        <label htmlFor="contact-name" className="contact-field-label">
                                            Full Name
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className={fieldClass(!!errors.name)}
                                            autoComplete="name"
                                        />
                                        <span className="contact-field-required">*</span>
                                    </div>
                                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                    <div>
                                        <div className="contact-field-wrap">
                                            <label htmlFor="contact-email" className="contact-field-label">
                                                Email
                                            </label>
                                            <input
                                                id="contact-email"
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                className={fieldClass(!!errors.email)}
                                                autoComplete="email"
                                            />
                                            <span className="contact-field-required">*</span>
                                        </div>
                                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <div className="contact-field-wrap">
                                            <label htmlFor="contact-phone" className="contact-field-label">
                                                Phone
                                            </label>
                                            <input
                                                id="contact-phone"
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                className={fieldClass(false)}
                                                autoComplete="tel"
                                            />
                                            <span className="contact-field-required">*</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="contact-field-wrap">
                                        <label htmlFor="contact-message" className="contact-field-label">
                                            Message
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Project scope, timeline, and tech stack..."
                                            className={`${fieldClass(!!errors.message)} resize-none`}
                                        />
                                        <span className="contact-field-required">*</span>
                                    </div>
                                    {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                                </div>

                                {status === 'error' && (
                                    <p className="text-sm text-red-400">{feedback}</p>
                                )}

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        aria-label="Send message"
                                        className="group flex h-12 w-12 items-center justify-center text-theme-text transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        {status === 'loading' ? (
                                            <HiOutlineArrowPath className="animate-spin text-2xl" />
                                        ) : (
                                            <HiOutlineArrowRight className="text-3xl transition-transform group-hover:translate-x-1" />
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:mt-20">
                            <div>
                                <p className="contact-detail-label">Email</p>
                                <a
                                    href="mailto:komalgiri789@gmail.com"
                                    className="mt-3 block text-sm leading-relaxed text-theme-muted transition-colors hover:text-theme-text"
                                >
                                    komalgiri789@gmail.com
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/komalgiri/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 block text-sm leading-relaxed text-theme-muted transition-colors hover:text-theme-text"
                                >
                                    linkedin.com/in/komalgiri
                                </a>
                            </div>
                            <div>
                                <p className="contact-detail-label">Phone</p>
                                <a
                                    href="tel:+917850056842"
                                    className="mt-3 block text-sm leading-relaxed text-theme-muted transition-colors hover:text-theme-text"
                                >
                                    +91-7850056842
                                </a>
                            </div>
                            <div>
                                <p className="contact-detail-label">Work with</p>
                                <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-theme-muted">
                                    <HiOutlineMapPin className="mt-0.5 shrink-0 text-indigo-500" />
                                    {WORK_LOCATIONS_LABEL}
                                </p>
                                <p className="mt-1 text-xs text-theme-muted/80">{US_REMOTE_LABEL}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
