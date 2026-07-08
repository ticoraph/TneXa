import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './EnginePage.css';

const EnginePage = ({ engineId, externalUrl, imageUrl }) => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = t(`engines.items.${engineId}.features`, { returnObjects: true });

    return (
        <main className="engine-page-container">
            <div className="engine-page-hero glass animate">
                <div className="container">
                    <Link to="/" className="back-link">← {t('nav.home')}</Link>
                    <div className="engine-hero-content">
                        <div className="engine-hero-text">
                            <h1 className="gradient-text">{engineId} {t(`engines.items.${engineId}.title`)}</h1>
                            <p className="engine-description-large">
                                {t(`engines.items.${engineId}.description`)}
                            </p>
                            <div className="engine-features-list">
                                <h3>Core Features</h3>
                                <ul>
                                    {features.map((feature, index) => (
                                        <li key={index}>
                                            <span className="feature-dot"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a 
                                href={externalUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-primary engine-external-btn"
                            >
                                {t('partners.visit')} {engineId}.fr
                            </a>
                        </div>
                        <div className="engine-hero-image-container glass">
                            <img src={imageUrl} alt={engineId} className="engine-hero-image" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EnginePage;
