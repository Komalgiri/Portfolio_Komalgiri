import ScrollReveal from '../ui/ScrollReveal';
import { FiExternalLink, FiArrowRight } from 'react-icons/fi';

import cafe1 from '../../assets/cafe.png';
import cafe2 from '../../assets/cafe2.png';
import havenstay1 from '../../assets/Havanstay.png';
import havenstay2 from '../../assets/Havenstay2.png';
import velora1 from '../../assets/Velora.png';
import velora2 from '../../assets/Velora2.png';

const pitches = [
    {
        id: 'velora',
        title: 'Velora',
        description: 'A luxurious and modern e-commerce storefront designed for high-end fashion brands. Features a sleek, minimalist aesthetic with seamless product discovery and elegant typography.',
        images: [velora1, velora2],
        link: 'https://velora-seven-hazel.vercel.app/',
        tags: ['React', 'E-commerce', 'Luxury UI', 'Tailwind CSS'],
    },
    {
        id: 'havenstay',
        title: 'HavenStay',
        description: 'A premium hotel and resort booking platform. The interface focuses on high-quality imagery, smooth booking flows, and a relaxing color palette to convey hospitality and comfort.',
        images: [havenstay1, havenstay2],
        link: 'https://havenstay-gray.vercel.app/',
        tags: ['React', 'Booking System', 'Hospitality', 'Framer Motion'],
    },
    {
        id: 'bean-brew',
        title: 'Bean & Brew',
        description: 'An artisan coffee shop landing page built to attract local customers. It features warm tones, a cozy atmosphere, and clear calls-to-action for menu viewing and reservations.',
        images: [cafe1, cafe2],
        link: 'https://bean-and-brew-eta.vercel.app/',
        tags: ['React', 'Landing Page', 'Local Business', 'Responsive Design'],
    },
];

const WebDevPitches = () => {
    return (
        <section className="py-32 bg-theme-bg" id="freelance-pitches">
            <div className="container mx-auto px-4 max-w-7xl">
                <ScrollReveal>
                    <div className="mb-24 max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-theme-text mb-6">
                            Featured <span className="text-theme-muted italic">Client Pitches</span>
                        </h2>
                        <p className="text-lg text-theme-muted leading-relaxed">
                            A curated selection of live, fully-functional websites designed to showcase my capabilities in crafting premium digital experiences.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="flex flex-col gap-32">
                    {pitches.map((pitch, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={pitch.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                                
                                {/* Text Content */}
                                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                                    <ScrollReveal variant={isEven ? "fadeRight" : "fadeLeft"}>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {pitch.tags.map(tag => (
                                                <span 
                                                    key={tag} 
                                                    className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-medium text-theme-text mb-6">
                                            {pitch.title}
                                        </h3>
                                        <p className="text-lg text-theme-muted mb-8 leading-relaxed">
                                            {pitch.description}
                                        </p>
                                        <a 
                                            href={pitch.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-theme-text text-theme-bg hover:bg-indigo-600 hover:text-white rounded-full font-medium transition-all duration-300 w-fit group"
                                        >
                                            Visit Live Site 
                                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </ScrollReveal>
                                </div>

                                {/* Images */}
                                <div className="w-full lg:w-7/12">
                                    <ScrollReveal variant={isEven ? "fadeLeft" : "fadeRight"} className="w-full">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                                            {pitch.images.map((img, imgIndex) => (
                                                <a 
                                                    key={imgIndex}
                                                    href={pitch.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className={`block rounded-xl overflow-hidden border border-theme-border/50 shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:shadow-indigo-500/20 ${imgIndex === 1 ? 'sm:mt-12' : ''}`}
                                                >
                                                    {/* Using object-cover for full width/height since items-start prevents container stretching */}
                                                    <img 
                                                        src={img} 
                                                        alt={`${pitch.title} preview ${imgIndex + 1}`} 
                                                        className="w-full h-auto object-cover"
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </ScrollReveal>
                                </div>
                                
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WebDevPitches;
