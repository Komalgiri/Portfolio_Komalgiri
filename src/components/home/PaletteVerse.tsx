import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';
import pvVideo from '../../assets/pv.mp4';

const PaletteVerse = () => (
    <section
        id="paletteverse"
        className="border-y border-theme-border bg-theme-bg"
    >
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
                
                {/* Text Content */}
                <div className="max-w-xl text-left">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-theme-muted">
                        Featured Project
                    </p>
                    <h2 className="text-3xl font-black tracking-tight text-theme-text md:text-4xl">
                        PaletteVerse
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-theme-muted md:text-base">
                        The ultimate UI/UX design tool and color generator. Craft palettes, test WCAG accessibility instantly, and cure creative block with built-in mini-games.
                    </p>
                    
                    <a
                        href="https://palette-verse.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-theme-text px-5 py-2.5 text-sm font-bold text-theme-bg transition-colors hover:bg-theme-muted"
                    >
                        Live Preview
                        <HiOutlineArrowTopRightOnSquare className="text-lg" />
                    </a>
                </div>

                {/* Video Showcase */}
                <div className="w-full max-w-lg shrink-0 overflow-hidden rounded-xl border border-theme-border shadow-sm bg-theme-card">
                    <video
                        src={pvVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto object-cover"
                    />
                </div>
                
            </div>
        </div>
    </section>
);

export default PaletteVerse;
