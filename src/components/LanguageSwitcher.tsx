import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            style={{
                background: 'none',
                border: '1px solid var(--color-accent)',
                color: 'var(--color-accent)',
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-accent)';
                e.currentTarget.style.color = 'var(--color-bg)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--color-accent)';
            }}
        >
            {i18n.language === 'en' ? 'FR' : 'EN'}
        </button>
    );
};

export default LanguageSwitcher;
