import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types/types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, slug: string, size: string, quantity: number) => void;
    removeFromCart: (slug: string, size: string) => void;
    updateQuantity: (slug: string, size: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        // Load cart from localStorage on init
        const savedCart = localStorage.getItem('tetu-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('tetu-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, slug: string, size: string, quantity: number) => {
        setItems(prevItems => {
            // Check if item with same product and size already exists
            const existingItemIndex = prevItems.findIndex(
                item => item.slug === slug && item.size === size
            );

            if (existingItemIndex > -1) {
                // Update quantity of existing item
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            } else {
                // Add new item
                return [...prevItems, { product, slug, size, quantity }];
            }
        });
    };

    const removeFromCart = (slug: string, size: string) => {
        setItems(prevItems =>
            prevItems.filter(item => !(item.slug === slug && item.size === size))
        );
    };

    const updateQuantity = (slug: string, size: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(slug, size);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.slug === slug && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getCartTotal = () => {
        return items.reduce((total, item) => {
            const price = parseFloat(item.product.price.replace('€', ''));
            return total + (price * item.quantity);
        }, 0);
    };

    const getCartCount = () => {
        return items.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
