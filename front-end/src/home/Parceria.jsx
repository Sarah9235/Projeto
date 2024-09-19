import React from 'react';
import bannerImage from '../assets/parceria.png';

const Parceria = () => {


  return (
    <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
      <a 
        href="https://projeto-integrador-final.vercel.app/"
        style={{ display: 'block', height: '100%' }}
      >
        <img 
          src={bannerImage} 
          alt="Banner" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </a>
    </div>
  );
};

export default Parceria;
