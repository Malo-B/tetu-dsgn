# TÊTU Architecture Documentation

This document outlines the high-level architecture, component design, and data flow of the TÊTU e-commerce platform.

## 🏗 System Overview

The application follows a standard **Client-Server** architecture:

- **Frontend**: A Single Page Application (SPA) built with React and Vite. It handles the user interface, client-side routing, and state management.
- **Backend**: A RESTful API built with Node.js and Express. It manages business logic, database interactions, and serves data to the frontend.
- **Database**: PostgreSQL is used as the relational database, managed via Prisma ORM.

```mermaid
graph TD
    User[User] -->|HTTPS| Frontend[React Frontend (Vercel)]
    Frontend -->|REST API| Backend[Express Server (Vercel)]
    Backend -->|Query| DB[(PostgreSQL Database)]
```

## 🎨 Frontend Architecture

### Component Hierarchy

The UI is structured into reusable components and page-level views.

- **Layouts**: `AdminLayout` (Sidebar + Content), Public Layout (Navbar + Content + Footer)
- **Pages**: 
  - Public: `Home`, `Shop`, `ProductDetail`, `Cart`, `Checkout`
  - Admin: `Login`, `Dashboard`, `ProductList`, `ProductEdit`
- **Components**: 
  - UI: `Button`, `Input`, `Typography`, `Section`, `Reveal`
  - Feature: `ProductCard`, `CartItem`, `MaterialsSection`

### State Management

- **Global State**: `CartContext` manages the shopping cart state (items, total, quantity) and persists it to `localStorage`.
- **Local State**: `useState` and `useReducer` are used for component-specific state (form inputs, loading states, toggles).
- **Server State**: Data fetching is handled via `useEffect` and custom service functions (`productService.ts`).

### Styling

- **CSS Modules / Global CSS**: Custom styling with a focus on dark mode aesthetics (`#0a0a0a` background).
- **Framer Motion**: Used for page transitions, scroll reveals, and micro-interactions.

## ⚙️ Backend Architecture

### API Design

The backend exposes a REST API with the following key resources:

- `/api/products`: CRUD operations for products.
- `/api/orders`: Order creation and retrieval.
- `/api/admin`: Admin authentication (mock).

### Database Schema (Prisma)

The data model consists of:

- **Product**: Core entity with fields like `name`, `price`, `slug`, `description`.
- **Variant**: Colors/versions of a product.
- **Detail**: Bullet points for product specs.
- **Image**: Gallery images for a product.
- **Order**: Customer orders with nested `OrderItem`s.

### Security

- **CORS**: Configured to allow requests from the frontend domain.
- **Environment Variables**: Sensitive data (DB URL) is managed via `.env`.
- **Authentication**: Currently uses a mock implementation. **TODO**: Implement JWT for production.

## 🚀 Deployment

- **Frontend**: Deployed to Vercel, utilizing their global CDN.
- **Backend**: Deployed to Vercel as Serverless Functions (using `vercel.json` configuration).
- **Database**: Hosted PostgreSQL instance (e.g., Neon, Supabase, or Vercel Postgres).

## 🔄 Data Flow Example: Add to Cart

1. **User Action**: User clicks "Add to Cart" on `ProductDetail` page.
2. **Context Update**: `addToCart` function in `CartContext` is called.
3. **State Change**: Item is added to the `items` array in state.
4. **Persistence**: `useEffect` hook detects state change and updates `localStorage`.
5. **UI Update**: Navbar cart badge updates to reflect new count.
