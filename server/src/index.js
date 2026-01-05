import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;


app.use(cors({
    origin: ['https://tetu-dsgn.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

/**
 * Health check endpoint
 * @route GET /api/health
 */
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// --- Products ---

/**
 * Get all products
 * Supports filtering by category via query parameter
 * @route GET /api/products
 * @param {string} req.query.category - Optional category to filter by
 */
app.get('/api/products', async (req, res) => {
    try {
        const { category, includeHidden } = req.query;
        const where = {};
        if (category) {
            where.category = category;
        }
        // Only show visible products to public users
        // Admin can pass includeHidden=true to see all products
        if (includeHidden !== 'true') {
            where.isHidden = false;
        }

        const products = await prisma.product.findMany({
            where,
            include: { variants: true, details: true, images: true }
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

/**
 * Get featured products
 * Returns up to 5 products marked as featured and not hidden
 * @route GET /api/products/featured
 */
app.get('/api/products/featured', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                isFeatured: true,
                isHidden: false
            },
            take: 5,
            include: { variants: true, details: true, images: true }
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch featured products' });
    }
});

/**
 * Get a single product by slug
 * @route GET /api/products/:slug
 */
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

/**
 * Create a new product
 * @route POST /api/products
 * @access Private (TODO: Add authentication)
 */
app.post('/api/products', async (req, res) => {
    // Basic admin protection would go here
    try {
        const { name, slug, price, description, image, variants, details, composition, care, sizing, sustainability, images, discount, isFeatured, category } = req.body;
        const product = await prisma.product.create({
            data: {
                name, slug, price, description, image, composition, care, sizing, sustainability, category,
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

/**
 * Update an existing product
 * @route PUT /api/products/:id
 * @access Private (TODO: Add authentication)
 */
app.put('/api/products/:id', async (req, res) => {
    // Basic admin protection would go here
    try {
        const { id } = req.params;
        console.log('PUT /api/products/:id', id);
        console.log('Request body:', req.body);
        const { name, slug, price, description, image, variants, details, composition, care, sizing, sustainability, images, discount, isFeatured, category } = req.body;

        console.log('--- DEBUG START ---');
        console.log('Req Body Keys:', Object.keys(req.body));
        console.log('Req Body Raw:', JSON.stringify(req.body));
        console.log('Has Category?', 'category' in req.body);
        console.log('Category Value:', req.body.category);
        console.log('--- DEBUG END ---');

        const data = {
            name, slug, price, description, image, composition, care, sizing, sustainability, category,
            discount: discount !== undefined ? discount : undefined,
            isFeatured: isFeatured !== undefined ? isFeatured : undefined,
        };

        console.log('Data object before cleanup:', data);
        console.log('Category in data:', data.category);
        console.log('Category type in data:', typeof data.category);

        // Only update relations if they are provided in the request
        if (variants) {
            data.variants = {
                deleteMany: {},
                create: variants
            };
        }

        if (details) {
            data.details = {
                deleteMany: {},
                create: details.map(d => ({ text: d }))
            };
        }

        if (images) {
            data.images = {
                deleteMany: {},
                create: images.map(url => ({ url }))
            };
        }

        // Remove undefined keys to avoid Prisma errors (though Prisma usually ignores undefined, it's safer)
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

        console.log('Data object after cleanup:', data);
        console.log('Final category value:', data.category);

        const product = await prisma.product.update({
            where: { id },
            data,
            include: { variants: true, details: true, images: true }
        });
        res.json({
            ...product,
            _debug_received_category: category,
            _debug_data_category: data.category,
            _debug_req_body_keys: Object.keys(req.body)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

/**
 * Update product visibility (hide/show)
 * @route PATCH /api/products/:id/visibility
 * @access Private (TODO: Add authentication)
 */
app.patch('/api/products/:id/visibility', async (req, res) => {
    try {
        const { id } = req.params;
        const { isHidden } = req.body;

        // If hiding a product, automatically unfeature it
        const updateData = { isHidden };
        if (isHidden === true) {
            updateData.isFeatured = false;
        }

        const product = await prisma.product.update({
            where: { id },
            data: updateData,
            include: { variants: true, details: true, images: true }
        });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product visibility' });
    }
});

/**
 * Delete a product
 * @route DELETE /api/products/:id
 * @access Private (TODO: Add authentication)
 */
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // First, set productId to null in any OrderItems that reference this product
        // This prevents foreign key constraint errors
        await prisma.orderItem.updateMany({
            where: { productId: id },
            data: { productId: null }
        });

        // Now delete the product (cascade will handle variants, details, images)
        await prisma.product.delete({
            where: { id }
        });

        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

/**
 * Bulk operations on products
 * @route POST /api/products/bulk-actions
 * @access Private (TODO: Add authentication)
 * @body {string[]} ids - Array of product IDs
 * @body {string} action - Action to perform: 'hide', 'show', or 'delete'
 */
app.post('/api/products/bulk-actions', async (req, res) => {
    try {
        const { ids, action } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'Invalid product IDs' });
        }

        if (!['hide', 'show', 'delete'].includes(action)) {
            return res.status(400).json({ error: 'Invalid action. Must be hide, show, or delete' });
        }

        let result;
        switch (action) {
            case 'hide':
                result = await prisma.product.updateMany({
                    where: { id: { in: ids } },
                    data: { isHidden: true, isFeatured: false }
                });
                break;
            case 'show':
                result = await prisma.product.updateMany({
                    where: { id: { in: ids } },
                    data: { isHidden: false }
                });
                break;
            case 'delete':
                // First, set productId to null in any OrderItems that reference these products
                await prisma.orderItem.updateMany({
                    where: { productId: { in: ids } },
                    data: { productId: null }
                });
                // Now delete the products
                result = await prisma.product.deleteMany({
                    where: { id: { in: ids } }
                });
                break;
        }

        res.json({
            success: true,
            message: `Successfully ${action === 'delete' ? 'deleted' : action === 'hide' ? 'hidden' : 'shown'} ${result.count} product(s)`,
            count: result.count
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to perform bulk action' });
    }
});


// --- Orders ---

/**
 * Create a new order
 * @route POST /api/orders
 */
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

/**
 * Get all orders
 * @route GET /api/orders
 * @access Private (TODO: Add authentication)
 */
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
/**
 * Admin login endpoint
 * @route POST /api/admin/login
 */
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
