
import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Heading } from './ui/Typography';

const Hero = () => {
    return (
        <Section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0
        }}>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                style={{ zIndex: 10, mixBlendMode: 'difference', color: 'white' }}
            >
                <Heading level={1} style={{ textAlign: 'center' }}>
                    TÊTU
                </Heading>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{
                    position: 'absolute',
                    bottom: '4rem',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'var(--color-accent)'
                }}
            >
                Stubborn by design
            </motion.p>

            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40vw',
                height: '60vh',
                background: 'url(https://images.unsplash.com/photo-1523396870179-16cca81bab0b?q=80&w=2000&auto=format&fit=crop) center/cover',
                filter: 'grayscale(100%) contrast(120%)',
                opacity: 0.4,
                zIndex: 1
            }} />
        </Section>
    );
};

export default Hero;
