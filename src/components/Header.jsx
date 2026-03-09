import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header = () => {
    const { t } = useTranslation();

    return (
        <header className="header glass">
            <div className="container header-container">
                <div className="logo">
                    <span className="logo-text">TN<span className="primary">EXA</span></span>
                </div>
                <nav className="nav">
                    <ul className="nav-list">
                        <li><a href="#home">{t('nav.home')}</a></li>
                        <li><a href="#engines">{t('nav.engines')}</a></li>
                        <li><a href="#about">{t('nav.company')}</a></li>
                        <li><a href="#resources">{t('nav.resources')}</a></li>
                        <li><LanguageSwitcher /></li>
                        <li><a href="mailto:contact@tnexa.ai" className="btn-contact">{t('nav.contact')}</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
