import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { t } = useTranslation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem 4rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        mixBlendMode: 'difference',
        color: 'white'
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo_tetu.svg" alt="TÊTU" style={{ height: '2.5rem', filter: 'invert(1)' }} />
      </Link>
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', alignItems: 'center' }}>
        <Link to="/">{t('nav.shop')}</Link>
        <Link to="/materials">{t('nav.materials')}</Link>
        <Link to="/nft">{t('nav.nft')}</Link>
        <Link to="/cart">{t('nav.cart')} ({cartCount})</Link>
        <LanguageSwitcher />
      </div>
    </motion.nav>
  );
};

export default Navbar;
