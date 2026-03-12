import React from 'react';
import { useTranslation } from 'react-i18next';

const LegalMentions = () => {
    const { t } = useTranslation();

    return (
        <main className="page-content">
            <div className="container section-padding">
                <h1 className="gradient-text">{t('footer.legal')}</h1>
                <div className="content-block glass animate">
                    <section className="legal-section">
                        <h2>1. Mention Légale</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </section>
                    <section className="legal-section">
                        <h2>2. Propriété Intellectuelle</h2>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </section>
                    <section className="legal-section">
                        <h2>3. Protection des Données</h2>
                        <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.</p>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default LegalMentions;
