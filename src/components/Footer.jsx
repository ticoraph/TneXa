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
                <div className="footer-brand">
                    <div className="logo-text text-light">TN<span className="primary">EXA</span></div>
                    <p className="footer-motto">{t('footer.motto')}</p>
                    <div className="social-links">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={20} /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={20} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={20} /></a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Twitter size={20} /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Youtube size={20} /></a>
                    </div>
                </div>
                <div className="footer-links">
                    <div className="link-group">
                        <h4>{t('footer.links_platform')}</h4>
                        <ul>
                            <li><a href="/#engines">TneGa Agents</a></li>
                            <li><a href="/#engines">TneKa Knowledge</a></li>
                            <li><a href="/#engines">TneMa Models</a></li>
                        </ul>
                    </div>
                    <div className="link-group">
                        <h4>{t('footer.links_company')}</h4>
                        <ul>
                            <li><Link to="/about">{t('footer.about')}</Link></li>
                            <li><Link to="/partners">{t('footer.partners')}</Link></li>
                            <li><Link to="/contact">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>
                    <div className="link-group">
                        <h4>{t('footer.links_legal')}</h4>
                        <ul>
                            <li><Link to="/legal-mentions">{t('footer.legal')}</Link></li>
                            <li><Link to="/sitemap">{t('footer.sitemap')}</Link></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); alert(t('footer.cookies_popup')); }}>{t('footer.cookies')}</a></li>
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
