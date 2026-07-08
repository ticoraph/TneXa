import React from 'react';
import EnginePage from '../components/EnginePage';
import tnevaImg from '../assets/engines/tneva.png';

const TneVa = () => {
    return (
        <EnginePage 
            engineId="TneVa" 
            externalUrl="https://TneVa.fr" 
            imageUrl={tnevaImg} 
        />
    );
};

export default TneVa;
