import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sitemap = () => {
    const { t } = useTranslation();

    return (
        <main className="page-content">
            <div className="container section-padding">
                <h1 className="gradient-text">{t('footer.sitemap')}</h1>
                <div className="content-block glass animate">
                    <ul className="sitemap-list">
                        <li><Link to="/">{t('nav.home')}</Link></li>
                        <li><Link to="/about">{t('nav.company')}</Link></li>
                        <li><Link to="/partners">{t('footer.partners')}</Link></li>
                        <li><Link to="/contact">{t('nav.contact')}</Link></li>
                        <li><Link to="/legal-mentions">{t('footer.legal')}</Link></li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Sitemap;
