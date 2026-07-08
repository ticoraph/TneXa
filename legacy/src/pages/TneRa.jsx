import React from 'react';
import EnginePage from '../components/EnginePage';
import tneraImg from '../assets/engines/tnera.png';

const TneRa = () => {
    return (
        <EnginePage 
            engineId="TneRa" 
            externalUrl="https://TneRa.fr" 
            imageUrl={tneraImg} 
        />
    );
};

export default TneRa;
