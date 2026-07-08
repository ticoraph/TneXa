import React from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="hero" id="home">
            <div className="container hero-container animate">
                <div className="hero-content">
                    <h2 className="hero-subtitle">
                        {t('hero.subtitle_prefix')}
                        <span className="blue-text">{t('hero.subtitle_highlight')}</span>
                    </h2>
                    <h1 className="hero-title">
                        {t('hero.title_part1')} <br />
                        <span className="gradient-text">{t('hero.title_part2')}</span>
                    </h1>
                    <p className="hero-description">
                        {t('hero.description')}
                    </p>
                    <div className="hero-btns">
                        <a href="#engines" className="btn btn-primary">{t('hero.btn_engines')}</a>
                        <a href="#about" className="btn btn-secondary">{t('hero.btn_learn')}</a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-orb"></div>
                    <div className="visual-card glass">
                        <div className="card-tag">{t('hero.visual_tag')}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
