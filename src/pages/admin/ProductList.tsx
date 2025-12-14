import { useState, useEffect } from 'react';
import { Section } from '../../components/ui/Section';
import { Heading, Text } from '../../components/ui/Typography';
import { getProducts, Product, updateProductFeatured } from '../../services/productService';
import { Link } from 'react-router-dom';

/**
 * ProductList Component
 * Displays a list of all products in the admin panel.
 * Allows toggling the 'featured' status of products.
 */
const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    /**
     * Toggle the featured status of a product.
     * Limits the number of featured products to 5.
     */
    const toggleFeatured = async (product: Product) => {
        try {
            const updated = await updateProductFeatured(product.id, !product.isFeatured);
            setProducts(products.map(p => p.id === updated.id ? updated : p));
        } catch (error) {
            console.error('Failed to update featured status:', error);
            alert('Failed to update featured status');
        }
    };

    const featuredCount = products.filter(p => p.isFeatured).length;

    return (
        <Section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <Heading level={2}>Products</Heading>
                    <Text style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
                        {featuredCount} of 5 featured on home page
                    </Text>
                </div>
                <Link to="/admin/products/new" style={{ padding: '0.5rem 1rem', background: 'var(--color-accent)', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                    Add Product
                </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {products.map(product => (
                    <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#222', padding: '1rem', borderRadius: '8px' }}>
                        <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1 }}>
                            <Text style={{ fontWeight: 'bold' }}>{product.name}</Text>
                            <Text style={{ fontSize: '0.9rem', color: '#888' }}>{product.price}</Text>
                            {product.category && (
                                <span style={{
                                    fontSize: '0.8rem',
                                    background: '#333',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '4px',
                                    marginLeft: '0.5rem'
                                }}>
                                    {product.category}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => toggleFeatured(product)}
                            disabled={!product.isFeatured && featuredCount >= 5}
                            style={{
                                padding: '0.5rem 1rem',
                                background: product.isFeatured ? 'var(--color-accent)' : '#333',
                                border: 'none',
                                color: product.isFeatured ? 'white' : '#888',
                                cursor: (!product.isFeatured && featuredCount >= 5) ? 'not-allowed' : 'pointer',
                                borderRadius: '4px',
                                fontSize: '1.2rem',
                                opacity: (!product.isFeatured && featuredCount >= 5) ? 0.5 : 1,
                                transition: 'all 0.2s'
                            }}
                            title={product.isFeatured ? 'Remove from featured' : (featuredCount >= 5 ? 'Maximum 5 featured products' : 'Add to featured')}
                        >
                            {product.isFeatured ? '★' : '☆'}
                        </button>
                        <Link to={`/admin/products/${product.slug}`} style={{ color: 'var(--color-accent)' }}>Edit</Link>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default ProductList;
