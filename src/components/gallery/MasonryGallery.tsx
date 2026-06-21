import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { GalleryMediaItem } from '../../constants/mediaGallery';

const CAPTION_HEIGHT = 72;
const COMPACT_CAPTION_HEIGHT = 52;
const DEFAULT_CARD_HEIGHT = 300;
const MAX_IMAGE_HEIGHT = 460;
const COMPACT_MAX_IMAGE_HEIGHT = 176;
const MOBILE_MAX_WIDTH = 260;

function useColumnCount() {
    const [count, setCount] = useState(1);

    useEffect(() => {
        const update = () => {
            if (window.matchMedia('(min-width: 1024px)').matches) setCount(3);
            else if (window.matchMedia('(min-width: 640px)').matches) setCount(2);
            else setCount(1);
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return count;
}

function distributeItems(
    items: GalleryMediaItem[],
    columnCount: number,
    heights: Map<string, number>,
): GalleryMediaItem[][] {
    const columns: GalleryMediaItem[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights = Array(columnCount).fill(0);
    let tieBreaker = 0;

    for (const item of items) {
        const minHeight = Math.min(...columnHeights);
        const candidates = columnHeights
            .map((height, index) => (height === minHeight ? index : -1))
            .filter((index) => index >= 0);
        const targetColumn = candidates[tieBreaker % candidates.length];
        tieBreaker += 1;

        columns[targetColumn].push(item);
        columnHeights[targetColumn] += heights.get(item.id) ?? DEFAULT_CARD_HEIGHT;
    }

    return columns;
}

function estimateCardHeight(
    naturalWidth: number,
    naturalHeight: number,
    columnWidth: number,
    size: GalleryMediaItem['size'],
) {
    const caption =
        size === 'compact' ? COMPACT_CAPTION_HEIGHT : CAPTION_HEIGHT;

    if (size === 'mobile') {
        const imageWidth = Math.min(MOBILE_MAX_WIDTH, columnWidth);
        const scaledHeight = (naturalHeight / naturalWidth) * imageWidth;
        return scaledHeight + caption;
    }

    const maxImage = size === 'compact' ? COMPACT_MAX_IMAGE_HEIGHT : MAX_IMAGE_HEIGHT;
    const widthFactor = size === 'compact' ? 0.75 : 1;
    const imageWidth = columnWidth * widthFactor;
    const scaledHeight = (naturalHeight / naturalWidth) * imageWidth;

    return Math.min(scaledHeight, maxImage) + caption;
}

function cardClasses(size: GalleryMediaItem['size']) {
    if (size === 'compact') {
        return 'mx-auto w-[72%] rounded-xl sm:w-[68%] lg:w-[78%]';
    }
    if (size === 'mobile') {
        return 'mx-auto w-full max-w-[260px] rounded-2xl';
    }
    return 'rounded-2xl';
}

function mediaWrapperClasses(size: GalleryMediaItem['size']) {
    if (size === 'mobile') {
        return 'bg-slate-950';
    }
    return 'bg-black/5';
}

function mediaClasses(size: GalleryMediaItem['size']) {
    if (size === 'compact') {
        return 'max-h-44 object-cover object-top';
    }
    if (size === 'mobile') {
        return 'h-auto w-full';
    }
    return 'max-h-[460px] object-contain object-top';
}

interface MasonryGalleryProps {
    items: GalleryMediaItem[];
}

const MasonryGallery = ({ items }: MasonryGalleryProps) => {
    const columnCount = useColumnCount();
    const [heights, setHeights] = useState<Map<string, number>>(() => new Map());
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const observer = new ResizeObserver(([entry]) => {
            setContainerWidth(entry.contentRect.width);
        });

        observer.observe(node);
        setContainerWidth(node.getBoundingClientRect().width);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!containerWidth) return;

        let cancelled = false;
        const columnWidth = (containerWidth - 20 * (columnCount - 1)) / columnCount;

        const preloadHeights = async () => {
            const next = new Map<string, number>();

            await Promise.all(
                items.map(
                    (item) =>
                        new Promise<void>((resolve) => {
                            if (item.type === 'video') {
                                resolve();
                                return;
                            }

                            const img = new Image();
                            img.onload = () => {
                                next.set(
                                    item.id,
                                    estimateCardHeight(
                                        img.naturalWidth,
                                        img.naturalHeight,
                                        columnWidth,
                                        item.size,
                                    ),
                                );
                                resolve();
                            };
                            img.onerror = () => resolve();
                            img.src = item.src;
                        }),
                ),
            );

            if (!cancelled && next.size > 0) {
                setHeights(next);
            }
        };

        preloadHeights();

        return () => {
            cancelled = true;
        };
    }, [items, containerWidth, columnCount]);

    const columns = useMemo(
        () => distributeItems(items, columnCount, heights),
        [items, columnCount, heights],
    );

    const registerHeight = useCallback(
        (id: string, naturalWidth: number, naturalHeight: number, size: GalleryMediaItem['size']) => {
            if (!containerWidth || !naturalWidth) return;

            const columnWidth = (containerWidth - 20 * (columnCount - 1)) / columnCount;
            const estimated = estimateCardHeight(naturalWidth, naturalHeight, columnWidth, size);

            setHeights((prev) => {
                const current = prev.get(id);
                if (current !== undefined && Math.abs(current - estimated) < 4) return prev;

                const next = new Map(prev);
                next.set(id, estimated);
                return next;
            });
        },
        [columnCount, containerWidth],
    );

    return (
        <div ref={containerRef} className="flex items-start gap-5">
            {columns.map((columnItems, columnIndex) => (
                <div key={columnIndex} className="flex min-w-0 flex-1 flex-col gap-5">
                    {columnItems.map((item, index) => {
                        const size = item.size ?? 'default';

                        return (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.4, delay: (index % 6) * 0.03 }}
                                className={`overflow-hidden border border-theme-border bg-theme-card shadow-sm transition-shadow hover:shadow-md ${cardClasses(size)}`}
                            >
                                <div className={mediaWrapperClasses(size)}>
                                    {item.type === 'video' ? (
                                        <video
                                            src={item.src}
                                            poster={item.poster}
                                            controls
                                            muted
                                            playsInline
                                            preload="metadata"
                                            className={`block w-full ${mediaClasses(size)}`}
                                        />
                                    ) : (
                                        <img
                                            src={item.src}
                                            alt={item.title}
                                            loading="lazy"
                                            onLoad={(event) => {
                                                const img = event.currentTarget;
                                                registerHeight(
                                                    item.id,
                                                    img.naturalWidth,
                                                    img.naturalHeight,
                                                    size,
                                                );
                                            }}
                                            className={`block w-full ${mediaClasses(size)}`}
                                        />
                                    )}
                                </div>
                                <div
                                    className={`border-t border-theme-border ${
                                        size === 'compact' ? 'px-3 py-2' : 'px-4 py-3'
                                    }`}
                                >
                                    <h3
                                        className={`font-bold text-theme-text ${
                                            size === 'compact' ? 'text-xs' : 'text-sm'
                                        }`}
                                    >
                                        {item.title}
                                    </h3>
                                    {item.caption && (
                                        <p
                                            className={`leading-relaxed text-theme-muted ${
                                                size === 'compact'
                                                    ? 'mt-0.5 text-[10px] line-clamp-2'
                                                    : 'mt-1 text-xs'
                                            }`}
                                        >
                                            {item.caption}
                                        </p>
                                    )}
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default MasonryGallery;
