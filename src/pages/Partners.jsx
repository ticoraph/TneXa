import React from 'react';
import { useTranslation } from 'react-i18next';

const Partners = () => {
    const { t } = useTranslation();

    const partners = [
        {
            name: "Raphaël Montico",
            description: t('partners.raphael_desc'),
            url: "https://raphaelmontico.fr"
        },
        {
            name: "Collection Pulp Fiction",
            description: t('partners.pulp_desc'),
            url: "https://pulpfiction.fr"
        },
        {
            name: "SKIPRI",
            description: t('partners.skipri_desc'),
            url: "https://skipri.com"
        },
        {
            name: "SURPRI",
            description: t('partners.surpri_desc'),
            url: "https://surpri.fr"
        },
        {
            name: "CODEPARRAINAGE",
            description: t('partners.codeparrainage_desc'),
            url: "https://codeparrainage.ovh"
        }
    ];

    return (
        <main className="page-content">
            <div className="container section-padding">
                <h1 className="gradient-text">{t('footer.partners')}</h1>
                <div className="partners-grid animate">
                    {partners.map((partner, index) => (
                        <div key={index} className="partner-card glass">
                            <h3>{partner.name}</h3>
                            {partner.tagline && <p className="partner-tagline"><em>"{partner.tagline}"</em></p>}
                            <p className="partner-desc">{partner.description}</p>
                            <a href={partner.url} target="_blank" rel="noopener noreferrer" className="btn-link">
                                {t('partners.visit')}
                            </a>
                            {partner.engines && (
                                <div className="partner-engines">
                                    <h4>{t('partners.engines_title')}</h4>
                                    <ul>
                                        {partner.engines.map((engine, eIdx) => (
                                            <li key={eIdx}>
                                                <a href={engine.url} target="_blank" rel="noopener noreferrer">{engine.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Partners;
