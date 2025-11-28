import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Heading } from './ui/Typography';

const MaterialsSection = () => {
    return (
        <Section style={{
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10rem 0'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #333, transparent)'
            }} />

            <div style={{ maxWidth: '800px', padding: '0 2rem', textAlign: 'center', marginBottom: '6rem', zIndex: 2 }}>
                <Reveal>
                    <Heading level={3} style={{
                        fontSize: '1rem',
                        color: 'var(--color-accent)',
                        marginBottom: '1rem'
                    }}>
                        Sustainability
                    </Heading>
                </Reveal>
                <Reveal delay={0.2}>
                    <p style={{
                        fontSize: '2.5rem',
                        lineHeight: 1.2,
                        fontWeight: 300
                    }}>
                        We source deadstock fabrics from the world's most renowned luxury fashion houses, giving new life to premium materials.
                    </p>
                </Reveal>
            </div>

            {/* Marquee Effect */}
            <div style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                opacity: 0.1,
                userSelect: 'none',
                pointerEvents: 'none'
            }}>
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                    style={{
                        fontSize: '10rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        display: 'flex',
                        gap: '4rem',
                        paddingRight: '4rem'
                    }}
                >
                    <span>Upcycled Luxury</span>
                    <span>•</span>
                    <span>Premium Deadstock</span>
                    <span>•</span>
                    <span>Sustainable Future</span>
                    <span>•</span>
                </motion.div>
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                    style={{
                        fontSize: '10rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        display: 'flex',
                        gap: '4rem',
                        paddingRight: '4rem'
                    }}
                >
                    <span>Upcycled Luxury</span>
                    <span>•</span>
                    <span>Premium Deadstock</span>
                    <span>•</span>
                    <span>Sustainable Future</span>
                    <span>•</span>
                </motion.div>
            </div>
        </Section>
    );
};

export default MaterialsSection;
