import React, { useEffect, useState } from 'react';
import './index.css';
import './construction.css';

function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Trigger entrance animation after mount
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`construction-page ${loaded ? 'is-loaded' : ''}`}>
            {/* Animated background orbs */}
            <div className="orb orb-1" aria-hidden="true" />
            <div className="orb orb-2" aria-hidden="true" />
            <div className="orb orb-3" aria-hidden="true" />

            {/* Grid overlay */}
            <div className="grid-overlay" aria-hidden="true" />

            <main className="construction-content">
                {/* Logo / Brand */}
                <div className="brand">
                    <span className="brand-prefix">Tne</span>
                    <span className="brand-suffix">Xa</span>
                </div>

                {/* Status badge */}
                <div className="status-badge">
                    <span className="status-dot" aria-hidden="true" />
                    Site en construction
                </div>

                <h1 className="construction-title">
                    Quelque chose<br />
                    <span className="gradient-text">d'extraordinaire</span><br />
                    arrive bientôt.
                </h1>

                <p className="construction-desc">
                    Nous travaillons activement à la mise en ligne de notre plateforme.<br />
                    Merci de votre patience et de votre intérêt pour TneXa.
                </p>

                {/* Decorative divider */}
                <div className="divider" aria-hidden="true">
                    <span /><span /><span />
                </div>

                <p className="construction-tagline">
                    Technology Network for AI
                </p>
            </main>
        </div>
    );
}

export default App;
