import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Heading, Text } from '../components/ui/Typography';
import Footer from '../components/Footer';
import { CheckoutFormData } from '../types/types';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
    const { items, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [formData, setFormData] = useState<CheckoutFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        paymentMethod: 'card'
    });

    const subtotal = getCartTotal();
    const shipping = 15;
    const total = subtotal + shipping;

    // Redirect if cart is empty
    if (items.length === 0 && !orderPlaced) {
        navigate('/cart');
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the order to your backend
        console.log('Order submitted:', { formData, items, total });

        // Clear cart and show success
        clearCart();
        setOrderPlaced(true);
    };

    if (orderPlaced) {
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
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.8 }}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'var(--color-accent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '2rem',
                            fontSize: '3rem'
                        }}
                    >
                        ✓
                    </motion.div>
                    <Reveal>
                        <Heading level={2} style={{ marginBottom: '1rem', fontSize: '3rem' }}>
                            {t('checkout.success')}
                        </Heading>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <Text style={{ marginBottom: '1rem', fontSize: '1.2rem', opacity: 0.7, textAlign: 'center', maxWidth: '600px' }}>
                            {t('checkout.successMessage')}
                        </Text>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <Text style={{ marginBottom: '3rem', fontSize: '1rem', opacity: 0.5 }}>
                            {t('checkout.orderNumber')}: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </Text>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                padding: '1rem 3rem',
                                background: 'var(--color-accent)',
                                color: 'var(--color-bg)',
                                fontSize: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontWeight: 700
                            }}
                        >
                            {t('checkout.backToShop')}
                        </button>
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
                        {t('checkout.title')}
                    </Heading>
                </Reveal>

                <form onSubmit={handleSubmit}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr',
                        gap: '4rem',
                        alignItems: 'start'
                    }}>
                        {/* Checkout Form */}
                        <div>
                            {/* Shipping Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                style={{
                                    padding: '2rem',
                                    background: '#0a0a0a',
                                    borderRadius: '4px',
                                    marginBottom: '2rem',
                                    border: '1px solid #222'
                                }}
                            >
                                <Heading level={3} style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>
                                    {t('checkout.shippingInfo')}
                                </Heading>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {t('checkout.firstName')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: '#050505',
                                                border: '1px solid #333',
                                                borderRadius: '4px',
                                                color: 'var(--color-text)',
                                                fontSize: '1rem',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {t('checkout.lastName')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: '#050505',
                                                border: '1px solid #333',
                                                borderRadius: '4px',
                                                color: 'var(--color-text)',
                                                fontSize: '1rem',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {t('checkout.email')} *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: '#050505',
                                                border: '1px solid #333',
                                                borderRadius: '4px',
                                                color: 'var(--color-text)',
                                                fontSize: '1rem',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {t('checkout.phone')} *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: '#050505',
                                                border: '1px solid #333',
                                                borderRadius: '4px',
                                                color: 'var(--color-text)',
                                                fontSize: '1rem',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>

                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {t('checkout.address')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: '#050505',
                                                border: '1px solid #333',
                                                borderRadius: '4px',
                                                color: 'var(--color-text)',
                                                fontSize: '1rem',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {t('checkout.city')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: '#050505',
                                                border: '1px solid #333',
                                                borderRadius: '4px',
                                                color: 'var(--color-text)',
                                                fontSize: '1rem',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {t('checkout.postalCode')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            required
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: '#050505',
                                                border: '1px solid #333',
                                                borderRadius: '4px',
                                                color: 'var(--color-text)',
                                                fontSize: '1rem',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>

                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {t('checkout.country')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            required
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: '#050505',
                                                border: '1px solid #333',
                                                borderRadius: '4px',
                                                color: 'var(--color-text)',
                                                fontSize: '1rem',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Payment Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    padding: '2rem',
                                    background: '#0a0a0a',
                                    borderRadius: '4px',
                                    border: '1px solid #222'
                                }}
                            >
                                <Heading level={3} style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>
                                    {t('checkout.paymentInfo')}
                                </Heading>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={formData.paymentMethod === 'card'}
                                            onChange={handleInputChange}
                                            style={{ marginRight: '1rem' }}
                                        />
                                        <Text style={{ margin: 0 }}>{t('checkout.creditCard')}</Text>
                                    </label>

                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="paypal"
                                            checked={formData.paymentMethod === 'paypal'}
                                            onChange={handleInputChange}
                                            style={{ marginRight: '1rem' }}
                                        />
                                        <Text style={{ margin: 0 }}>PayPal</Text>
                                    </label>
                                </div>

                                {formData.paymentMethod === 'card' && (
                                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                {t('checkout.cardNumber')} *
                                            </label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                required={formData.paymentMethod === 'card'}
                                                placeholder="1234 5678 9012 3456"
                                                value={formData.cardNumber || ''}
                                                onChange={handleInputChange}
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem',
                                                    background: '#050505',
                                                    border: '1px solid #333',
                                                    borderRadius: '4px',
                                                    color: 'var(--color-text)',
                                                    fontSize: '1rem',
                                                    fontFamily: 'inherit'
                                                }}
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                    {t('checkout.expiryDate')} *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardExpiry"
                                                    required={formData.paymentMethod === 'card'}
                                                    placeholder="MM/YY"
                                                    value={formData.cardExpiry || ''}
                                                    onChange={handleInputChange}
                                                    style={{
                                                        width: '100%',
                                                        padding: '1rem',
                                                        background: '#050505',
                                                        border: '1px solid #333',
                                                        borderRadius: '4px',
                                                        color: 'var(--color-text)',
                                                        fontSize: '1rem',
                                                        fontFamily: 'inherit'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                    CVC *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardCVC"
                                                    required={formData.paymentMethod === 'card'}
                                                    placeholder="123"
                                                    value={formData.cardCVC || ''}
                                                    onChange={handleInputChange}
                                                    style={{
                                                        width: '100%',
                                                        padding: '1rem',
                                                        background: '#050505',
                                                        border: '1px solid #333',
                                                        borderRadius: '4px',
                                                        color: 'var(--color-text)',
                                                        fontSize: '1rem',
                                                        fontFamily: 'inherit'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
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
                                {t('checkout.orderSummary')}
                            </Heading>

                            <div style={{ marginBottom: '2rem' }}>
                                {items.map(item => (
                                    <div key={`${item.slug}-${item.size}`} style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        marginBottom: '1rem',
                                        paddingBottom: '1rem',
                                        borderBottom: '1px solid #222'
                                    }}>
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            style={{
                                                width: '60px',
                                                height: '75px',
                                                objectFit: 'cover',
                                                borderRadius: '4px'
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <Text style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                                {item.product.name}
                                            </Text>
                                            <Text style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.25rem' }}>
                                                {t('cart.size')}: {item.size} | {t('cart.qty')}: {item.quantity}
                                            </Text>
                                            <Text style={{ fontSize: '0.9rem', color: 'var(--color-accent)' }}>
                                                {item.product.price}
                                            </Text>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
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

                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '1rem 2rem',
                                    background: 'var(--color-accent)',
                                    color: 'var(--color-bg)',
                                    fontSize: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontWeight: 700
                                }}
                            >
                                {t('checkout.placeOrder')}
                            </button>
                        </motion.div>
                    </div>
                </form>
            </Section>

            <Footer />
        </>
    );
};

export default Checkout;
