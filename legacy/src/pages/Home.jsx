import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const satellitePlanets = [
    { name: "TneGa", label: "Agents", path: "/engines/tnega", color: "#FF7043", size: 110, orbit: 240, angle: 0 },
    { name: "TneKa", label: "Knowledge", path: "/engines/tneka", color: "#4FC3F7", size: 95, orbit: 270, angle: 60 },
    { name: "TneMa", label: "Models", path: "/engines/tnema", color: "#81C784", size: 115, orbit: 250, angle: 120 },
    { name: "TneLa", label: "Learning", path: "/engines/tnela", color: "#BA68C8", size: 105, orbit: 220, angle: 180 },
    { name: "TneRa", label: "Ressources", path: "/engines/tnera", color: "#FFF176", size: 90, orbit: 290, angle: 240 },
    { name: "TneVa", label: "Vision", path: "/engines/tneva", color: "#F06292", size: 105, orbit: 240, angle: 300 }
];

const Home = () => {
    return (
        <main className="home-container">
            <div className="planetary-system">
                {/* SVG Connections */}
                <svg className="svg-connections">
                    {satellitePlanets.map((planet, index) => {
                        const rad = (planet.angle * Math.PI) / 180;
                        const x2 = 50 + (planet.orbit / 600) * 100 * Math.cos(rad);
                        const y2 = 50 + (planet.orbit / 600) * 100 * Math.sin(rad);
                        return (
                            <line 
                                key={`line-${index}`}
                                x1="50%" y1="50%" 
                                x2={`${x2}%`} y2={`${y2}%`} 
                                className="connection-line" 
                                style={{ stroke: planet.color }}
                            />
                        );
                    })}
                </svg>

                {/* Central Planet */}
                <div className="central-planet-wrapper no-link">
                    <div className="central-planet">
                        <span className="planet-name">TneXa</span>
                    </div>
                </div>

                {/* Satellite Planets */}
                {satellitePlanets.map((planet, index) => {
                    const rad = (planet.angle * Math.PI) / 180;
                    const x = planet.orbit * Math.cos(rad);
                    const y = planet.orbit * Math.sin(rad);
                    
                    return (
                        <Link 
                            key={index} 
                            to={planet.path}
                            className="satellite-planet"
                            style={{
                                width: `${planet.size}px`,
                                height: `${planet.size}px`,
                                borderColor: planet.color,
                                boxShadow: `0 0 20px ${planet.color}33`,
                                transform: `translate(${x}px, ${y}px)`,
                                animationDelay: `${index * 0.5}s`
                            }}
                        >
                            <div className="satellite-content">
                                <span className="satellite-name" style={{ color: planet.color }}>{planet.name}</span>
                                <span className="satellite-label">{planet.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
};

export default Home;
