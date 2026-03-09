import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import EngineCard from './components/EngineCard';
import './App.css';

const engineIds = ["TneGa", "TneKa", "TneMa", "TneLa", "TneRa", "TneVa"];
const engineNumbers = {
    "TneGa": "01",
    "TneKa": "02",
    "TneMa": "03",
    "TneLa": "04",
    "TneRa": "05",
    "TneVa": "06"
};

function App() {
    const { t } = useTranslation();

    const engineData = engineIds.map(id => ({
        id: engineNumbers[id],
        name: id,
        title: t(`engines.items.${id}.title`),
        description: t(`engines.items.${id}.description`),
        features: t(`engines.items.${id}.features`, { returnObjects: true })
    }));

    return (
        <div className="app">
            <Header />
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

            <footer className="footer bg-dark">
                <div className="container footer-container">
                    <div className="footer-brand">
                        <div className="logo-text text-light">TN<span className="primary">EXA</span></div>
                        <p className="footer-motto">{t('footer.motto')}</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>{t('footer.links_platform')}</h4>
                            <ul>
                                <li><a href="#">TneGa Agents</a></li>
                                <li><a href="#">TneKa Knowledge</a></li>
                                <li><a href="#">TneMa Models</a></li>
                            </ul>
                        </div>
                        <div className="link-group">
                            <h4>{t('footer.links_company')}</h4>
                            <ul>
                                <li><a href="#">{t('footer.about')}</a></li>
                                <li><a href="#">{t('footer.careers')}</a></li>
                                <li><a href="mailto:contact@tnexa.ai">{t('nav.contact')}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>{t('footer.copyright')}</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
