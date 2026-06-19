import { motion } from 'framer-motion';
import SubpageHeader from '../components/layout/SubpageHeader';
import MediaGallery from '../components/gallery/MediaGallery';
import { uiDesignItems } from '../constants/uiDesign';
import { HiOutlinePaintBrush } from 'react-icons/hi2';

const UIDesignGallery = ({ onBack }: { onBack: () => void }) => (
    <div className="min-h-screen bg-theme-bg text-theme-text selection:bg-indigo-500/30 transition-colors duration-300">
        <SubpageHeader onBack={onBack} />

        <main className="px-6 pt-32 pb-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 md:mb-14">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-400"
                    >
                        <HiOutlinePaintBrush /> UI & Visual Design
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-black tracking-tight md:text-6xl"
                    >
                        UI Design <span className="text-violet-400">Gallery</span>
                    </motion.h1>
                </div>

                <MediaGallery items={uiDesignItems} />
            </div>
        </main>
    </div>
);

export default UIDesignGallery;
