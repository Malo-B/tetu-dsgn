import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Materials from './pages/Materials';
import NFT from './pages/NFT';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import OrderList from './pages/admin/OrderList';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<><Navbar /><Home /></>} />
            <Route path="/shop" element={<><Navbar /><Shop /></>} />
            <Route path="/materials" element={<><Navbar /><Materials /></>} />
            <Route path="/nft" element={<><Navbar /><NFT /></>} />
            <Route path="/product/:slug" element={<><Navbar /><ProductDetail /></>} />
            <Route path="/cart" element={<><Navbar /><Cart /></>} />
            <Route path="/checkout" element={<><Navbar /><Checkout /></>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/new" element={<ProductEdit />} />
              <Route path="products/:slug" element={<ProductEdit />} />
              <Route path="orders" element={<OrderList />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
