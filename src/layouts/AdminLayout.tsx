import { Outlet, Link } from 'react-router-dom';
import { Heading } from '../components/ui/Typography';

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#111', color: 'white' }}>
            <aside style={{ width: '250px', background: '#000', padding: '2rem', borderRight: '1px solid #333' }}>
                <Heading level={3} style={{ marginBottom: '2rem', color: 'var(--color-accent)' }}>TÊTU Admin</Heading>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link to="/admin/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                    <Link to="/admin/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
                    <Link to="/admin/orders" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link>
                    <Link to="/" style={{ color: '#666', textDecoration: 'none', marginTop: '2rem' }}>Back to Site</Link>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
