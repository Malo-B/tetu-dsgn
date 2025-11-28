import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Heading, Text } from '../components/ui/Typography';
import Footer from '../components/Footer';
import { products, ProductSlug } from '../data/products';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const ProductDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const product = slug ? products[slug as ProductSlug] : null;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart } = useCart();
    const { t } = useTranslation();

    if (!product) {
        return <Navigate to="/" replace />;
    }

    const productImages = product.images || [product.image];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const handleAddToCart = () => {
        addToCart(product, slug!, selectedSize, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <>
            <Section className="product-detail-grid" style={{
                minHeight: '100vh'
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="product-image-container"
                >
                    <img
                        src={productImages[currentImageIndex]}
                        alt={product.name}
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '4px',
                            marginBottom: '1rem'
                        }}
                    />

                    {/* Image Thumbnails */}
                    {productImages.length > 1 && (
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            {productImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${product.name} view ${index + 1}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                    style={{
                                        width: '80px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        border: currentImageIndex === index ? '2px solid var(--color-accent)' : '2px solid transparent',
                                        opacity: currentImageIndex === index ? 1 : 0.6,
                                        transition: 'all 0.3s'
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>

                <div>
                    <Reveal>
                        <Heading level={2} className="product-title">
                            {product.name}
                        </Heading>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <Text className="product-price">
                            {product.price}
                        </Text>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <Text className="product-description">
                            {product.description}
                        </Text>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <div style={{ marginBottom: '2rem' }}>
                            {product.variants && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <Text style={{ marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        {t('product.selectColor')}
                                    </Text>
                                    <div className="color-selector">
                                        {product.variants.map(variant => (
                                            <Link
                                                key={variant.slug}
                                                to={`/product/${variant.slug}`}
                                                title={variant.name}
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    background: variant.color,
                                                    border: slug === variant.slug ? '2px solid var(--color-accent)' : '2px solid transparent',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s',
                                                    boxShadow: slug === variant.slug ? '0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-accent)' : 'none'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Text style={{ marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                {t('product.selectSize')}
                            </Text>
                            <div className="size-selector">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className="size-button"
                                        style={{
                                            background: selectedSize === size ? 'var(--color-accent)' : '#1a1a1a',
                                            color: selectedSize === size ? 'var(--color-bg)' : 'var(--color-text)',
                                            border: selectedSize === size ? 'none' : '1px solid #333',
                                            fontWeight: selectedSize === size ? 700 : 400,
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            <Text style={{ marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                {t('product.quantity')}
                            </Text>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '2rem',
                                border: '1px solid #333',
                                borderRadius: '4px',
                                padding: '0.5rem',
                                width: 'fit-content'
                            }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: '#1a1a1a',
                                        color: 'var(--color-text)',
                                        fontSize: '1.2rem',
                                        fontWeight: 700
                                    }}
                                >
                                    −
                                </button>
                                <Text style={{ minWidth: '3rem', textAlign: 'center', margin: 0, fontSize: '1.2rem' }}>
                                    {quantity}
                                </Text>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: '#1a1a1a',
                                        color: 'var(--color-text)',
                                        fontSize: '1.2rem',
                                        fontWeight: 700
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <button
                                    onClick={handleAddToCart}
                                    style={{
                                        padding: '1rem 3rem',
                                        background: 'var(--color-accent)',
                                        color: 'var(--color-bg)',
                                        border: 'none',
                                        fontSize: '1rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        cursor: 'pointer',
                                        fontWeight: 700,
                                        marginBottom: '2rem'
                                    }}
                                >
                                    {t('product.addToCart')}
                                </button>

                                <AnimatePresence>
                                    {addedToCart && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                background: 'var(--color-accent)',
                                                color: 'var(--color-bg)',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '4px',
                                                fontSize: '0.9rem',
                                                fontWeight: 700,
                                                whiteSpace: 'nowrap',
                                                marginTop: '-1.5rem'
                                            }}
                                        >
                                            ✓ {t('product.addedToCart')}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.5}>
                        <div style={{ marginBottom: '3rem' }}>
                            <Heading level={4} style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
                                Product Details
                            </Heading>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {product.details.map((detail, i) => (
                                    <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{
                                            width: '4px',
                                            height: '4px',
                                            background: 'var(--color-accent)',
                                            borderRadius: '50%'
                                        }} />
                                        <Text style={{ margin: 0 }}>{detail}</Text>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal delay={0.6}>
                        <div style={{ marginBottom: '3rem' }}>
                            <Heading level={4} style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
                                Composition & Care
                            </Heading>
                            <Text style={{ marginBottom: '1rem' }}><strong>Composition:</strong> {product.composition}</Text>
                            <Text style={{ marginBottom: '1rem' }}><strong>Care:</strong> {product.care}</Text>
                            <Text><strong>Sizing:</strong> {product.sizing}</Text>
                        </div>
                    </Reveal>

                    <Reveal delay={0.7}>
                        <div style={{
                            marginBottom: '3rem',
                            padding: '2rem',
                            background: '#0a0a0a',
                            borderRadius: '4px',
                            border: '1px solid #222'
                        }}>
                            <Heading level={4} style={{ marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--color-accent)' }}>
                                Sustainability
                            </Heading>
                            <Text>{product.sustainability}</Text>
                        </div>
                    </Reveal>

                    <Reveal delay={0.8}>
                        <Link to="/" style={{
                            display: 'inline-block',
                            padding: '1rem 2rem',
                            border: '1px solid var(--color-accent)',
                            color: 'var(--color-accent)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontSize: '0.9rem'
                        }}>
                            ← Back to Shop
                        </Link>
                    </Reveal>
                </div>
            </Section>

            <Footer />
        </>
    );
};

export default ProductDetail;
