import { useState, useEffect } from 'react';
import { Section } from '../../components/ui/Section';
import { Heading, Text } from '../../components/ui/Typography';
import {
    getProducts,
    Product,
    updateProductFeatured,
    updateProductVisibility,
    deleteProduct,
    bulkUpdateProducts
} from '../../services/productService';
import { Link } from 'react-router-dom';

/**
 * ProductList Component
 * Displays a list of all products in the admin panel.
 * Supports multi-select, bulk operations, and visibility controls.
 */
const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [filterTab, setFilterTab] = useState<'all' | 'visible' | 'hidden'>('all');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts(undefined, true);
        setProducts(data);
        setSelectedIds([]); // Clear selection after reload
    };

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

    /**
     * Toggle visibility of a single product
     */
    const toggleVisibility = async (product: Product) => {
        try {
            const updated = await updateProductVisibility(product.id, !product.isHidden);
            setProducts(products.map(p => p.id === updated.id ? updated : p));
        } catch (error) {
            console.error('Failed to update visibility:', error);
            alert('Failed to update visibility');
        }
    };

    /**
     * Delete a single product
     */
    const handleDelete = async (product: Product) => {
        if (!confirm(`Are you sure you want to delete "${product.name}"? This cannot be undone.`)) {
            return;
        }
        try {
            await deleteProduct(product.id);
            setProducts(products.filter(p => p.id !== product.id));
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product');
        }
    };

    /**
     * Handle bulk actions
     */
    const handleBulkAction = async (action: 'hide' | 'show' | 'delete') => {
        if (selectedIds.length === 0) return;

        if (action === 'delete') {
            const confirmed = confirm(
                `Are you sure you want to delete ${selectedIds.length} product(s)? This cannot be undone.`
            );
            if (!confirmed) return;
        }

        try {
            await bulkUpdateProducts(selectedIds, action);
            await loadProducts(); // Reload to get fresh data
        } catch (error) {
            console.error('Failed to perform bulk action:', error);
            alert('Failed to perform bulk action');
        }
    };

    /**
     * Toggle selection of a product
     */
    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    /**
     * Toggle select all
     */
    const toggleSelectAll = () => {
        if (selectedIds.length === filteredProducts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredProducts.map(p => p.id));
        }
    };

    // Filter products based on active tab
    const filteredProducts = products.filter(p => {
        if (filterTab === 'visible') return !p.isHidden;
        if (filterTab === 'hidden') return p.isHidden;
        return true; // 'all'
    });

    const featuredCount = products.filter(p => p.isFeatured && !p.isHidden).length;
    const hiddenCount = products.filter(p => p.isHidden).length;

    return (
        <Section>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <Heading level={2}>Products</Heading>
                    <Text style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
                        {featuredCount} of 5 featured • {hiddenCount} hidden
                    </Text>
                </div>
                <Link to="/admin/products/new" style={{ padding: '0.5rem 1rem', background: 'var(--color-accent)', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                    Add Product
                </Link>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid #333' }}>
                {(['all', 'visible', 'hidden'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilterTab(tab)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: filterTab === tab ? '2px solid var(--color-accent)' : '2px solid transparent',
                            color: filterTab === tab ? 'var(--color-accent)' : '#888',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab} ({tab === 'all' ? products.length : tab === 'visible' ? products.length - hiddenCount : hiddenCount})
                    </button>
                ))}
            </div>

            {/* Bulk Action Toolbar */}
            {selectedIds.length > 0 && (
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#1a1a1a',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    border: '1px solid var(--color-accent)'
                }}>
                    <Text style={{ fontWeight: 'bold' }}>{selectedIds.length} selected</Text>
                    <button
                        onClick={() => handleBulkAction('hide')}
                        style={{ padding: '0.5rem 1rem', background: '#333', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px' }}
                    >
                        Hide Selected
                    </button>
                    <button
                        onClick={() => handleBulkAction('show')}
                        style={{ padding: '0.5rem 1rem', background: '#333', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px' }}
                    >
                        Show Selected
                    </button>
                    <button
                        onClick={() => handleBulkAction('delete')}
                        style={{ padding: '0.5rem 1rem', background: '#c23934', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px' }}
                    >
                        Delete Selected
                    </button>
                    <button
                        onClick={() => setSelectedIds([])}
                        style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #666', color: '#888', cursor: 'pointer', borderRadius: '4px', marginLeft: 'auto' }}
                    >
                        Clear Selection
                    </button>
                </div>
            )}

            {/* Select All Checkbox */}
            {filteredProducts.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem' }}>
                    <input
                        type="checkbox"
                        checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={toggleSelectAll}
                        style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                    />
                    <Text style={{ fontSize: '0.9rem', color: '#888' }}>Select All</Text>
                </div>
            )}

            {/* Products List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            background: '#222',
                            padding: '1rem',
                            borderRadius: '8px',
                            opacity: product.isHidden ? 0.6 : 1,
                            border: selectedIds.includes(product.id) ? '2px solid var(--color-accent)' : '2px solid transparent'
                        }}
                    >
                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(product.id)}
                            onChange={() => toggleSelect(product.id)}
                            style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />

                        {/* Product Image */}
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                        />

                        {/* Product Info */}
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Text style={{ fontWeight: 'bold' }}>{product.name}</Text>
                                {product.isHidden && (
                                    <span style={{
                                        fontSize: '0.7rem',
                                        background: '#666',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        color: '#fff'
                                    }}>
                                        HIDDEN
                                    </span>
                                )}
                            </div>
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

                        {/* Actions */}
                        <button
                            onClick={() => toggleVisibility(product)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#333',
                                border: 'none',
                                color: product.isHidden ? '#666' : 'white',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '1.2rem',
                                transition: 'all 0.2s'
                            }}
                            title={product.isHidden ? 'Show on shop' : 'Hide from shop'}
                        >
                            {product.isHidden ? '👁️‍🗨️' : '👁️'}
                        </button>

                        <button
                            onClick={() => toggleFeatured(product)}
                            disabled={(!product.isFeatured && featuredCount >= 5) || product.isHidden}
                            style={{
                                padding: '0.5rem 1rem',
                                background: product.isFeatured ? 'var(--color-accent)' : '#333',
                                border: 'none',
                                color: product.isFeatured ? 'white' : '#888',
                                cursor: ((!product.isFeatured && featuredCount >= 5) || product.isHidden) ? 'not-allowed' : 'pointer',
                                borderRadius: '4px',
                                fontSize: '1.2rem',
                                opacity: ((!product.isFeatured && featuredCount >= 5) || product.isHidden) ? 0.5 : 1,
                                transition: 'all 0.2s'
                            }}
                            title={
                                product.isHidden ? 'Cannot feature hidden products' :
                                    product.isFeatured ? 'Remove from featured' :
                                        (featuredCount >= 5 ? 'Maximum 5 featured products' : 'Add to featured')
                            }
                        >
                            {product.isFeatured ? '★' : '☆'}
                        </button>

                        <Link
                            to={`/admin/products/${product.slug}`}
                            style={{
                                color: 'var(--color-accent)',
                                textDecoration: 'none',
                                padding: '0.5rem 1rem',
                                background: '#333',
                                borderRadius: '4px'
                            }}
                        >
                            Edit
                        </Link>

                        <button
                            onClick={() => handleDelete(product)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'transparent',
                                border: '1px solid #c23934',
                                color: '#c23934',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '1.2rem',
                                transition: 'all 0.2s'
                            }}
                            title="Delete product"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                    <Text>No products found in this category.</Text>
                </div>
            )}
        </Section>
    );
};

export default ProductList;
