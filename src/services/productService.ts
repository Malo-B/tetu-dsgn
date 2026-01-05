import { client } from '../api/client';

export interface Product {
    id: string;
    slug: string;
    name: string;
    price: string;
    image: string;
    description: string;
    category?: string;
    discount?: number;
    isFeatured?: boolean;
    isHidden?: boolean;
    composition?: string;
    care?: string;
    sizing?: string;
    sustainability?: string;
    variants: Variant[];
    details: Detail[];
    images?: { url: string }[];
}

export interface Variant {
    id: string;
    name: string;
    slug: string;
    color: string;
}

export interface Detail {
    id: string;
    text: string;
}

export const getProducts = async (category?: string, includeHidden = false): Promise<Product[]> => {
    const params: any = {};
    if (category) params.category = category;
    if (includeHidden) params.includeHidden = 'true';
    const response = await client.get('/products', { params });
    return response.data;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
    const response = await client.get('/products/featured');
    return response.data;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
    const response = await client.get(`/products/${slug}`);
    return response.data;
};

export const updateProductFeatured = async (id: string, isFeatured: boolean): Promise<Product> => {
    const response = await client.put(`/products/${id}`, { isFeatured });
    return response.data;
};

export const updateProductVisibility = async (id: string, isHidden: boolean): Promise<Product> => {
    const response = await client.patch(`/products/${id}/visibility`, { isHidden });
    return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
    await client.delete(`/products/${id}`);
};

export const bulkUpdateProducts = async (ids: string[], action: 'hide' | 'show' | 'delete'): Promise<void> => {
    await client.post('/products/bulk-actions', { ids, action });
};
