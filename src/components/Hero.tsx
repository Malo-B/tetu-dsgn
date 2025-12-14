
import { motion } from 'framer-motion';
import { Section } from './ui/Section';

/**
 * Hero Component
 * Full-screen hero section with animated logo and background.
 * Uses Framer Motion for entrance animations.
 */
const Hero = () => {
    return (
        <Section style={{
            height: '100vh',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
            backgroundImage: 'url(/images/beige_hoodie_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                style={{ zIndex: 10, padding: '0 2rem', width: '100%', display: 'flex', justifyContent: 'center' }}
            >
                <img
                    src="/logo_tetu.svg"
                    alt="TÊTU"
                    style={{
                        width: 'clamp(300px, 60vw, 600px)',
                        height: 'auto',
                        maxWidth: '90%'
                    }}
                />
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{
                    position: 'absolute',
                    bottom: 'clamp(2rem, 8vh, 4rem)',
                    fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'var(--color-accent)',
                    zIndex: 10,
                    textAlign: 'center',
                    padding: '0 1rem'
                }}
            >
                Stubborn by design
            </motion.p>
        </Section>
    );
};

export default Hero;
