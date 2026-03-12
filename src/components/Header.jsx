import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header = () => {
    const { t } = useTranslation();

    return (
        <header className="header glass">
            <div className="container header-container">
                <div className="logo">
                    <Link to="/" className="logo-text">TN<span className="primary">EXA</span></Link>
                </div>
                <nav className="nav">
                    <ul className="nav-list">
                        <li><Link to="/">{t('nav.home')}</Link></li>
                        <li><a href="/#engines">{t('nav.engines')}</a></li>
                        <li><Link to="/about">{t('nav.company')}</Link></li>
                        <li><Link to="/partners">{t('footer.partners')}</Link></li>
                        <li><LanguageSwitcher /></li>
                        <li><Link to="/contact" className="btn-contact">{t('nav.contact')}</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
