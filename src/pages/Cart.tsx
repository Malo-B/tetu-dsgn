import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Heading, Text } from '../components/ui/Typography';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const { t } = useTranslation();

    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? 15 : 0; // Free shipping could be added as a feature
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <>
                <Section style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '12rem'
                }}>
                    <Reveal>
                        <Heading level={2} style={{ marginBottom: '2rem', fontSize: '3rem' }}>
                            {t('cart.empty')}
                        </Heading>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <Text style={{ marginBottom: '3rem', fontSize: '1.2rem', opacity: 0.7 }}>
                            {t('cart.emptyMessage')}
                        </Text>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <Link to="/" style={{
                            padding: '1rem 3rem',
                            background: 'var(--color-accent)',
                            color: 'var(--color-bg)',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 700,
                            display: 'inline-block'
                        }}>
                            {t('cart.continueShopping')}
                        </Link>
                    </Reveal>
                </Section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Section style={{
                minHeight: '100vh',
                paddingTop: '12rem'
            }}>
                <Reveal>
                    <Heading level={2} style={{ marginBottom: '3rem', fontSize: '3rem' }}>
                        {t('cart.title')}
                    </Heading>
                </Reveal>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Cart Items */}
                    <div>
                        {items.map((item, index) => (
                            <motion.div
                                key={`${item.slug}-${item.size}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '150px 1fr auto',
                                    gap: '2rem',
                                    padding: '2rem',
                                    background: '#0a0a0a',
                                    borderRadius: '4px',
                                    marginBottom: '1.5rem',
                                    border: '1px solid #222'
                                }}
                            >
                                <Link to={`/product/${item.slug}`}>
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </Link>

                                <div>
                                    <Link to={`/product/${item.slug}`}>
                                        <Heading level={4} style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                                            {item.product.name}
                                        </Heading>
                                    </Link>
                                    <Text style={{ marginBottom: '1rem', opacity: 0.7 }}>
                                        {t('cart.size')}: {item.size}
                                    </Text>
                                    <Text style={{ fontSize: '1.3rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                                        {item.product.price}
                                    </Text>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    alignItems: 'flex-end'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        border: '1px solid #333',
                                        borderRadius: '4px',
                                        padding: '0.5rem'
                                    }}>
                                        <button
                                            onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#1a1a1a',
                                                color: 'var(--color-text)',
                                                fontSize: '1rem',
                                                fontWeight: 700
                                            }}
                                        >
                                            −
                                        </button>
                                        <Text style={{ minWidth: '2rem', textAlign: 'center', margin: 0 }}>
                                            {item.quantity}
                                        </Text>
                                        <button
                                            onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#1a1a1a',
                                                color: 'var(--color-text)',
                                                fontSize: '1rem',
                                                fontWeight: 700
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.slug, item.size)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            color: '#ff4444',
                                            fontSize: '0.9rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        {t('cart.remove')}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            position: 'sticky',
                            top: '12rem',
                            padding: '2rem',
                            background: '#0a0a0a',
                            borderRadius: '4px',
                            border: '1px solid #222'
                        }}
                    >
                        <Heading level={3} style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>
                            {t('cart.orderSummary')}
                        </Heading>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <Text>{t('cart.subtotal')}</Text>
                                <Text>€{subtotal.toFixed(2)}</Text>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <Text>{t('cart.shipping')}</Text>
                                <Text>€{shipping.toFixed(2)}</Text>
                            </div>
                            <div style={{
                                borderTop: '1px solid #333',
                                paddingTop: '1rem',
                                marginTop: '1rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Heading level={4} style={{ fontSize: '1.3rem' }}>{t('cart.total')}</Heading>
                                    <Heading level={4} style={{ fontSize: '1.3rem', color: 'var(--color-accent)' }}>
                                        €{total.toFixed(2)}
                                    </Heading>
                                </div>
                            </div>
                        </div>

                        <Link to="/checkout" style={{
                            display: 'block',
                            padding: '1rem 2rem',
                            background: 'var(--color-accent)',
                            color: 'var(--color-bg)',
                            textAlign: 'center',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 700,
                            marginBottom: '1rem'
                        }}>
                            {t('cart.proceedToCheckout')}
                        </Link>

                        <Link to="/" style={{
                            display: 'block',
                            padding: '1rem 2rem',
                            border: '1px solid var(--color-accent)',
                            color: 'var(--color-accent)',
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            {t('cart.continueShopping')}
                        </Link>
                    </motion.div>
                </div>
            </Section>

            <Footer />
        </>
    );
};

export default Cart;
