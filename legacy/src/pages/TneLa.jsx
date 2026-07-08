import React from 'react';
import EnginePage from '../components/EnginePage';
import tnelaImg from '../assets/engines/tnela.png';

const TneLa = () => {
    return (
        <EnginePage 
            engineId="TneLa" 
            externalUrl="https://TneLa.fr" 
            imageUrl={tnelaImg} 
        />
    );
};

export default TneLa;
