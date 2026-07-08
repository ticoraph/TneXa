import React from 'react';
import EnginePage from '../components/EnginePage';
import tnegaImg from '../assets/engines/tnega.png';

const TneGa = () => {
    return (
        <EnginePage 
            engineId="TneGa" 
            externalUrl="https://TneGa.fr" 
            imageUrl={tnegaImg} 
        />
    );
};

export default TneGa;
