# Têtu Backend API

Backend server for the Têtu e-commerce platform, built with Express.js, Prisma, and PostgreSQL.

## Overview

This is a RESTful API server that handles:
- Product catalog management
- Order processing
- Admin authentication (mock implementation)
- Featured products selection

The server is deployed as a Vercel serverless function but can also run locally for development.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Deployment**: Vercel Serverless Functions

## Project Structure

```
server/
├── src/
│   └── index.js          # Main Express server with all routes
├── prisma/
│   ├── schema.prisma     # Database schema definition
│   └── seed.js           # Database seeding script
└── package.json
```

## API Endpoints

### Products

#### `GET /api/products`
Get all products with optional category filtering.

**Query Parameters:**
- `category` (optional): Filter by category (e.g., "Hoodies", "T-Shirts")

**Response:** Array of product objects with variants, details, and images

**Example:**
```bash
# Get all products
curl http://localhost:3000/api/products

# Get products in Hoodies category
curl http://localhost:3000/api/products?category=Hoodies
```

#### `GET /api/products/featured`
Get up to 5 featured products for homepage display.

**Response:** Array of featured product objects

#### `GET /api/products/:slug`
Get a single product by its slug identifier.

**Parameters:**
- `slug`: URL-friendly product identifier (e.g., "charcoal-hoodie")

**Response:** Single product object or 404 if not found

#### `POST /api/products`
Create a new product (admin only).

**Request Body:**
```json
{
  "name": "Product Name",
  "slug": "product-slug",
  "price": "€89",
  "description": "Product description",
  "image": "/images/product.jpg",
  "category": "Hoodies",
  "variants": [
    { "name": "Charcoal", "slug": "charcoal", "color": "#333" }
  ],
  "details": ["Detail 1", "Detail 2"],
  "images": ["/images/img1.jpg", "/images/img2.jpg"],
  "discount": 0,
  "isFeatured": false,
  "composition": "Material info",
  "care": "Care instructions",
  "sizing": "Sizing guide",
  "sustainability": "Sustainability info"
}
```

**Response:** Created product object

#### `PUT /api/products/:id`
Update an existing product (admin only).

**Parameters:**
- `id`: Product ID

**Request Body:** Same as POST, all fields optional. Relations (variants, details, images) are replaced entirely if provided.

**Response:** Updated product object

### Orders

#### `POST /api/orders`
Create a new order from checkout.

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "total": 89.00,
  "items": [
    {
      "productName": "Charcoal Hoodie",
      "productId": "product-id",
      "quantity": 1,
      "price": "€89",
      "size": "M"
    }
  ]
}
```

**Response:** Created order object

#### `GET /api/orders`
Get all orders (admin only), sorted by creation date (newest first).

**Response:** Array of order objects with items

### Admin

#### `POST /api/admin/login`
Mock admin login endpoint.

⚠️ **WARNING**: This is a mock implementation for development only. Do not use in production!

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**Response:** `{ "token": "mock-token" }` or 401 error

### Health Check

#### `GET /api/health`
Simple health check endpoint.

**Response:** `{ "status": "ok" }`

## Database Schema

The application uses Prisma with PostgreSQL. Key models:

- **Product**: Main product information with relations to variants, details, and images
- **Variant**: Product color/style variants
- **Detail**: Product detail points
- **Image**: Additional product images
- **Order**: Customer orders with line items
- **OrderItem**: Individual items in an order

See `prisma/schema.prisma` for the complete schema definition.

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
DATABASE_URL="postgresql://user:password@host:port/database"
NODE_ENV="development"
```

For production (Vercel), set these in the Vercel dashboard.

## Development Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Set up database:**
   ```bash
   # Run migrations
   npx prisma migrate dev
   
   # Seed database with initial data
   npx prisma db seed
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

   Server will run on `http://localhost:3000`

4. **View database (optional):**
   ```bash
   npx prisma studio
   ```

## Deployment

The server is configured for Vercel serverless deployment:

1. The Express app is exported as a default export
2. Vercel wraps it in a serverless handler
3. Local development uses `app.listen()`, production uses the export

**Deploy to Vercel:**
```bash
cd server
vercel
```

## CORS Configuration

The server allows requests from:
- Production frontend: `https://tetu-dsgn.vercel.app`
- Local development: `http://localhost:5173` (Vite)
- Local API testing: `http://localhost:3000`

Modify the CORS configuration in `src/index.js` if you need to add more origins.

## Security Considerations

⚠️ **Current Limitations:**

1. **No Real Authentication**: The admin login is a mock implementation
2. **No Authorization**: Admin routes are not protected
3. **No Rate Limiting**: API is vulnerable to abuse
4. **No Input Validation**: Request bodies are not validated

**TODO for Production:**
- Implement JWT-based authentication
- Add authorization middleware
- Implement rate limiting
- Add request validation (e.g., with Joi or Zod)
- Add HTTPS enforcement
- Implement proper error handling
- Add logging and monitoring

## Troubleshooting

**Database connection issues:**
- Verify `DATABASE_URL` is correct
- Check database is running
- Run `npx prisma generate` to regenerate Prisma client

**CORS errors:**
- Add your frontend URL to the CORS origins list
- Ensure credentials are properly configured

**Prisma errors:**
- Run `npx prisma migrate reset` to reset database (⚠️ deletes all data)
- Check Prisma schema for syntax errors
