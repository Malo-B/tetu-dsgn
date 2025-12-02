import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Section } from '../../components/ui/Section';
import { Heading } from '../../components/ui/Typography';
import { getProductBySlug, getProducts } from '../../services/productService';
import { client } from '../../api/client';

interface Variant {
    name: string;
    slug: string;
    color: string;
}

const ProductEdit = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const isNew = !slug;

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        price: '',
        description: '',
        image: '',
        images: '',
        discount: 0,
        category: '',
        composition: '',
        care: '',
        sizing: '',
        sustainability: ''
    });

    const [variants, setVariants] = useState<Variant[]>([]);
    const [newVariant, setNewVariant] = useState<Variant>({ name: '', slug: '', color: '#000000' });
    const [existingCategories, setExistingCategories] = useState<string[]>([]);

    const [productId, setProductId] = useState<string>('');

    useEffect(() => {
        // Fetch all products to get existing categories
        getProducts().then(products => {
            const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean) as string[]));
            setExistingCategories(categories);
        });

        if (!isNew && slug) {
            getProductBySlug(slug).then(product => {
                setProductId(product.id);
                setFormData({
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                    images: product.images?.map((img: any) => img.url).join('\n') || '',
                    discount: product.discount || 0,
                    category: product.category || '',
                    composition: product.composition || '',
                    care: product.care || '',
                    sizing: product.sizing || '',
                    sustainability: product.sustainability || ''
                });
                if (product.variants && product.variants.length > 0) {
                    setVariants(product.variants.map((v: any) => ({
                        name: v.name,
                        slug: v.slug,
                        color: v.color
                    })));
                }
            });
        }
    }, [slug, isNew]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.name === 'discount' ? parseInt(e.target.value) || 0 : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const addVariant = () => {
        if (newVariant.name && newVariant.slug && newVariant.color) {
            setVariants([...variants, newVariant]);
            setNewVariant({ name: '', slug: '', color: '#000000' });
        }
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('=== FORM SUBMIT DEBUG ===');
        console.log('FormData:', formData);
        console.log('Category value:', formData.category);
        console.log('Category type:', typeof formData.category);
        try {
            const imageUrls = formData.images.split('\n').map(url => url.trim()).filter(url => url.length > 0);
            const payload = {
                ...formData,
                images: imageUrls,
                variants: variants,
                details: []
            };
            console.log('Payload to send:', payload);
            console.log('Payload category:', payload.category);

            if (isNew) {
                await client.post('/products', payload);
            } else {
                if (productId) {
                    await client.put(`/products/${productId}`, payload);
                } else {
                    console.error('Product ID missing for update');
                    alert('Error: Product ID missing');
                    return;
                }
            }
            navigate('/admin/products');
        } catch (error) {
            console.error(error);
            alert('Failed to save product');
        }
    };

    return (
        <Section>
            <Heading level={2} style={{ marginBottom: '2rem' }}>{isNew ? 'New Product' : 'Edit Product'}</Heading>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
                <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Product Name *
                    </label>
                    <input id="name" name="name" placeholder="e.g., Coral Fleece Hoodie" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                </div>

                <div>
                    <label htmlFor="slug" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Slug (URL) *
                    </label>
                    <input id="slug" name="slug" placeholder="e.g., coral-hoodie" value={formData.slug} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                </div>

                <div>
                    <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Category
                    </label>
                    <input
                        id="category"
                        name="category"
                        list="category-suggestions"
                        placeholder="Type or select: e.g., Hoodies, T-Shirts, Jackets"
                        value={formData.category}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                    />
                    <datalist id="category-suggestions">
                        {existingCategories.map(category => (
                            <option key={category} value={category} />
                        ))}
                    </datalist>
                    <div style={{ marginTop: '0.3rem', fontSize: '0.75rem', color: '#666' }}>
                        {existingCategories.length > 0
                            ? `Existing: ${existingCategories.join(', ')}`
                            : 'Start typing to create a new category'}
                    </div>
                </div>

                <div>
                    <label htmlFor="price" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Price *
                    </label>
                    <input id="price" name="price" placeholder="e.g., €280" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                </div>

                <div>
                    <label htmlFor="discount" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Discount (%)
                    </label>
                    <input id="discount" name="discount" type="number" placeholder="e.g., 15" value={formData.discount} onChange={handleChange} min="0" max="100" style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                </div>

                <div>
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Description *
                    </label>
                    <textarea id="description" name="description" placeholder="Product description..." value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', minHeight: '100px', borderRadius: '4px', fontFamily: 'inherit' }} />
                </div>

                <div>
                    <label htmlFor="image" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Main Image URL *
                    </label>
                    <input id="image" name="image" placeholder="https://example.com/image.jpg" value={formData.image} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                </div>

                <div>
                    <label htmlFor="images" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Additional Images
                    </label>
                    <textarea id="images" name="images" placeholder="One URL per line&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg" value={formData.images} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', minHeight: '100px', borderRadius: '4px', fontFamily: 'inherit' }} />
                </div>

                {/* Color Variants Section */}
                <div style={{ padding: '1.5rem', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #333' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Color Variants
                    </label>

                    {/* Existing Variants */}
                    {variants.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                            {variants.map((variant, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', padding: '0.5rem', background: '#222', borderRadius: '4px' }}>
                                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: variant.color, border: '2px solid #444' }} />
                                    <span style={{ flex: 1 }}>{variant.name} ({variant.slug})</span>
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        style={{ padding: '0.3rem 0.8rem', background: '#ff4444', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '0.8rem' }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add New Variant */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px auto', gap: '0.5rem', alignItems: 'end' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.8rem', color: '#999' }}>Color Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Coral"
                                    value={newVariant.name}
                                    onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.8rem', color: '#999' }}>Slug</label>
                                <input
                                    type="text"
                                    placeholder="e.g., coral-hoodie"
                                    value={newVariant.slug}
                                    onChange={(e) => setNewVariant({ ...newVariant, slug: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.8rem', color: '#999' }}>Color</label>
                                <input
                                    type="color"
                                    value={newVariant.color}
                                    onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                                    style={{ width: '100%', height: '38px', background: '#222', border: '1px solid #444', cursor: 'pointer', borderRadius: '4px' }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={addVariant}
                                style={{ padding: '0.6rem 1rem', background: 'var(--color-accent)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontWeight: 600, fontSize: '0.9rem' }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="composition" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Composition
                    </label>
                    <input id="composition" name="composition" placeholder="e.g., 100% Upcycled Polyester Fleece" value={formData.composition} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                </div>

                <div>
                    <label htmlFor="care" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Care Instructions
                    </label>
                    <input id="care" name="care" placeholder="e.g., Machine wash cold, tumble dry low" value={formData.care} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                </div>

                <div>
                    <label htmlFor="sizing" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Sizing Information
                    </label>
                    <input id="sizing" name="sizing" placeholder="e.g., Fits true to size with a relaxed fit" value={formData.sizing} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                </div>

                <div>
                    <label htmlFor="sustainability" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Sustainability
                    </label>
                    <textarea id="sustainability" name="sustainability" placeholder="Information about sustainable practices..." value={formData.sustainability} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', minHeight: '80px', borderRadius: '4px', fontFamily: 'inherit' }} />
                </div>

                <button type="submit" style={{ padding: '1rem', background: 'var(--color-accent)', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '1rem' }}>
                    Save Product
                </button>
            </form>
        </Section>
    );
};

export default ProductEdit;
