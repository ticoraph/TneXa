import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './EngineCard.css';

const EngineCard = ({ id, name, title, description, features }) => {
    const { t } = useTranslation();

    return (
        <div className="engine-card glass animate">
            <div className="card-header">
                <div className="engine-id">{id}</div>
                <h3 className="engine-name">{name}</h3>
            </div>
            <h4 className="engine-title">{title}</h4>
            <p className="engine-description">{description}</p>
            <ul className="engine-features">
                {features.map((feature, index) => (
                    <li key={index} className="feature-item">
                        <span className="feature-dot"></span>
                        {feature}
                    </li>
                ))}
            </ul>
            <Link to={`/engines/${name.toLowerCase()}`} className="btn-learn">
                {t('engines.card_learn', { name })}
            </Link>
        </div>
    );
};

export default EngineCard;
