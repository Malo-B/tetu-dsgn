

const Footer = () => {
    return (
        <footer style={{
            padding: '4rem',
            textAlign: 'center',
            color: '#666',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderTop: '1px solid #222',
            marginTop: '4rem'
        }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <a href="#">Instagram</a>
                <a href="#">Twitter</a>
                <a href="#">Email</a>
            </div>
            &copy; 2025 TÊTU. All Rights Reserved.
        </footer>
    );
};

export default Footer;
