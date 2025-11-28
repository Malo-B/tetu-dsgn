export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    images: string[];
    description: string;
    details: string[];
    composition: string;
    care: string;
    sizing: string;
    sustainability: string;
    variants?: {
        slug: string;
        color: string;
        name: string;
    }[];
}

export interface CartItem {
    product: Product;
    slug: string;
    size: string;
    quantity: number;
}

export interface CheckoutFormData {
    // Shipping Information
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;

    // Payment Information
    paymentMethod: 'card' | 'paypal';
    cardNumber?: string;
    cardExpiry?: string;
    cardCVC?: string;
}
