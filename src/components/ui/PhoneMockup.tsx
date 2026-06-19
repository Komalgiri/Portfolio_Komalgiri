import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import agetechImage from '../../assets/agetech.jpg';

export const SLIDE_INTERVAL_MS = 4500;

const getSlideIndex = (length: number, intervalMs: number, phaseOffsetMs: number) => {
    if (length <= 1) return 0;
    const slide = Math.floor((Date.now() + phaseOffsetMs) / intervalMs);
    return ((slide % length) + length) % length;
};

interface SlideshowScreenProps {
    images: string[];
    alt: string;
    screenshotPosition?: string;
    intervalMs?: number;
    phaseOffsetMs?: number;
}

const SlideshowScreen = ({
    images,
    alt,
    screenshotPosition = 'top center',
    intervalMs = SLIDE_INTERVAL_MS,
    phaseOffsetMs = 0,
}: SlideshowScreenProps) => {
    const [index, setIndex] = useState(() => getSlideIndex(images.length, intervalMs, phaseOffsetMs));
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (images.length <= 1) return;

        const sync = () => {
            const next = getSlideIndex(images.length, intervalMs, phaseOffsetMs);
            setIndex((prev) => (prev === next ? prev : next));
        };

        sync();
        const id = window.setInterval(sync, 150);
        return () => window.clearInterval(id);
    }, [images.length, intervalMs, phaseOffsetMs]);

    if (images.length === 0) {
        return (
            <img
                src={agetechImage}
                alt={alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: screenshotPosition }}
            />
        );
    }

    if (images.length === 1 || reducedMotion) {
        return (
            <img
                src={images[index]}
                alt={alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: screenshotPosition }}
            />
        );
    }

    return (
        <div className="relative h-full w-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    alt={`${alt} — screen ${index + 1} of ${images.length}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: screenshotPosition }}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                />
            </AnimatePresence>
        </div>
    );
};

interface RealisticPhoneProps {
    screenshots?: string[];
    screenshot?: string;
    screenshotAlt?: string;
    screenshotPosition?: string;
    slideIntervalMs?: number;
    phaseOffsetMs?: number;
    className?: string;
    style?: CSSProperties;
}

export const RealisticPhone = ({
    screenshots,
    screenshot = agetechImage,
    screenshotAlt = 'App preview',
    screenshotPosition = 'top center',
    slideIntervalMs,
    phaseOffsetMs = 0,
    className = '',
    style,
}: RealisticPhoneProps) => {
    const images = screenshots && screenshots.length > 0 ? screenshots : [screenshot];

    return (
        <div className={`iphone-device iphone-device--metallic ${className}`} style={style}>
            <div className="iphone-btn iphone-btn--silent" aria-hidden="true" />
            <div className="iphone-btn iphone-btn--vol-up" aria-hidden="true" />
            <div className="iphone-btn iphone-btn--vol-down" aria-hidden="true" />
            <div className="iphone-btn iphone-btn--power" aria-hidden="true" />

            <div className="iphone-chassis">
                <div className="iphone-screen-wrap">
                    <SlideshowScreen
                        images={images}
                        alt={screenshotAlt}
                        screenshotPosition={screenshotPosition}
                        intervalMs={slideIntervalMs}
                        phaseOffsetMs={phaseOffsetMs}
                    />
                    <div className="iphone-island" aria-hidden="true" />
                    <div className="iphone-glare" aria-hidden="true" />
                </div>
            </div>

            <div className="iphone-ground-shadow" aria-hidden="true" />
        </div>
    );
};

interface PhoneMockupProps {
    leftScreenshots?: string[];
    rightScreenshots?: string[];
    leftScreenshotAlt?: string;
    rightScreenshotAlt?: string;
    slideIntervalMs?: number;
    /** @deprecated Use leftScreenshots and rightScreenshots */
    leftScreenshot?: string;
    /** @deprecated Use leftScreenshots and rightScreenshots */
    rightScreenshot?: string;
    /** @deprecated Use leftScreenshots and rightScreenshots */
    screenshot?: string;
}

const PhoneMockup = ({
    leftScreenshots,
    rightScreenshots,
    leftScreenshotAlt = 'BETWEEN app preview',
    rightScreenshotAlt = 'BETWEEN app preview',
    slideIntervalMs = SLIDE_INTERVAL_MS,
    leftScreenshot,
    rightScreenshot,
    screenshot,
}: PhoneMockupProps) => {
    const leftImages =
        leftScreenshots ??
        (leftScreenshot || screenshot ? [leftScreenshot ?? screenshot!] : undefined);
    const rightImages =
        rightScreenshots ??
        (rightScreenshot || screenshot || leftScreenshot
            ? [rightScreenshot ?? screenshot ?? leftScreenshot!]
            : undefined);

    const halfCycle = Math.round(slideIntervalMs / 2);

    return (
        <div className="relative w-full">
            <div className="mockup-stage relative flex min-h-[460px] items-center justify-center px-2 pb-6 sm:min-h-[540px] sm:px-0 lg:min-h-[600px]">
                <RealisticPhone
                    screenshots={leftImages}
                    screenshotAlt={leftScreenshotAlt}
                    screenshotPosition="top center"
                    slideIntervalMs={slideIntervalMs}
                    phaseOffsetMs={halfCycle}
                    className="absolute z-10 max-sm:scale-[0.88]"
                    style={{
                        left: 'clamp(2%, 6vw, 12%)',
                        top: '38%',
                        transform: 'translateY(-50%) rotateZ(-14deg) rotateY(6deg)',
                    }}
                />
                <RealisticPhone
                    screenshots={rightImages}
                    screenshotAlt={rightScreenshotAlt}
                    screenshotPosition="top center"
                    slideIntervalMs={slideIntervalMs}
                    phaseOffsetMs={0}
                    className="absolute z-20 max-sm:scale-[0.9] sm:scale-105"
                    style={{
                        right: 'clamp(2%, 4vw, 8%)',
                        top: '62%',
                        transform: 'translateY(-50%) rotateZ(12deg) rotateY(-5deg)',
                    }}
                />
            </div>
        </div>
    );
};

export default PhoneMockup;
