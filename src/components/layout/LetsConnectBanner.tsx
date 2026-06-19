import { motion } from 'framer-motion';

const LetsConnectBanner = () => (
    <div className="relative w-full overflow-hidden border-t border-theme-border bg-theme-bg py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/[0.04] via-transparent to-teal-500/[0.04]" />

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 w-full px-6"
        >
            <p className="connect-display w-full text-theme-text">
                LETS CONNECT
            </p>
        </motion.div>
    </div>
);

export default LetsConnectBanner;
