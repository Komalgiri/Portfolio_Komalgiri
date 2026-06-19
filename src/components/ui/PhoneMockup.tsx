import type { CSSProperties } from 'react';
import agetechImage from '../../assets/agetech.jpg';

interface RealisticPhoneProps {
    screenshotPosition?: string;
    className?: string;
    style?: CSSProperties;
}

const RealisticPhone = ({
    screenshotPosition = 'top center',
    className = '',
    style,
}: RealisticPhoneProps) => (
    <div className={`iphone-device iphone-device--metallic ${className}`} style={style}>
        <div className="iphone-btn iphone-btn--silent" aria-hidden="true" />
        <div className="iphone-btn iphone-btn--vol-up" aria-hidden="true" />
        <div className="iphone-btn iphone-btn--vol-down" aria-hidden="true" />
        <div className="iphone-btn iphone-btn--power" aria-hidden="true" />

        <div className="iphone-chassis">
            <div className="iphone-screen-wrap">
                <img
                    src={agetechImage}
                    alt="BETWEEN app preview"
                    style={{ objectPosition: screenshotPosition }}
                />
                <div className="iphone-island" aria-hidden="true" />
                <div className="iphone-glare" aria-hidden="true" />
            </div>
        </div>

        <div className="iphone-ground-shadow" aria-hidden="true" />
    </div>
);

const PhoneMockup = () => (
    <div className="relative w-full">
        <div className="mockup-stage relative flex min-h-[460px] items-center justify-center px-2 pb-6 sm:min-h-[540px] sm:px-0 lg:min-h-[600px]">
            <RealisticPhone
                screenshotPosition="top left"
                className="absolute z-10 max-sm:scale-[0.88]"
                style={{
                    left: 'clamp(2%, 6vw, 12%)',
                    top: '38%',
                    transform: 'translateY(-50%) rotateZ(-14deg) rotateY(6deg)',
                }}
            />
            <RealisticPhone
                screenshotPosition="top center"
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

export default PhoneMockup;
