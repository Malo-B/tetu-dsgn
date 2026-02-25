import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Heading, Text } from '../components/ui/Typography';

/**
 * Home Component
 * Landing page of the application.
 * Features the Hero section, Product Showcase, and teasers for other sections.
 */
const Home = () => {
    return (
        <>
            <Hero />
            <ProductShowcase />

            {/* Materials Teaser */}
            <Section style={{ background: '#0a0a0a', textAlign: 'center' }}>
                <Reveal>
                    <Heading level={2} style={{ marginBottom: '2rem' }}>
                        Premium Materials of Distinction
                    </Heading>
                </Reveal>
                <Reveal delay={0.2}>
                    <Text style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Every piece is crafted from exceptional materials selected for their superior quality and prestigious provenance.
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
                        Certificate of Authenticity
                    </Heading>
                </Reveal>
                <Reveal delay={0.2}>
                    <Text style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Each garment comes with a unique digital certificate—your proof of authenticity and gateway to exclusive privileges.
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
