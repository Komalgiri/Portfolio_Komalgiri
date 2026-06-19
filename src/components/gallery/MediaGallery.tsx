import { motion } from 'framer-motion';
import type { GalleryMediaItem } from '../../constants/mediaGallery';

interface MediaGalleryProps {
    items: GalleryMediaItem[];
}

const MediaGallery = ({ items }: MediaGalleryProps) => {
    if (items.length === 0) {
        return (
            <p className="rounded-2xl border border-dashed border-theme-border py-16 text-center text-theme-muted">
                Gallery items coming soon.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {items.map((item, index) => (
                <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="overflow-hidden rounded-2xl border border-theme-border bg-theme-card"
                >
                    <div className="aspect-[9/16] max-h-[520px] w-full overflow-hidden bg-black/5 sm:aspect-[4/5] sm:max-h-none">
                        {item.type === 'video' ? (
                            <video
                                src={item.src}
                                poster={item.poster}
                                controls
                                muted
                                playsInline
                                preload="metadata"
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <img
                                src={item.src}
                                alt={item.title}
                                loading="lazy"
                                className="h-full w-full object-contain"
                            />
                        )}
                    </div>
                    <div className="border-t border-theme-border px-4 py-3 sm:px-5 sm:py-4">
                        <h3 className="text-sm font-bold text-theme-text sm:text-base">{item.title}</h3>
                        {item.caption && (
                            <p className="mt-1 text-xs leading-relaxed text-theme-muted sm:text-sm">
                                {item.caption}
                            </p>
                        )}
                    </div>
                </motion.article>
            ))}
        </div>
    );
};

export default MediaGallery;
