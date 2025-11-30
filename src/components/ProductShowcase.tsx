import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Heading } from './ui/Typography';
import { useState, useEffect } from 'react';
import { getProducts, Product } from '../services/productService';

const ProductShowcase = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Section style={{ background: 'var(--color-bg)' }}>
            <Reveal>
                <Heading style={{ marginBottom: '6rem' }}>Latest Drops</Heading>
            </Reveal>

            <div className="product-grid" style={{
                display: 'grid',
                rowGap: '8rem'
            }}>
                {products.map((product, index) => (
                    <Reveal key={product.id} delay={index * 0.1}>
                        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                marginTop: index % 2 === 1 ? '8rem' : '0',
                                cursor: 'pointer',
                                position: 'relative'
                            }}>
                                {/* Discount Badge */}
                                {product.discount != null && product.discount > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'var(--color-accent)',
                                        color: 'var(--color-bg)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        zIndex: 10
                                    }}>
                                        -{product.discount}%
                                    </div>
                                )}
                                <div style={{
                                    overflow: 'hidden',
                                    marginBottom: '1rem',
                                    aspectRatio: '3/4'
                                }}>
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        src={product.image}
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
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {product.discount != null && product.discount > 0 ? (
                                            <>
                                                <span style={{ color: '#666', textDecoration: 'line-through', fontSize: '1rem' }}>
                                                    {product.price}
                                                </span>
                                                <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
                                                    {(() => {
                                                        const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, ''));
                                                        const discounted = priceNum * (1 - product.discount / 100);
                                                        return `€${Math.round(discounted)}`;
                                                    })()}
                                                </span>
                                            </>
                                        ) : (
                                            <span style={{ color: 'var(--color-accent)' }}>{product.price}</span>
                                        )}
                                    </div>
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
