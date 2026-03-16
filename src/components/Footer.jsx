import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer bg-dark">
            <div className="container footer-container">
                <div className="footer-links">
                    <div className="link-group">
                        <h4>{t('footer.links_company')}</h4>
                        <ul>
                            <li><Link to="/about">{t('footer.about')}</Link></li>
                            <li><Link to="/partners">{t('footer.partners')}</Link></li>
                        </ul>
                    </div>
                    <div className="link-group">
                        <h4>{t('footer.links_legal')}</h4>
                        <ul>
                            <li><Link to="/legal-mentions">{t('footer.legal')}</Link></li>
                            <li><Link to="/sitemap">{t('footer.sitemap')}</Link></li>
                        </ul>
                    </div>
                    <div className="link-group">
                        <h4>{t('nav.contact')}</h4>
                        <ul>
                             <li><Link to="/contact">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>{t('footer.copyright')}</p>
            </div>
        </footer>
    );
};

export default Footer;
