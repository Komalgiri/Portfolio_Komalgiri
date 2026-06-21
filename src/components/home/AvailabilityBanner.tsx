import { CORE_SERVICES } from '../../constants/site';

const SERVICE_SIZES = [
    'text-xl font-bold md:text-2xl',
    'text-sm font-medium md:text-base',
    'text-lg font-semibold md:text-xl',
    'text-xs font-medium uppercase tracking-wide md:text-sm',
    'text-base font-bold md:text-lg',
    'text-2xl font-black md:text-3xl',
] as const;

const AvailabilityBanner = () => (
    <aside id="availability" aria-label="Services offered" className="border-y border-theme-border bg-theme-bg">
        <div className="mx-auto max-w-5xl px-6 py-10 md:py-12">
            <div className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-4 text-center sm:gap-x-6">
                {CORE_SERVICES.map((service, i) => (
                    <span
                        key={service}
                        className={`${SERVICE_SIZES[i % SERVICE_SIZES.length]} text-theme-text`}
                    >
                        {service}
                    </span>
                ))}
            </div>
        </div>
    </aside>
);

export default AvailabilityBanner;
