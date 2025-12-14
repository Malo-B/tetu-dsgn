import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Heading, Text } from '../components/ui/Typography';
import { getProducts, Product } from '../services/productService';

/**
 * Shop Component
 * Displays a grid of products with filtering options.
 * Supports filtering by category, color, price, and discount.
 */
const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
    const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);
    const [showFilters, setShowFilters] = useState(typeof window !== 'undefined' && window.innerWidth > 768);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);

                // Set initial price range based on actual products
                if (data.length > 0) {
                    const prices = data.map(p => parseFloat(p.price.replace(/[^0-9.]/g, '')));
                    setPriceRange({ min: 0, max: Math.max(...prices) });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Extract unique colors from all product variants
    const availableColors = Array.from(
        new Set(
            products.flatMap(p => p.variants?.map(v => ({ name: v.name, color: v.color })) || [])
        )
    ).filter((v, i, arr) => arr.findIndex(t => t.name === v.name) === i);

    // Extract unique categories
    const availableCategories = Array.from(
        new Set(products.map(p => p.category).filter(Boolean) as string[])
    );

    // Apply filters
    // Apply filters whenever filter state or products change
    useEffect(() => {
        let filtered = [...products];

        // Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                product.category && selectedCategories.includes(product.category)
            );
        }

        // Color filter
        if (selectedColors.length > 0) {
            filtered = filtered.filter(product =>
                product.variants?.some(variant => selectedColors.includes(variant.name))
            );
        }

        // Discount filter
        if (showDiscountedOnly) {
            filtered = filtered.filter(product => product.discount && product.discount > 0);
        }

        // Price filter
        filtered = filtered.filter(product => {
            const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
            const finalPrice = product.discount ? price * (1 - product.discount / 100) : price;
            return finalPrice >= priceRange.min && finalPrice <= priceRange.max;
        });

        setFilteredProducts(filtered);
    }, [selectedColors, selectedSizes, selectedCategories, priceRange, showDiscountedOnly, products]);

    const toggleColor = (colorName: string) => {
        setSelectedColors(prev =>
            prev.includes(colorName)
                ? prev.filter(c => c !== colorName)
                : [...prev, colorName]
        );
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const clearFilters = () => {
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedCategories([]);
        setPriceRange({ min: 0, max: 1000 });
        setShowDiscountedOnly(false);
    };

    const activeFilterCount = selectedColors.length + selectedSizes.length + selectedCategories.length + (showDiscountedOnly ? 1 : 0);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isSmallMobile = typeof window !== 'undefined' && window.innerWidth <= 480;

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Text>Loading...</Text>
            </div>
        );
    }

    return (
        <Section style={{ paddingTop: '8rem' }}>
            <Heading level={1} style={{ marginBottom: '3rem', textAlign: 'center' }}>Shop All</Heading>

            <div style={{
                display: 'flex',
                gap: '3rem',
                position: 'relative',
                flexDirection: isMobile ? 'column' : 'row'
            }}>
                {/* Filter Sidebar */}
                {showFilters && (
                    <div style={{
                        width: isMobile ? '100%' : '280px',
                        minWidth: isMobile ? '100%' : '280px',
                        transition: 'all 0.3s'
                    }}>
                        <div style={{
                            position: isMobile ? 'relative' : 'sticky',
                            top: isMobile ? 'auto' : '100px',
                            background: '#0a0a0a',
                            padding: isSmallMobile ? '1.5rem' : '2rem',
                            borderRadius: '8px',
                            border: '1px solid #222',
                            marginBottom: isMobile ? '2rem' : '0'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <Text style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Filters</Text>
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--color-accent)',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        Clear All ({activeFilterCount})
                                    </button>
                                )}
                            </div>

                            {/* Category Filter */}
                            {availableCategories.length > 0 && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <Text style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Category
                                    </Text>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {availableCategories.map((category) => (
                                            <label key={category} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category)}
                                                    onChange={() => toggleCategory(category)}
                                                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                                />
                                                <span>{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Discount Filter */}
                            <div style={{ marginBottom: '2rem' }}>
                                <Text style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Special Offers
                                </Text>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={showDiscountedOnly}
                                        onChange={(e) => setShowDiscountedOnly(e.target.checked)}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <span>On Sale</span>
                                </label>
                            </div>

                            {/* Color Filter */}
                            {availableColors.length > 0 && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <Text style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Color
                                    </Text>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                        {availableColors.map(({ name, color }) => (
                                            <button
                                                key={name}
                                                onClick={() => toggleColor(name)}
                                                title={name}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    background: color,
                                                    border: selectedColors.includes(name) ? '3px solid var(--color-accent)' : '2px solid #333',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s',
                                                    boxShadow: selectedColors.includes(name) ? '0 0 0 2px var(--color-bg), 0 0 0 5px var(--color-accent)' : 'none'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price Range */}
                            <div style={{ marginBottom: '2rem' }}>
                                <Text style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Price Range
                                </Text>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <input
                                        type="number"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                                        placeholder="Min"
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            background: '#222',
                                            border: '1px solid #333',
                                            color: 'white',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 1000 })}
                                        placeholder="Max"
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            background: '#222',
                                            border: '1px solid #333',
                                            color: 'white',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Product Grid */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <Text style={{ margin: 0 }}>
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                        </Text>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#222',
                                border: '1px solid #333',
                                color: 'white',
                                cursor: 'pointer',
                                borderRadius: '4px'
                            }}
                        >
                            {showFilters ? 'Hide' : 'Show'} Filters
                        </button>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isSmallMobile
                            ? '1fr'
                            : isMobile
                                ? 'repeat(2, 1fr)'
                                : 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: isSmallMobile ? '2rem' : '3rem'
                    }}>
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.slug}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ cursor: 'pointer', position: 'relative' }}
                                >
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
                                            fontSize: isSmallMobile ? '0.8rem' : '0.9rem',
                                            zIndex: 10
                                        }}>
                                            -{product.discount}%
                                        </div>
                                    )}
                                    <div style={{
                                        overflow: 'hidden',
                                        marginBottom: '1rem',
                                        aspectRatio: '3/4',
                                        borderRadius: '8px'
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
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: isSmallMobile ? '0.95rem' : '1.1rem',
                                        gap: '0.5rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        <span style={{ fontWeight: 700 }}>{product.name}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {product.discount != null && product.discount > 0 ? (
                                                <>
                                                    <span style={{
                                                        color: '#666',
                                                        textDecoration: 'line-through',
                                                        fontSize: isSmallMobile ? '0.85rem' : '0.9rem'
                                                    }}>
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
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <Text style={{ fontSize: '1.2rem', color: '#666' }}>
                                No products found matching your filters.
                            </Text>
                            <button
                                onClick={clearFilters}
                                style={{
                                    marginTop: '1rem',
                                    padding: '0.8rem 2rem',
                                    background: 'var(--color-accent)',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    fontWeight: 700
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default Shop;
