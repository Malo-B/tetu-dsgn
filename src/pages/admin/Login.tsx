import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../../components/ui/Section';
import { Heading } from '../../components/ui/Typography';

/**
 * Login Component
 * Admin login page.
 * Currently uses a mock login implementation.
 */
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /**
     * Handle login form submission.
     * Checks credentials against hardcoded values (mock implementation).
     */
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('adminToken', 'mock-token');
            navigate('/admin/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <Section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
                <Heading level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>Admin Login</Heading>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={{ padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                    />
                    <button type="submit" style={{ padding: '1rem', background: 'var(--color-accent)', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>
                        Login
                    </button>
                </form>
            </div>
        </Section>
    );
};

export default Login;
