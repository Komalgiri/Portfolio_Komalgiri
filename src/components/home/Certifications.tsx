import { useReducedMotion } from '../../hooks/useReducedMotion';
import { certificateMarqueeImages } from '../../constants/certificateMarquee';

const Certifications = () => {
    const reducedMotion = useReducedMotion();
    const items = [...certificateMarqueeImages, ...certificateMarqueeImages];

    return (
        <div id="certifications" aria-label="Certificates" className="mt-12 w-full md:mt-16">
            <div className="relative w-full overflow-hidden py-4 md:py-6">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-theme-bg to-transparent md:w-28" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-theme-bg to-transparent md:w-28" />
                <div
                    className={`flex w-max items-center gap-8 px-6 md:gap-10 md:px-8 ${
                        reducedMotion ? 'flex-wrap justify-center' : 'animate-marquee'
                    }`}
                >
                    {items.map((cert, i) => (
                        <div
                            key={`${cert.alt}-${i}`}
                            className="group shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                        >
                            <div className="overflow-hidden rounded-2xl border border-theme-border bg-white shadow-xl shadow-black/15 transition-colors group-hover:border-indigo-500/40 dark:bg-theme-card dark:shadow-black/35">
                                <img
                                    src={cert.src}
                                    alt={cert.alt}
                                    loading="lazy"
                                    className="block h-[280px] w-auto max-w-none object-contain sm:h-[320px] md:h-[360px] lg:h-[400px]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Certifications;
