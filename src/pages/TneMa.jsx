import React from 'react';
import EnginePage from '../components/EnginePage';
import tnemaImg from '../assets/engines/tnema.png';

const TneMa = () => {
    return (
        <EnginePage 
            engineId="TneMa" 
            externalUrl="https://TneMa.fr" 
            imageUrl={tnemaImg} 
        />
    );
};

export default TneMa;
