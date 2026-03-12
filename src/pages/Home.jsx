import React from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import EngineCard from '../components/EngineCard';

const engineIds = ["TneGa", "TneKa", "TneMa", "TneLa", "TneRa", "TneVa"];
const engineNumbers = {
    "TneGa": "01",
    "TneKa": "02",
    "TneMa": "03",
    "TneLa": "04",
    "TneRa": "05",
    "TneVa": "06"
};

const Home = () => {
    const { t } = useTranslation();

    const engineData = engineIds.map(id => ({
        id: engineNumbers[id],
        name: id,
        title: t(`engines.items.${id}.title`),
        description: t(`engines.items.${id}.description`),
        features: t(`engines.items.${id}.features`, { returnObjects: true })
    }));

    return (
        <main>
            <Hero />

            <section className="engines-section" id="engines">
                <div className="container">
                    <div className="section-title animate">
                        <h2 className="gradient-text">{t('engines.title')}</h2>
                        <p>{t('engines.description')}</p>
                    </div>
                    <div className="engines-grid">
                        {engineData.map((engine) => (
                            <EngineCard key={engine.id} {...engine} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container cta-container glass animate">
                    <h2 className="cta-title">{t('cta.title')}</h2>
                    <p className="cta-description">{t('cta.description')}</p>
                    <button className="btn btn-primary">{t('cta.button')}</button>
                </div>
            </section>
        </main>
    );
};

export default Home;
