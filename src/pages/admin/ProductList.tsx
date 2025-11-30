import { useState, useEffect } from 'react';
import { Section } from '../../components/ui/Section';
import { Heading, Text } from '../../components/ui/Typography';
import { getProducts, Product } from '../../services/productService';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <Section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Heading level={2}>Products</Heading>
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
                        </div>
                        <Link to={`/admin/products/${product.slug}`} style={{ color: 'var(--color-accent)' }}>Edit</Link>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default ProductList;
