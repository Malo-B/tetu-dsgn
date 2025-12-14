import { Section } from '../../components/ui/Section';
import { Heading, Text } from '../../components/ui/Typography';

/**
 * Dashboard Component
 * Admin dashboard showing key metrics.
 * Currently displays placeholder data.
 */
const Dashboard = () => {
    return (
        <Section>
            <Heading level={2} style={{ marginBottom: '2rem' }}>Dashboard</Heading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div style={{ background: '#222', padding: '2rem', borderRadius: '8px' }}>
                    <Text style={{ fontSize: '1.2rem', color: '#888' }}>Total Sales</Text>
                    <Heading level={3}>€0.00</Heading>
                </div>
                <div style={{ background: '#222', padding: '2rem', borderRadius: '8px' }}>
                    <Text style={{ fontSize: '1.2rem', color: '#888' }}>Orders</Text>
                    <Heading level={3}>0</Heading>
                </div>
                <div style={{ background: '#222', padding: '2rem', borderRadius: '8px' }}>
                    <Text style={{ fontSize: '1.2rem', color: '#888' }}>Products</Text>
                    <Heading level={3}>5</Heading>
                </div>
            </div>
        </Section>
    );
};

export default Dashboard;
