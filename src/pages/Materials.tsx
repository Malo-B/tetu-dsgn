import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Heading, Text } from '../components/ui/Typography';
import Footer from '../components/Footer';

const Materials = () => {
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
                        Our Materials
                    </Heading>
                </Reveal>

                <Reveal delay={0.2}>
                    <Text style={{ fontSize: '1.5rem', maxWidth: '800px', marginBottom: '4rem' }}>
                        Every piece in the Têtu collection is crafted from deadstock fabrics sourced from the world's most prestigious luxury fashion houses.
                    </Text>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '4rem' }}>
                    <Reveal delay={0.3}>
                        <div>
                            <Heading level={3} style={{ marginBottom: '1rem', color: 'var(--color-accent)' }}>
                                Upcycled Luxury
                            </Heading>
                            <Text>
                                We rescue premium materials that would otherwise go to waste. Each fabric tells a story of craftsmanship from renowned ateliers, given new life in our contemporary designs.
                            </Text>
                        </div>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <div>
                            <Heading level={3} style={{ marginBottom: '1rem', color: 'var(--color-accent)' }}>
                                Sustainable Future
                            </Heading>
                            <Text>
                                By utilizing deadstock, we reduce waste and minimize our environmental footprint. Luxury doesn't have to come at the cost of our planet.
                            </Text>
                        </div>
                    </Reveal>
                </div>
            </Section>

            <Section style={{ background: '#0a0a0a' }}>
                <Reveal>
                    <Heading level={2} style={{ marginBottom: '3rem' }}>
                        The Vision
                    </Heading>
                </Reveal>

                <Reveal delay={0.2}>
                    <Text style={{ fontSize: '1.3rem', maxWidth: '900px', lineHeight: 1.8 }}>
                        Têtu represents a new era of streetwear—one that honors heritage craftsmanship while pushing boundaries.
                        We believe in creating pieces that are both timeless and contemporary, sustainable yet luxurious.
                        Our name, meaning "stubborn" in French, reflects our unwavering commitment to quality, sustainability, and innovation.
                    </Text>
                </Reveal>

                <div style={{ marginTop: '6rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
                    {['Authenticity', 'Innovation', 'Sustainability'].map((value, i) => (
                        <Reveal key={value} delay={0.3 + i * 0.1}>
                            <div style={{ textAlign: 'center' }}>
                                <Heading level={3} style={{ marginBottom: '1rem' }}>
                                    {value}
                                </Heading>
                                <div style={{
                                    width: '60px',
                                    height: '2px',
                                    background: 'var(--color-accent)',
                                    margin: '0 auto'
                                }} />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Section>

            <Footer />
        </>
    );
};

export default Materials;
