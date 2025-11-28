import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Heading, Text } from '../components/ui/Typography';
import Footer from '../components/Footer';

const NFT = () => {
    return (
        <>
            <Section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: '12rem'
            }}>
                <Reveal>
                    <Heading level={1} style={{ marginBottom: '2rem' }}>
                        Digital <span style={{ color: 'var(--color-accent)' }}>Twin</span>
                    </Heading>
                </Reveal>

                <Reveal delay={0.2}>
                    <Text style={{ fontSize: '1.5rem', maxWidth: '800px', marginBottom: '4rem' }}>
                        Every Têtu garment comes with a unique NFT—your digital certificate of authenticity and gateway to exclusive experiences.
                    </Text>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', marginTop: '4rem' }}>
                    <div>
                        <Reveal delay={0.3}>
                            <Heading level={3} style={{ marginBottom: '2rem' }}>
                                How It Works
                            </Heading>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {[
                                    { step: '01', title: 'Scan', desc: 'Use your phone to scan the NFC tag embedded in your garment' },
                                    { step: '02', title: 'Claim', desc: 'Connect your wallet and claim ownership of your unique NFT' },
                                    { step: '03', title: 'Unlock', desc: 'Access exclusive perks, events, and future airdrops' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                                        <div style={{
                                            fontSize: '2rem',
                                            fontWeight: 900,
                                            color: 'var(--color-accent)',
                                            minWidth: '60px'
                                        }}>
                                            {item.step}
                                        </div>
                                        <div>
                                            <Heading level={4} style={{ marginBottom: '0.5rem' }}>
                                                {item.title}
                                            </Heading>
                                            <Text>{item.desc}</Text>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
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
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(45deg, transparent 40%, rgba(223, 255, 0, 0.1) 50%, transparent 60%)',
                                zIndex: 2
                            }} />

                            <div style={{ textAlign: 'center', zIndex: 3 }}>
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

            <Section style={{ background: '#0a0a0a' }}>
                <Reveal>
                    <Heading level={2} style={{ marginBottom: '3rem' }}>
                        Exclusive Benefits
                    </Heading>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', marginTop: '3rem' }}>
                    {[
                        { title: 'Authenticity Verification', desc: 'Blockchain-verified proof of authenticity for your garment' },
                        { title: 'Supply Chain Traceability', desc: 'Full transparency on materials and production journey' },
                        { title: 'Exclusive Event Access', desc: 'Priority invites to fashion shows, pop-ups, and community events' },
                        { title: 'Future Airdrops', desc: 'Receive exclusive digital and physical drops as a holder' },
                        { title: 'Resale Value', desc: 'Verified ownership increases resale value and trust' },
                        { title: 'Community Access', desc: 'Join our private Discord and connect with fellow collectors' }
                    ].map((benefit, i) => (
                        <Reveal key={i} delay={0.2 + i * 0.1}>
                            <div>
                                <Heading level={4} style={{ marginBottom: '1rem', color: 'var(--color-accent)' }}>
                                    {benefit.title}
                                </Heading>
                                <Text>{benefit.desc}</Text>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Section>

            <Footer />
        </>
    );
};

export default NFT;
