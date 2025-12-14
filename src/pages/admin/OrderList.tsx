import { useState, useEffect } from 'react';
import { Section } from '../../components/ui/Section';
import { Heading, Text } from '../../components/ui/Typography';
import { client } from '../../api/client';

interface Order {
    id: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
}

/**
 * OrderList Component
 * Displays a list of all orders in the admin panel.
 */
const OrderList = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Fetch orders from the API
        client.get('/orders').then(res => setOrders(res.data));
    }, []);

    return (
        <Section>
            <Heading level={2} style={{ marginBottom: '2rem' }}>Orders</Heading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.length === 0 ? (
                    <Text>No orders yet.</Text>
                ) : (
                    orders.map(order => (
                        <div key={order.id} style={{ background: '#222', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Text style={{ fontWeight: 'bold' }}>{order.customerName}</Text>
                                <Text style={{ fontSize: '0.9rem', color: '#888' }}>{new Date(order.createdAt).toLocaleDateString()}</Text>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <Text style={{ fontWeight: 'bold' }}>€{order.total}</Text>
                                <Text style={{ color: order.status === 'pending' ? 'orange' : 'green' }}>{order.status}</Text>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Section>
    );
};

export default OrderList;
