import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
    value: number;
    decimals?: number;
    suffix?: string;
    className?: string;
    duration?: number;
}

const AnimatedCounter = ({
    value,
    decimals = 0,
    suffix = '',
    className = '',
    duration = 1600,
}: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const startTime = performance.now();

        const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(value * eased);
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {display.toFixed(decimals)}
            {suffix}
        </span>
    );
};

export default AnimatedCounter;
