import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Heading } from './ui/Typography';

const products = [
    { id: 1, name: 'Coral Fleece Hoodie', price: '€280', img: '/images/red_hoodie.png', slug: 'coral-hoodie' },
    { id: 2, name: 'Slate Fleece Hoodie', price: '€280', img: '/images/blue_hoodie.png', slug: 'slate-hoodie' },
    { id: 3, name: 'Camel Fleece Hoodie', price: '€280', img: '/images/camel_hoodie_model.png', slug: 'camel-hoodie' },
    { id: 4, name: 'Charcoal Fleece Hoodie', price: '€280', img: '/images/charcoal_hoodie_model.png', slug: 'charcoal-hoodie' },
];

const ProductShowcase = () => {
    return (
        <Section style={{ background: 'var(--color-bg)' }}>
            <Reveal>
                <Heading style={{ marginBottom: '6rem' }}>Latest Drops</Heading>
            </Reveal>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '4rem',
                rowGap: '8rem'
            }}>
                {products.map((product, index) => (
                    <Reveal key={product.id} delay={index * 0.1}>
                        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                marginTop: index % 2 === 1 ? '8rem' : '0',
                                cursor: 'pointer'
                            }}>
                                <div style={{
                                    overflow: 'hidden',
                                    marginBottom: '1rem',
                                    aspectRatio: '3/4'
                                }}>
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        src={product.img}
                                        alt={product.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                                    <span style={{ fontWeight: 700 }}>{product.name}</span>
                                    <span style={{ color: 'var(--color-accent)' }}>{product.price}</span>
                                </div>
                            </div>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
};

export default ProductShowcase;
