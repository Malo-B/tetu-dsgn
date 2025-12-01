import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(cors({
    origin: ['https://tetu-dsgn.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// --- Products ---

app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: { variants: true, details: true, images: true }
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/products/featured', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: { isFeatured: true },
            take: 5,
            include: { variants: true, details: true, images: true }
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch featured products' });
    }
});

app.get('/api/products/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await prisma.product.findUnique({
            where: { slug },
            include: { variants: true, details: true, images: true }
        });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

app.post('/api/products', async (req, res) => {
    // Basic admin protection would go here
    try {
        const { name, slug, price, description, image, variants, details, composition, care, sizing, sustainability, images, discount, isFeatured } = req.body;
        const product = await prisma.product.create({
            data: {
                name, slug, price, description, image, composition, care, sizing, sustainability,
                discount: discount || 0,
                isFeatured: isFeatured || false,
                variants: { create: variants },
                details: { create: details?.map(d => ({ text: d })) },
                images: { create: images?.map(url => ({ url })) }
            },
            include: { variants: true, details: true, images: true }
        });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

app.put('/api/products/:id', async (req, res) => {
    // Basic admin protection would go here
    try {
        const { id } = req.params;
        const { isFeatured } = req.body;
        const product = await prisma.product.update({
            where: { id },
            data: { isFeatured },
            include: { variants: true, details: true, images: true }
        });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// --- Orders ---

app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, customerEmail, items, total } = req.body;
        const order = await prisma.order.create({
            data: {
                customerName,
                customerEmail,
                total,
                items: {
                    create: items.map(item => ({
                        productName: item.productName,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        size: item.size
                    }))
                }
            }
        });
        res.json(order);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: { items: true }
        });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// --- Admin ---
// TODO: Add real authentication
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    // Mock login
    if (username === 'admin' && password === 'admin') {
        res.json({ token: 'mock-token' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel serverless
export default app;
