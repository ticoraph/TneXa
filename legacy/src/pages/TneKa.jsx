import React from 'react';
import EnginePage from '../components/EnginePage';
import tnekaImg from '../assets/engines/tneka.png';

const TneKa = () => {
    return (
        <EnginePage 
            engineId="TneKa" 
            externalUrl="https://TneKa.fr" 
            imageUrl={tnekaImg} 
        />
    );
};

export default TneKa;
