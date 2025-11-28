import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Heading, Text } from './ui/Typography';

const NFTSection = () => {
    return (
        <Section style={{
            background: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6rem',
                maxWidth: '1200px',
                alignItems: 'center'
            }}>

                {/* Text Content */}
                <div>
                    <Reveal>
                        <Heading level={2} style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
                            Digital <span style={{ color: 'var(--color-accent)' }}>Twin</span>
                        </Heading>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div style={{ fontSize: '1.2rem', color: '#888', lineHeight: 1.6 }}>
                            <Text style={{ marginBottom: '2rem' }}>
                                Every physical garment is paired with a unique NFT on the blockchain.
                                Scan the NFC tag embedded in your piece to claim ownership.
                            </Text>

                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {['Authenticity Verification', 'Supply Chain Traceability', 'Exclusive Event Access', 'Future Airdrops'].map((item, i) => (
                                    <li key={i} style={{
                                        marginBottom: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            width: '6px',
                                            height: '6px',
                                            background: 'var(--color-accent)',
                                            borderRadius: '50%'
                                        }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>

                {/* Visual Element (Holographic Card) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{
                        perspective: '1000px'
                    }}
                >
                    <div style={{
                        width: '100%',
                        aspectRatio: '3/4',
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
                        borderRadius: '20px',
                        border: '1px solid #333',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}>
                        {/* Holographic Gradient Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(45deg, transparent 40%, rgba(223, 255, 0, 0.1) 50%, transparent 60%)',
                            zIndex: 2
                        }} />

                        <div style={{
                            textAlign: 'center',
                            zIndex: 3
                        }}>
                            <div style={{
                                fontSize: '5rem',
                                fontWeight: 900,
                                color: 'transparent',
                                WebkitTextStroke: '2px rgba(255,255,255,0.2)'
                            }}>
                                NFT
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666', fontFamily: 'monospace' }}>
                                0x71C...9A2
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </Section>
    );
};

export default NFTSection;
