import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/scrollAnimations';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

const ClientFeedback = () => {
    return (
        <section id="feedback" className="relative overflow-hidden bg-theme-bg py-24 md:py-32 transition-colors duration-300">
            <div className="mx-auto max-w-6xl px-6 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={fadeUp}
                    className="flex flex-col w-full"
                >
                    {/* Top Label */}
                    <div className="mb-16 md:mb-24 max-w-3xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-medium tracking-tight text-theme-text mb-6"
                        >
                            Client <span className="text-theme-muted italic">Feedback</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-theme-muted leading-relaxed"
                        >
                            Real results delivered for real businesses.
                        </motion.p>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        {/* Quote Mark */}
                        <div className="shrink-0">
                            <span className="text-8xl md:text-[140px] leading-none font-serif text-theme-muted/20 select-none block mt-[-20px] md:mt-[-40px]">
                                &ldquo;
                            </span>
                        </div>

                        {/* Testimonial Text & Details */}
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-2xl md:text-4xl lg:text-[40px] font-normal text-theme-text leading-[1.4] tracking-tight mb-16 md:mb-24">
                            Komal built our web and iOS apps from the ground up. She took the time to truly understand our brand and translated it into a smooth, polished digital experience. Her execution was flawless, and her communication made the entire process seamless. Exactly what we needed to elevate Sundae Doll.
                            </h3>

                            {/* Divider */}
                            <div className="h-px w-full bg-theme-border mb-8" />

                            {/* Bottom Row */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 md:h-14 md:w-14 rounded-md bg-theme-surface border border-theme-border flex items-center justify-center shrink-0">
                                        <span className="text-lg md:text-xl font-medium text-theme-text">VL</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-base md:text-lg font-bold text-theme-text">
                                            Vanessa Lo
                                        </span>
                                        <span className="text-[10px] md:text-xs font-mono text-theme-muted uppercase tracking-widest">
                                            CEO of Sundae Doll
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <a 
                                        href="https://shopsundaedoll.com/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-theme-text text-theme-bg hover:bg-indigo-600 hover:text-white rounded-full font-medium transition-all duration-300 w-fit group"
                                    >
                                        Visit Live Site 
                                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ClientFeedback;
