import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Heading, Text } from '../components/ui/Typography';

const Home = () => {
    return (
        <>
            <Hero />
            <ProductShowcase />

            {/* Materials Teaser */}
            <Section style={{ background: '#0a0a0a', textAlign: 'center' }}>
                <Reveal>
                    <Heading level={2} style={{ marginBottom: '2rem' }}>
                        Upcycled Luxury Materials
                    </Heading>
                </Reveal>
                <Reveal delay={0.2}>
                    <Text style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Every piece is crafted from deadstock fabrics sourced from the world's most prestigious luxury fashion houses.
                    </Text>
                </Reveal>
                <Reveal delay={0.3}>
                    <Link to="/materials" style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        border: '1px solid var(--color-accent)',
                        color: 'var(--color-accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s'
                    }}>
                        Learn More
                    </Link>
                </Reveal>
            </Section>

            {/* NFT Teaser */}
            <Section style={{ textAlign: 'center' }}>
                <Reveal>
                    <Heading level={2} style={{ marginBottom: '2rem' }}>
                        Digital Twin NFT
                    </Heading>
                </Reveal>
                <Reveal delay={0.2}>
                    <Text style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Each garment comes with a unique NFT—your certificate of authenticity and gateway to exclusive perks.
                    </Text>
                </Reveal>
                <Reveal delay={0.3}>
                    <Link to="/nft" style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        border: '1px solid var(--color-accent)',
                        color: 'var(--color-accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s'
                    }}>
                        Discover NFTs
                    </Link>
                </Reveal>
            </Section>

            <Footer />
        </>
    );
};

export default Home;
