import { client } from '../api/client';

export interface Product {
    id: string;
    slug: string;
    name: string;
    price: string;
    image: string;
    description: string;
    discount?: number;
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

export const getProducts = async (): Promise<Product[]> => {
    const response = await client.get('/products');
    return response.data;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
    const response = await client.get(`/products/${slug}`);
    return response.data;
};
